import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import api from '../APIClient.js';

function ViewItemInfo() {
  const { state } = useLocation();
  const [item, setItem] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    api.getItemById(state.item.id)
      .then(item => {
        setItem(item);
        return api.getUserById(item.owner_id);
      })
      .then(owner => setOwner(owner))
      .catch(err => console.error(err));
  }, [state]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header heading="View Item Details" />
      <main className="flex-grow overflow-y-auto p-4 pb-24">
        <div className="flex flex-col items-center">
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
              <a href={`mailto:${owner.email}`} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Message Owner
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewItemInfo;
