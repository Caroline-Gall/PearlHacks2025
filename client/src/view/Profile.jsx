import Header from '../components/Header';
import { useState, useEffect } from 'react';
import api from '../APIClient.js';

function Profile() {
  //const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getUserById(2)
      .then(userData => {
        setUser(userData);
        return Promise.all(userData.items.map(id => api.getItemById(id)));
      })
      .then(itemList => {
        setItems(itemList.filter(item => item.is_available));
      })
      .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-grow overflow-y-auto p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img className="w-24 h-24 object-cover rounded-full" src={user.avatar} alt="Profile" />
            <div>
              <h2 className="text-2xl font-bold">{user.first_name} {user.last_name}</h2>
              <p className="text-gray-600">{user.unc_email_address}</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Listed Items:</h3>
          {items.length > 0 ? (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.item_id} className="bg-gray-50 p-4 rounded-lg shadow">
                  <h4 className="text-lg font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No items currently listed.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Profile;
