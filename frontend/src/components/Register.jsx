import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import {register} from '../features/auth/authSlice'
import Spinner from './Spinner'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const {name, email, password, password2 } = formData
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

        if(password !== password2){
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <div className='register-container'>
            <section className="auth-header">
                <h1>
                    <FaUser /> Register
                </h1>
            </section>
            <section className="form-container">
                <form  onSubmit={onSubmit} className='auth-form'>
                    {/* name */}
                    <div className="form-group">
                        <input type="text" className="form-control" id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange} />
                    </div>
                    {/* email */}
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange} />
                    </div>
                    {/* password */}
                    <div className="form-group">
                        <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange} />
                    </div>
                    {/* password2 */}
                    <div className="form-group">
                        <input type="password" className="form-control" id='password2' name='password2' value={password2} placeholder='Confirm your password' onChange={onChange} />
                    </div>
                    {/* submit */}
                    <div className="form-group">
                        <button type="submit" className='btn btn-block' title='Register'>Register</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Register