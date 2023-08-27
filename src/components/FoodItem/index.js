import {AiOutlinePlus, AiOutlineMinus} from 'react-icons/ai'
import {useState} from 'react'
import './index.css'
import CartContext from '../../CartContext'

const FoodItem = props => {
  const [quantity, setQuantity] = useState(0)

  const {foodItemDetails} = props
  const {
    addonCat,
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishImage,
    dishName,
    dishPrice,
    dishType,
  } = foodItemDetails

  const vegAndNonVegImageUrl =
    dishType === 2
      ? 'https://res.cloudinary.com/dyivs1j8u/image/upload/v1693058044/green_skfdnq.png'
      : 'https://res.cloudinary.com/dyivs1j8u/image/upload/v1693058018/red_ajc8ge.jpg'

  return (
    <CartContext>
      {value => {
        const {incrementQuantity, decrementQuantity} = value
        const increaseQuantity = () => {
          setQuantity(prev => prev + 1, incrementQuantity(quantity))
        }

        const decreaseQuantity = () => {
          if (quantity > 0) {
            setQuantity(prev => prev - 1, decrementQuantity(quantity))
          }
        }

        return (
          <li className="food-item-card">
            <div className="item-details">
              <div className="row">
                <img
                  src={vegAndNonVegImageUrl}
                  alt="vegOrNonVeg"
                  className="veg-image"
                />
                <div>
                  <h1 className="food-title">{dishName}</h1>

                  <p className="price-text">
                    {dishCurrency}
                    {'  '} {dishPrice}
                  </p>
                  <p className="food-description">{dishDescription}</p>

                  {dishAvailability ? (
                    <div className="btn-container">
                      <button
                        type="button"
                        onClick={decreaseQuantity}
                        className="change-quantity"
                      >
                        <AiOutlineMinus />
                      </button>
                      <p>{quantity}</p>
                      <button
                        type="button"
                        onClick={increaseQuantity}
                        className="change-quantity"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  ) : (
                    <p className="not-available">Not Available</p>
                  )}
                  {addonCat.length > 0 && (
                    <p className="customization-text">
                      Customizations available
                    </p>
                  )}
                </div>
              </div>
            </div>
            <p className="calories-text">{dishCalories} calories</p>
            <img src={dishImage} alt="dish" className="dish-image" />
          </li>
        )
      }}
    </CartContext>
  )
}

export default FoodItem
