import {FaSignInAlt, FaSignOutAlt, FaPlus, FaRegHeart} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {reset as eventReset} from '../features/events/eventSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onAdd = () => {
        dispatch(eventReset())
        navigate('/create-event/')
    }

    const onMyEvents = () => {
        dispatch(eventReset())
        navigate('/my-events')
    }

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Events App</Link>
        </div>
        <ul>
            {user ? (
                <>
                    <li>
                        <button className='btn' onClick={onAdd}>
                            <FaPlus /> Create Event
                        </button>
                    </li>
                    <li>
                        <button className='btn' onClick={onMyEvents}>
                            <FaRegHeart /> My Events
                        </button>
                    </li>
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </>
            ) : (
                <li>
                    <Link to='/auth'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
            )}
            
        </ul>
    </header>
  )
}

export default Header