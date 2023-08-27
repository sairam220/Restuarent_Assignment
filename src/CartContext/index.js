import React from 'react'

const CartContext = React.createContext({
  cartListLength: 0,
  incrementQuantity: () => {},
  decrementQuantity: () => {},
})

export default CartContext
