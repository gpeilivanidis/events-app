import { useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { deleteEvent, getEvent, reset } from "../features/events/eventSlice"
import {FaRegEdit, FaRegTrashAlt} from 'react-icons/fa'
import Map from "../components/Map"

function Event() {
    const url = useLocation().pathname
    const urlid = url.substring(`/event/`.length)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth)
    const {viewEvent, isError, isSuccess, isLoading, message} = useSelector(state => state.event)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        // delete success
        if(isSuccess){
            navigate('/')
        }

        if(!viewEvent){
            dispatch(getEvent(urlid))
        }

        return () => {
            dispatch(reset())
        }
    }, [viewEvent, isSuccess, isError, message, urlid, dispatch, navigate])

    const onEdit = () => {
        navigate(`/update-event/${viewEvent._id}`)
    }

    const onDelete = () => {
        dispatch(deleteEvent(viewEvent._id))
    }

    if(isLoading){
        return <Spinner />
    }
    
  return (
    <div className="event">
        {viewEvent && (
            <div className="event-content">
                <h1 className="event-title">{viewEvent && viewEvent.title}</h1>
                <span className="event-date">
                    {viewEvent && new Date(viewEvent.date.toString()).toISOString().split('T')[0]}
                </span>
                <div className="event-location">
                    <p className="event-address">{viewEvent && viewEvent.location.address}</p>
                    <Map
                     mapLocation={viewEvent && viewEvent.location}
                     search={false}
                    />
                </div>
            </div>
        )}

        {user && viewEvent && (user._id === viewEvent.author) && (
            <div className="event-footer">
                <button className="btn btn-header" type="button" onClick={onEdit} title="Edit event"> <FaRegEdit /> </button>
                <button className="btn btn-header" type="button" onClick={onDelete} title="Delete event"> <FaRegTrashAlt /> </button>
            </div>
        )}   
    </div>
  )
}

export default Event