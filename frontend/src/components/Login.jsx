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
        <div className='login-container'>
            <section className="auth-header">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
            </section>
            <section className="form-container">
                <form onSubmit={onSubmit} className='auth-form'>
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
                        <button type="submit" className='btn btn-block' title='Login'>Login</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Login