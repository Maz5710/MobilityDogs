import { Link } from 'react-router-dom'
import { CartFill } from 'react-bootstrap-icons'

const Notification = ({ type }) => {
  return (
    <div>
      {type} <Link to={'/cart'}><CartFill/>View Cart</Link>
    </div>
  )
}

export default Notification