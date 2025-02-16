import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from '../APIClient.js';
import Header from '../components/Header';

function ViewItemInfo() {
  const { item_id } = useParams();
  const [item, setItem] = useState(null);
  const [owner, setOwner] = useState(null);

  useEffect(() => {
    if (item_id) {
      api.getItemById(item_id)
        .then(itemData => {
          setItem(itemData);
          return api.getUserById(itemData.owner_id);
        })
        .then(ownerData => setOwner(ownerData))
        .catch(err => console.error(err));
        console.log(owner);

    }
  }, [item_id]);

  if (!item || !owner) {
    return <p className="text-center text-gray-500">Loading item details...</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header heading="View Item Details" />
      <main className="flex-grow overflow-y-auto p-4 pb-24">
        <div className="p-4 mb-8 max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">{item.name}</h2>
          <img className="w-48 h-48 object-cover rounded-lg" src={item.pic_path} alt={item.name} />
          <p className="text-sm text-gray-600 mt-4">{item.description}</p>
          <p className="mt-2 text-gray-800">Owner: {owner.first_name} {owner.last_name}</p>
          <p className="mt-2 text-gray-800">Price: ${item.price}</p>
          <p className="mt-2 text-gray-800">Location: {item.location}</p>
          <div className="flex justify-between mt-4">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Buy Item
            </button>
            <a href={`mailto:${owner.unc_email_address}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Message Owner
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewItemInfo;
