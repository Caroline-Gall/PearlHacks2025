const router = require('express').Router();
const { OpenAI } = require('openai');
const allItems = require('../data/items.json');

//used https://medium.com/@nick.rios/how-to-quickly-setup-a-tiny-openai-api-bot-using-nodejs-62dcd917cb9d

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

    let idx = generatedText.indexOf("<");
    let trimmedText = generatedText.slice(idx);
    console.log("TRIMMED: ", trimmedText);
    idx = trimmedText.indexOf("`");
    trimmedText = trimmedText.slice(0, idx);
    console.log("TRIMMED2: ", trimmedText);
    res.json({
      savingsReport: trimmedText,
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate savings report' });
  }
});

module.exports = router;
