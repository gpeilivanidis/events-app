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

    if(isLoading){
        return <Spinner />
    }

  return (
    <button type="button" className="btn-link" onClick={onClick}>
        <div className="event">
            <h2 className='event-title'>{event.title}</h2>
            <div className="event-location">{event.location.address}</div>
            <div className="event-date">
                {new Date(event.date.toString()).toISOString().split('T')[0]}
            </div>
        </div>
    </button>
  )
}

export default EventItem