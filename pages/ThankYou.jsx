import { Link } from "react-router-dom"

const ThankYou = () => {
  return (
    <div className="thankyou-page">
      <h1>Thank You for Your Order!</h1>
      <p>Your food will be ready shortly. Enjoy! 🍔🍟</p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  )
}

export default ThankYou
