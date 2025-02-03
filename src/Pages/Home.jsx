import React from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import { useState } from 'react'
const Home = () => {
  const [sortBy, setSortBy] = useState("price-asc");
  const [category, setCategory] = useState("all");
  const data = { sortBy: sortBy, category: category }
  return (
    <div>
      <Navbar />
      <div className='col-span-1 bg-slate-900 flex gap-3 p-2 px-10 text-white'>

        <select value={category} onChange={(e) => { setCategory(e.target.value) }} className="mt-1 bg-slate-900 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="all">All</option>
          <option value="gadgets">Gadgets</option>
          <option value="smartphones">SmartPhones</option>
          <option value="footwear">Footwear</option>
          <option value="fashion">Fashion</option>
        </select>
        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value) }} className="mt-1 p-2 border bg-slate-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
        </select>
      </div>
      <Products data={data} />
    </div>
  )
}

export default Home