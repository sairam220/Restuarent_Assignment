import './index.css'

const TabItem = props => {
  const {tabItemDetails, isActive, updateActiveTabId} = props
  const {tabId, displayText} = tabItemDetails

  const changeActiveTabId = () => {
    updateActiveTabId(tabId)
  }

  return (
    <li>
      <button
        type="button"
        className={isActive ? 'active-button' : 'tab-button'}
        onClick={changeActiveTabId}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
