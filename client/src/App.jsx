import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route, Navigate } from "react-router-dom"
import Welcome from " ./pages/Welcome.jsx"
import Order from " ./pages/Order.jsx"
import ThankYou from "./pages/ThankYou.jsx"
import "./App.css"

const App = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/order")
        setOrders(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getOrders()
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/order"
          element={<Order orders={orders} setOrders={setOrders} />}
        />
        <Route path="/thanks" element={<ThankYou />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <div className="wrap">
        <h1>Orders:</h1>
        {orders?.map((order) => (
          <div key={order._id} className="receipt">
            <h3>Customer: {order.customerName}</h3>
            {order.truck?.name && <p>Truck: {order.truck.name}</p>}
            {order.notes && <p>Request: {order.notes}</p>}
            <ul>
              {order.items?.map((line) => (
                <li key={line._id}>
                  {line.item?.name || "Item"} x {line.quantity} -{" "}
                  {line.item?.price
                    ? (line.item.price * line.quantity).toFixed(2)
                    : "0.00"}{" "}
                  BD
                </li>
              ))}
            </ul>
            {typeof order.total === "number" && (
              <p>
                <b>Total:</b> {order.total.toFixed(2)} BD
              </p>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default App

