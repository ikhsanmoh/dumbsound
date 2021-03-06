import './TransactionActionDropdown.css'

const TransactionActionDropdown = ({ id, startDate, actionHandler }) => {
  const dropDownClick = (i) => {
    document.getElementById(`transactionActionDropdown-${i}`).classList.toggle("show");
  }

  return (
    <div className="transaction-dropdown">
      <div className="transaction-dropdownbtn-wrapper">
        <div onClick={() => dropDownClick(id)} className="dropbtn">
        </div>
        <div className="dropdown-icon">
          <img src="/dropdown-icon.png" alt="..." />
        </div>
      </div>
      <div id={`transactionActionDropdown-${id}`} className="dropdown-content action-content">
        <h4 className="approved" onClick={() => actionHandler(id, startDate, '1')}>Approved</h4>
        <h4 className="cancel" onClick={() => actionHandler(id, startDate, '0')}>Cancel</h4>
      </div>
    </div>
  )
}

export default TransactionActionDropdown
