import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getEvent, reset } from "../features/events/eventSlice"
import { toast } from "react-toastify"
import Spinner from "./Spinner"

function EventItem({event}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { viewEvent, isError, viewEventSuccess, isLoading, message } = useSelector(state => state.event)
    
    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(viewEventSuccess && viewEvent){
            navigate(`/event/${viewEvent._id}`)
        }

        return () => {
            dispatch(reset())
        }
    },[viewEvent, isError, viewEventSuccess, message, event._id, navigate, dispatch])
    
    const onClick = () => {
        dispatch(getEvent(event._id))
    }

    // address rendering
    const splitAddressArray = event.location.address.split(',')
    const address = splitAddressArray[0] + ', ' + splitAddressArray[splitAddressArray.length-1]

    if(isLoading){
        return <Spinner />
    }

  return (
    <button type="button" className="home-event-card" onClick={onClick}>
        <div className="home-event">
            <h2 className='home-event-title'>{event.title}</h2>
            <div className="home-event-address">{address}</div>
            <div className="home-event-date">
                {new Date(event.date.toString()).toISOString().split('T')[0]}
            </div>
        </div>
    </button>
  )
}

export default EventItem