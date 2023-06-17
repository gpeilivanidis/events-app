import {useState} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice'
import Spinner from './Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {email, password} = formData
    const dispatch = useDispatch()
    const {isLoading} = useSelector((state) => state.auth)
    
    const onChange = (e) => {
        setFormData((prevState) => ({
           ...prevState,
           [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    {/* email */}
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    {/* password */}
                    <div className="form-group">
                        <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
                    </div>
                    {/* submit */}
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login