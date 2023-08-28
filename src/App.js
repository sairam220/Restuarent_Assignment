import {useState} from 'react'
import FoodItems from './components/FoodItems'

import './App.css'
import CartContext from './CartContext'

const App = () => {
  const [cartListLength, setCartListLength] = useState(0)

  const incrementQuantity = () => {
    setCartListLength(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (cartListLength > 0) {
      setCartListLength(prev => prev - 1)
    }
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
