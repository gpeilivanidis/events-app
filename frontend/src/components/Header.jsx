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
    <header className='main-header'>
        <div className="logo">
            <Link to='/' className='logo-text no-underline'>Events App</Link>
        </div>
        <ul className='header-buttons'>
            {user ? (
                <>
                    <li>
                        <button className='btn btn-header' onClick={onAdd} title='Create event'>
                            <FaPlus />
                        </button>
                    </li>
                    <li>
                        <button className='btn btn-header' onClick={onMyEvents} title='My events'>
                            <FaRegHeart />
                        </button>
                    </li>
                    <li>
                        <button className='btn btn-header' onClick={onLogout} title='Logout'>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </>
            ) : (
                <li>
                    <Link to='/auth' className='no-underline btn btn-header'>
                        <FaSignInAlt /> Login
                    </Link>
                </li>
            )}
            
        </ul>
    </header>
  )
}

export default Header