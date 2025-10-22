const FoodCard = ({ foodName, price, onAdd}) =>{
  const handleAdd = () => {
    onAdd({ foodName, price })
  }

  return (
    <div className="food-card">
      <h3>{foodName}</h3>
      <p>Price: {price} BD</p>
      <button onClick={handleAdd}>Add to Cart</button>
    </div>
  )
}

export default FoodCard
