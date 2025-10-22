import { useNavigate } from "react-router-dom"

const Receipt = ({ orderData }) => {
  const navigate = useNavigate()

  if (!orderData) return <p>No order data available.</p>

  const { customerName, truckName, items, total } = orderData

  return (
    <div className="receipt-page">
      <h1>Receipt</h1>
      <p>
        <b>Customer:</b> {customerName}
      </p>
      <p>
        <b>Truck:</b> {truckName}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            {item.name} x {item.quantity} -{" "}
            {(item.price * item.quantity).toFixed(2)} BD
          </li>
        ))}
      </ul>
      <p>
        <b>Total:</b> {total.toFixed(2)} BD
      </p>
      <button onClick={() => navigate("/thanks")}>Done</button>
    </div>
  )
}

export default Receipt
