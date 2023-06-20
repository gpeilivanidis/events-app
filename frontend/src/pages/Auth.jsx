import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {toast} from 'react-toastify'
import { reset } from '../features/auth/authSlice'
import Register from "../components/Register"
import Login from "../components/Login"

function Auth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isError, isSuccess, message} = useSelector((state) => state.auth) 

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate('/')
        }
        
        return () => {
            dispatch(reset())
        }
    }, [user, isError, isSuccess, message, navigate, dispatch])

    return (
        <>
            <div className="auth-container">
                <Login />
                <Register />
            </div>
        </>
    )
}

export default Auth