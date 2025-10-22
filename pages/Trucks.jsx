import { useNavigate } from "react-router-dom"

const Trucks = () => {
  const navigate = useNavigate()
  const trucks = [
    { id: 1, name: "Michael Meals", image: "/images/michael truck2.png" },
    { id: 2, name: "Saad Snacks", image: "/images/saad truck2.png" },
    { id: 3, name: "Rabab Ice-Creams", image: "/images/Rababs truck.png" },
    { id: 4, name: "Jameela Eats", image: "/images/jameelas truck.png" },
  ]

  const handleTruckClick = (truckName) => {
    const encodedName = encodeURIComponent(truckName.trim())
    navigate(`/order/${encodedName}`)
  }

  return (
    <div className="trucks-page">
      <h1>Select a Truck</h1>
      <div className="truck-list">
        {trucks.map((truck) => (
          <div
            key={truck.name}
            className="truck-card"
            onClick={() => handleTruckClick(truck.name)}
          >
            <img src={truck.image} alt={truck.name} />
            <h3>{truck.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Trucks
