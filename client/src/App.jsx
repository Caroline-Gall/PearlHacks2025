import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { FaMapMarkerAlt, FaUser, FaCheck, FaTimes, FaSearch, FaPlus } from 'react-icons/fa';
import api from './APIClient';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';



function App() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [listButtonClicked, setListButtonClicked] = useState(false);
  const [nameToAdd, setNameToAdd] = useState("");
  const [descriptionToAdd, setDescriptionToAdd] = useState("");
  const [priceToAdd, setPriceToAdd] = useState("");
  const [locationToAdd, setLocationToAdd] = useState("");

  const categories = ['academic', 'household', 'tickets', 'miscellaneous', 'clothing', 'services'];

  useEffect(() => {
    api.getAllItems()
      .then((items) => {
        setItems(items);
      })
      .catch(err => {
        console.error('Error fetching items:', err);
      });
  }, []);

    useEffect(() => {
      api.getAllUsers()
        .then(users => {
          setUsers(users);
        })
        .catch(err => console.error(err));
    }, []);

  const filteredItems = items.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchLower)

    const matchesCategory = !selectedCategory || item.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });


  const handleClose = () => {
    setListButtonClicked(false);
  };

  const handleAdd = () => {
    const itemToAdd = {
      "name": nameToAdd,
      "description": descriptionToAdd,
      "location": locationToAdd,
      "price": priceToAdd
    }
    api.addItem(itemToAdd)
      .then((response) => {
        if (response.flag) {

        }
        else {
          console.error('Error adding item:', err);
        }
      })
      .catch(err => {
        console.error('Error adding item:', err);
      });
    setListButtonClicked(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header setListButtonClicked={setListButtonClicked} />
      <main className="flex-1 container mx-auto px-2 py-4">

        <Dialog
          open={listButtonClicked}
          onClose={handleClose}
        >
          <DialogTitle>
            {"Add new item"}
          </DialogTitle>
          <DialogContent>
            <input
              type="text"
              placeholder="Name"
              value={nameToAdd}
              onChange={(e) => setNameToAdd(e.target.value)}
              className="w-full px-4 py-2 my-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B9CD3] focus:ring-2 focus:ring-[#4B9CD3] focus:ring-opacity-20"
            />
            <input
              type="text"
              placeholder="Description"
              value={descriptionToAdd}
              onChange={(e) => setDescriptionToAdd(e.target.value)}
              className="w-full px-4 py-2 mb-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B9CD3] focus:ring-2 focus:ring-[#4B9CD3] focus:ring-opacity-20"
            />
            <input
              type="text"
              placeholder="Location"
              value={locationToAdd}
              onChange={(e) => setLocationToAdd(e.target.value)}
              className="w-full px-4 py-2 pl-10 mb-2 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B9CD3] focus:ring-2 focus:ring-[#4B9CD3] focus:ring-opacity-20"
            />
            <input
              type="text"
              placeholder="Price"
              value={priceToAdd}
              onChange={(e) => setPriceToAdd(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B9CD3] focus:ring-2 focus:ring-[#4B9CD3] focus:ring-opacity-20"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAdd}>Add Item!</Button>
            <Button onClick={handleClose} autoFocus>Close</Button>
          </DialogActions>
        </Dialog>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">Find an item!</h3>
        {/* Search Bar */}
        <div className="flex flex-wrap mb-4 justify-between">
          <div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-[#4B9CD3] focus:ring-2 focus:ring-[#4B9CD3] focus:ring-opacity-20"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${!selectedCategory
                  ? 'bg-[#4B9CD3] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedCategory === category
                    ? ' bg-[#4B9CD3] text-white'
                    : ' bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users && users.length > 0 && filteredItems.map((item) => {
            const user = users.find(user => user.user_id == item.owner_id);
            return (
            <div key={item.item_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image Section */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={item.pic_path}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-3">
                {/* Title and Price */}
                <div className="flex justify-between items-start">
                  <Link to={`/items/${item.item_id}`} className="text-lg font-semibold text-gray-800">{item.name}</Link>
                  <span className="text-lg font-bold text-[#4B9CD3]">
                    ${(item.price || 0).toFixed(2)}
                  </span>
                </div>
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {item.category?.map((cat, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#4B9CD3] bg-opacity-10 text-white rounded-full text-xs"
                    >
                      {cat}
                    </span>
                  )) || null}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm">{item.description}</p>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-[#4B9CD3]" />
                  <span>{item.location}</span>
                </div>

                {/* Owner and Availability */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <img className="w-8 object-cover rounded-full" src={user.avatar} alt="Profile" />
                    <span>{user.first_name} {user.last_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.is_available ? (
                      <span className="flex items-center text-green-500 text-sm">
                        <FaCheck className="mr-1" />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500 text-sm">
                        <FaTimes className="mr-1" />
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </main>
    </div>
  );
}

export default App;
