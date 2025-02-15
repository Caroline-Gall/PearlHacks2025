import { useState } from 'react'
import './App.css'
import Header from './components/Header'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-8">
          
          
          {Array.from({ length: 10 }).map((_, index) => (
            <section key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Section {index + 1}</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
