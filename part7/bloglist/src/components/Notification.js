import {Alert} from '@material-ui/lab'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return !notification
    ? null
    : (
      <Alert>
        {notification}
      </Alert>
    )
}

export default Notification