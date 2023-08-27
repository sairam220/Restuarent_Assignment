import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navabar'
import FoodItem from '../FoodItem'

import TabItem from '../TabItem'
import './index.css'

const tabsList = [
  {tabId: '11', displayText: 'Salads and Soup'},
  {tabId: '12', displayText: 'From The Barnyard'},
  {tabId: '13', displayText: 'From the Hen House'},
  {tabId: '14', displayText: 'Fresh From The Sea'},
  {tabId: '15', displayText: 'Biryani'},
  {tabId: '17', displayText: 'Fast Food'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const FoodItems = () => {
  const [foodItemList, setFoodItemList] = useState([])
  const [activeTabId, setActiveTabId] = useState(tabsList[0].tabId)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const convertDishesToCamelCase = each => ({
    addonCat: each.addonCat,
    dishAvailability: each.dish_Availability,
    dishType: each.dish_Type,
    dishCalories: each.dish_calories,
    dishCurrency: each.dish_currency,
    dishDescription: each.dish_description,
    dishId: each.dish_id,
    dishImage: each.dish_image,
    dishName: each.dish_name,
    dishPrice: each.dish_price,
    nextUrl: each.nexturl,
  })

  const fetchRestaurantData = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const url = 'https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const tableMenuList = data[0].table_menu_list.map(each => ({
        categoryDishes: each.category_dishes.map(each1 =>
          convertDishesToCamelCase(each1),
        ),
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        menuCategoryImage: each.menu_category_image,
      }))

      const filteredObject = tableMenuList.filter(
        each => each.menuCategoryId === activeTabId,
      )

      setApiStatus(apiStatusConstants.success)

      setFoodItemList(filteredObject)
    }
  }

  const renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const updateActiveTabId = tabId => {
    console.log(foodItemList)
    setActiveTabId(tabId, setFoodItemList([]), fetchRestaurantData())
  }

  useEffect(() => {
    fetchRestaurantData()
  }, [activeTabId])

  const renderFoodItem = () => (
    <ul className="food-items-container">
      {foodItemList.length > 0 &&
        foodItemList[0].categoryDishes.map(each => (
          <FoodItem foodItemDetails={each} key={each.dishId} />
        ))}
    </ul>
  )

  const renderAllProducts = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderFoodItem()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />
      <div className="main-container">
        <ul className="tab-list">
          {tabsList.map(each => (
            <TabItem
              tabItemDetails={each}
              isActive={activeTabId === each.tabId}
              updateActiveTabId={updateActiveTabId}
              key={each.tabId}
            />
          ))}
        </ul>
        {renderAllProducts()}
      </div>
    </>
  )
}

export default FoodItems
