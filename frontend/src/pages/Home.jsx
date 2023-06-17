import {useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { getEvents, getMyEvents, reset } from '../features/events/eventSlice'
import Spinner from '../components/Spinner'
import EventItem from '../components/EventItem'

function Home() {
    const location = useLocation().pathname
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {events, isError, isLoading, message} = useSelector((state) => state.event)
    
    useEffect(() => {
        if(isError){
            console.log(message)
        }
        // get events based on the url path
        if(location === '/'){
            dispatch(getEvents())
        } else if (location === '/my-events' && user){
            dispatch(getMyEvents())
        } else {
            navigate('/')
        }

        return () => {
            dispatch(reset())
        }
        
    }, [user, location, isError, message, dispatch, navigate])
    
    if(isLoading){
        return <Spinner />
    }

  return (
    <>
        <div className="heading">
            {location === '/' ? (
                <h1>Welcome {user && user.name}</h1>
            ) : (
                <h1>My Events</h1>
            )}
        </div>
        {/* render the events in the state */}
        <div className="content">

            {events.length > 0 ? (

                <div className="events">
                    {events.map((event) => (

                        <EventItem key={event._id} event={event} />

                    ))}
                </div>
            ) : ( 
                <h3>No events found</h3>
            )}
        </div>
    </>
  )
}

export default Home