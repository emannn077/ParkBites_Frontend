const CartItem = ({ item, onRemove }) =>{
  return (
    <div className="cart-item">
      <p>{item.foodName}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Total: {item.price * item.quantity} BD</p>
      <button onClick={()=>onRemove(item.foodName)}>Remove</button>
    </div>
  )
}
export default CartItem
