const router = require('express').Router();
const { OpenAI } = require('openai');
const allItems = require('../data/items.json');

//used https://medium.com/10-best-picks/step-by-step-guide-how-to-integrate-chatgpt-into-your-own-application-or-website-2ca908f9daf5#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjVkMTJhYjc4MmNiNjA5NjI4NWY2OWU0OGFlYTk5MDc5YmI1OWNiODYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ4NTI3NzM5MzM3MDM0NDQxNDIiLCJlbWFpbCI6ImNnZ2FsbDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTczOTY3MTcyNCwibmFtZSI6IkNhcm9saW5lIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0w3RThlT1ZOZXZhVFhrYjc5Q1U5Vkxac0dHTTZuVTl4aU9mUlE3Z2xJREhwcDhMMWJoPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzM5NjcyMDI0LCJleHAiOjE3Mzk2NzU2MjQsImp0aSI6ImZkZjA4OGU0ZTM3ZjQ2ZWJiZDMzMGE4OTllYmYwNjg5ZDZmZjQ1ZGMifQ.hYsFHasWxnQb2UEforjF-kiySBUwmc08umw6bz9GJUqqTNG4-KHYxFfdj7xXVpD_8ekPt6C2IqAfZXxUrfulpvtwfxtYhNg8-wv_FkMNhj3bWSqpxo7JBMWPfhOEzChkNmH2NDWwJEwpowe1kIZsSiBOycY5n27Okuc8leLS7yhdxo6mMNFepfumxZ8SBa-TrOXcv916S0Ct_UGUE09QdXVgDMcEcGaH7Zjm11tM0v6FPbAJXBDmz3O0Hbikf8Vxf64BqTwRySbckSwwQCAAYFu-Pqlr_pWBDxYYfAl-etmgzUyh74JpyXVwBV0faSDMoQjEII6QkZOSpNlY5BAHBw
//and https://rhtlingayat.medium.com/building-a-node-js-application-with-openai-api-integration-f9b55083b4e3
//to help

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { items, userName } = req.body;
  const itemObjects = allItems.items.filter(item => items.includes(item.item_id));

  console.log("ITEMS:", itemObjects);
  console.log("USER:", userName);

  if (!itemObjects || itemObjects.length === 0) {
    return res.status(400).json({ error: 'No items provided' });
  }

  let prompt = `
${userName} purchased the following items used.
Estimate the typical new retail prices based on item information. 
Calculate and summarize the total savings from buying the items used.

Items Purchased:
${itemObjects.map(item => `- ${item.name} (${item.category?.join(', ')}): "${item.description}" - Used price: $${item.price}`).join('\n')}

Respond in the format:
Estimated Retail Prices:
[For each item: Name - Estimated New Price]
Total Estimated Savings: [total]

Provide a short summary for the user using the correct prices of the used items given, and send it in the form of HTML code with Tailwind styling. Do not send anything besides HTML code. Do not add any links or buttons.
  `;


  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant providing savings estimates." },
        { role: "user", content: prompt },
      ],
      max_tokens: 350,
      temperature: 0.7,
    });

    const generatedText = response.choices[0]?.message?.content?.trim() || "No response generated.";
    console.log(generatedText);
    const totalSavingsMatch = generatedText.match(/Total Estimated Savings:\s*\$([\d.]+)/);
    const totalSavings = totalSavingsMatch ? totalSavingsMatch[1] : "0.00";

    let idx = generatedText.indexOf("<");
    let trimmedText = generatedText.slice(idx);
    console.log("TRIMMED: ", trimmedText);
    idx = trimmedText.indexOf("`");
    trimmedText = trimmedText.slice(0, idx);
    console.log("TRIMMED2: ", trimmedText);
    res.json({
      savingsReport: trimmedText,
      totalSavings,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate savings report' });
  }
});

module.exports = router;
