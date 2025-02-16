import { useState, useEffect} from 'react'
import './App.css'
import Header from './components/Header'
import api from './APIClient.js'


function App() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getAllItems().then((items) => {
      console.log("items", items)
      setItems(items); 
    }).catch(err => {
      console.log(err);
    })
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
             
          {items.map((item) => (
            <section key={item.item_id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">{item.name}</h3>
              <p className="text-gray-600">
                {item.description}
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
