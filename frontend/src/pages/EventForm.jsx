import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { createEvent, updateEvent, reset, getEvent } from "../features/events/eventSlice"
import Map from "../components/Map"

function EventForm() {
    const url = useLocation().pathname
    const updateURL = url.startsWith('/update-event/')
    const urlid = url.substring(`/update-event/`.length)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const {viewEvent, isError, viewEventSuccess, isSuccess, isLoading, message} = useSelector((state) => state.event)

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        location: ''
    })
    let {title, date, location} = formData

    useEffect(() => {
        if(!user){
            navigate('/')
        }

        // if user isnt the author
        if(viewEventSuccess && (!user || !viewEvent || user._id !== viewEvent.author) ){
            navigate('/')
        }

        if(isError) {
            toast.error(message)
        }

        // create / update success
        if(isSuccess){
            navigate(`/event/${viewEvent._id}`)
        }

        // getEvent success
        if(viewEventSuccess && user && viewEvent && user._id === viewEvent.author){
            setFormData(() => ({
                title: viewEvent.title,
                date: new Date(viewEvent.date.toString()).toISOString().split('T')[0],
                location: viewEvent.location
            }))
        }

        // update-event path
        if(updateURL && user){
            // viewEvent doesnt have urlid
            if( !viewEvent || (urlid !== viewEvent._id.toString())){
                dispatch(getEvent(urlid))
            } else {
            // viewEvent has urlid

                // check authorization
                if(!user || user._id !== viewEvent.author){
                    navigate('/')
                }

                // init form with event's data
                setFormData(() => ({
                    title: viewEvent.title,
                    date: new Date(viewEvent.date.toString()).toISOString().split('T')[0],
                    location: viewEvent.location
                }))
            }
        }

        return () => {
            dispatch(reset())
        }
    }, [user, viewEvent, isSuccess, viewEventSuccess, isError, message, updateURL, urlid, navigate, dispatch])

    // location from map
    const onForm = (searchLocation) => {
        setFormData((prevState) => ({
            ...prevState,
            location: searchLocation
        }))
    }
    
    // input change
    const onChange = async (e) => {

        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    // submit
    const onSubmit = async (e) => {
        e.preventDefault()

        title = title.trim()
        date = date.trim()

        if(!title || !date || !location){
            toast.error('Invalid input')
        }

        const eventData = {
            title,
            date,
            location
        }

        if(updateURL){
            dispatch(updateEvent({id: viewEvent._id, eventData: eventData}))
        } else {
            dispatch(createEvent(eventData))
        }
    }

    if(isLoading){
        return <Spinner />
    }
    
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            {/* title */}
            <div className="form-group">
                <input type="text" className='form-control' name='title' id='title' value={title} placeholder='Title' onChange={onChange} />
            </div>
            {/* date */}
            <div className="form-group">
                <input type="date" className='form-control' name='date' id='date' value={date} onChange={onChange} />
            </div>
            {/* address */}
            {/* <div className="form-group">
                <input type="text" className='form-control' name='address' id='address' value={address} placeholder='Address' onChange={onChange} />
            </div> */}
            {/* map */}
            <Map onForm={onForm} mapLocation={(updateURL && viewEvent) && viewEvent.location} />
            {/* submit */}
            <div className="form-group">
                <button
                 className='btn btn-block'
                 type='submit'>

                    {!updateURL ? 'Create Event' : 'Update Event'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default EventForm