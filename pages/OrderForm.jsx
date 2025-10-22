import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FoodCard from "../src/components/FoodCard"
import CartItem from "../src/components/CartItem"

const truckMenus = {
  "Michael Meals": {
    Burgers: [
      { name: "Cheeseburger", price: 2.5 },
      { name: "Brisket", price: 5.5 },
      { name: "BBQ", price: 4.5 },
    ],
    Drinks: [
      { name: "Cola", price: 1.0 },
      { name: "Water", price: 0.8 },
    ],
  },
  "Saad Snacks": {
    Snacks: [
      { name: "Fries", price: 2.0 },
      { name: "Hot Dogs", price: 2.5 },
      { name: "Onion Rings", price: 1.5 },
    ],
    Drinks: [
      { name: "Soda", price: 1.0 },
      { name: "Juice", price: 1.2 },
    ],
  },
  "Jameela Eats": {
    Snacks: [
      { name: "Asian Rice", price: 2.0 },
      { name: "Sushi", price: 2.5 },
      { name: "Dumplings", price: 1.5 },
    ],
    Drinks: [
      { name: "Pepsi", price: 1.0 },
      { name: "Kinza Cola", price: 1.2 },
    ],
  },
  "Rabab Ice-Creams": {
    Snacks: [
      { name: "Chocolate Ice Cream", price: 1.0 },
      { name: "Mango Ice Cream", price: 2.0 },
      { name: "Strawberry Ice Cream", price: 1.5 },
    ],
  },
}

const OrderForm = ({ setLatestOrder }) => {
  const navigate = useNavigate()
  const { truckName } = useParams()

  const [customerName, setCustomerName] = useState("")
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [menuItems, setMenuItems] = useState({})

  useEffect(() => {
    const decodedName = decodeURIComponent(truckName.trim())
    setMenuItems(truckMenus[decodedName] || {})
  }, [truckName])

  const addToCart = (item) => {
    const items = [...cart.items]
    const index = items.findIndex((i) => i.name === item.name)
    if (index >= 0) {
      items[index].quantity += 1
    } else {
      items.push({ ...item, quantity: 1, id: Date.now() + Math.random() })
    }

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    setCart({ items, total })
  }

  const removeFromCart = (id) => {
    const items = cart.items.filter((i) => i.id !== id)
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    setCart({ items, total })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderData = { customerName, truckName, ...cart }
    setLatestOrder(orderData)
    navigate("/receipt")
  }

  return (
    <div className="order-page">
      <h1>Order from {decodeURIComponent(truckName)}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <h2>Menu</h2>
        {Object.keys(menuItems).length === 0 ? (
          <p>Sorry, no menu found for this truck.</p>
        ) : (
          Object.entries(menuItems).map(([category, items]) => (
            <div key={category}>
              <h3>{category}</h3>
              <div className="menu-category">
                {items.map((item, index) => (
                  <FoodCard
                    key={`${item.name}-${index}`}
                    foodName={item.name}
                    price={item.price}
                    onAdd={addToCart}
                  />
                ))}
              </div>
            </div>
          ))
        )}

        <h2>Cart</h2>
        {cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={() => removeFromCart(item.id)}
            />
          ))
        )}

        <p>
          <b>Total:</b> {cart.total.toFixed(2)} BD
        </p>
        <button type="submit" disabled={cart.items.length === 0}>
          Submit Order
        </button>
      </form>
    </div>
  )
}

export default OrderForm
