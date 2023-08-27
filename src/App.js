import {useState} from 'react'
import FoodItems from './components/FoodItems'

import './App.css'
import CartContext from './CartContext'

const App = () => {
  const [cartListLength, setCartListLength] = useState(0)

  const incrementQuantity = quantity => {
    setCartListLength(quantity)
  }

  const decrementQuantity = quantity => {
    setCartListLength(quantity)
  }

  return (
    <CartContext.Provider
      value={{cartListLength, incrementQuantity, decrementQuantity}}
    >
      <FoodItems />
    </CartContext.Provider>
  )
}

export default App
