import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'
import CartContext from '../../CartContext'

const Navbar = () => (
  <CartContext.Consumer>
    {value => {
      const {cartListLength} = value
      return (
        <div className="navbar">
          <h1 className="navbar-heading">UNI Resto Cafe</h1>
          <div className="flex">
            <h1 className="navbar-cart">My Orders</h1>
            <div className="cart">
              <span className="count">{cartListLength}</span>

              <AiOutlineShoppingCart className="cart-icon" />
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Navbar
