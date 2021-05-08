import './Login.css'
import { useState, createContext, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
const LoginContext = createContext()
export function Login() {
    const { user, setUser } = useLogin()
    let testuname = 'test'
    let testpw = 'test123'
    const { register, handleSubmit } = useForm()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [innetText, setInnerText] = useState(false)
    const [failure, setFailure] = useState('none')

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, [user]);
    const onSubmit = ({ username, password }) => {

        let unBox = document.querySelector('.username');
        let pwBox = document.querySelector('.password');
        const data = { username, password }
        if (username === testuname && password === testpw) {
            // set the state of the user
            setUser(data)
            // store the user in localStorage
            localStorage.setItem('user', JSON.stringify(data))
        }
        else {
            // unBox.innerText = ''
            // pwBox.innetText = ''
            setFailure('block')




        }
    }

    // function handleLogout() {
    //     setUser();
    //     setUsername("");
    //     setPassword("");
    //     localStorage.clear();
    // }
    // if (user) {
    //     return (
    //         <div className="button-div">
    //             <p className="welcome-text">Welcome {user.username}</p>
    //             <button className="button button-primary button-custom" onClick={handleLogout}>Logout</button>
    //         </div >

    //     )
    // }
    // else {
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-main">
                <h1 className="login-heading">Login</h1>
                <p className="error-message" style={{ display: failure, color: 'red' }}>Username or password is incorrect</p>
                <input className="input-field username" type="text" placeholder="Enter Username" name="username" required {...register("username", {
                    required: "Required",
                })} />
                <input className="input-field password" type="password" placeholder="Enter Password" name="password" required {...register("password", {
                    required: "Required",
                })} />
                <input type="submit" className="button button-outline login-button" value="Login" />
                <Link to='#' className="password-reset">Forgot Password?</Link>
                <p>Don't have an account? <Link className="signup-link" to='/signup'>Sign up</Link></p>
            </div>
        </form>
    )
    // }
}


export function LoginProvider({ children }) {
    const [user, setUser] = useState()
    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {children}
        </LoginContext.Provider>
    )
}


export function useLogin() {
    return (
        useContext(LoginContext)
    )
}