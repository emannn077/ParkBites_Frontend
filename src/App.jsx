import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route, Navigate } from "react-router-dom"
import OrderForm from "../pages/OrderForm"
import Welcome from "../pages/Welcome"
import ThankYou from "../pages/ThankYou"
import Receipt from "../pages/Receipt"
import Trucks from "../pages/Trucks"
import "./App.css"

const App = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders")
        console.log(response.data)
        setOrders(response.data)
      } catch (err) {
        console.error("Error fetching orders:", err.message)
      }
    }
    getOrders()
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/trucks" element={<Trucks />} />{" "}
        {/* ✅ Added missing route */}
        <Route
          path="/order/:truckName"
          element={<OrderForm orders={orders} setOrders={setOrders} />}
        />
        <Route path="/thanks" element={<ThankYou />} />
        <Route path="/receipt" element={<Receipt />} />{" "}
        {/* Optional: if used */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
