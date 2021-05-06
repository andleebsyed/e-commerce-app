import './Login.css'
import { useState, createContext, useContext, useEffect } from "react"
import { useForm } from "react-hook-form";
const LoginContext = createContext()
export function Login() {
    const { user, setUser } = useLogin()
    let testuname = 'test'
    let testpw = 'test123'
    const { register, handleSubmit } = useForm()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [failure, setFailure] = useState('none')

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, [user]);
    const onSubmit = ({ username, password }) => {
        console.log("username ", username)
        console.log("password ", password)
        const data = { username, password }
        if (username === testuname && password === testpw) {
            // set the state of the user
            setUser(data)
            // store the user in localStorage
            localStorage.setItem('user', JSON.stringify(data))
            // setAccess(true)
        }
        else {
            setFailure('block')
        }
    }

    function handleLogout() {
        setUser();
        setUsername("");
        setPassword("");
        localStorage.clear();
    }
    if (user) {
        return (
            <div className="button-div">
                <p className="welcome-text">Welcome {user.username}</p>
                <button className="button button-primary button-custom" onClick={handleLogout}>Logout</button>
            </div >

        )
    }
    else {
        return (
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="login-main">
                    <p style={{ display: failure, color: 'red' }}>Username or password is incorrect</p>
                    <label for="username"><b>Username</b></label>
                    <input className="input-field" type="text" placeholder="Enter Username" name="username" required {...register("username", {
                        required: "Required",
                    })} />

                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" required {...register("password", {
                        required: "Required",
                    })} />
                    <input type="submit" style={{ margin: '1rem' }} />
                </div>
            </form>
        )
    }
}


export function LoginProvider({ children }) {
    // const [allowaccess, setAccess] = useState(false)
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