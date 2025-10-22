import { Link } from "react-router-dom"

const Welcome = () => {
  return (
    <div className="welcome">
      <h1>Welcome to SEB-X ParkBites !! </h1>
      <img src="/images/hungry.gif" alt="Hungry gif" className="welcome-gif" />

      <Link to="/trucks" className="start-button">
        Select your Food Truck{" "}
      </Link>
    </div>
  )
}
export default Welcome
