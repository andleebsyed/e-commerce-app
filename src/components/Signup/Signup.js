import './Signup.css'
import { useState, createContext, useContext, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
const LoginContext = createContext()
export function Signup() {
    const { register, handleSubmit } = useForm()
    const onSubmit = () => {

    }
    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-main">
                <h1 className="login-heading">Sign Up</h1>
                <input className="input-field username" type="text" placeholder="Username" name="username" required {...register("username", {
                    required: "Required",
                })} />
                <input className="input-field email" type="email" placeholder="Email" name="email" required {...register("password", {
                    required: "Required",
                })} />
                <input className="input-field password" type="password" placeholder="Password" name="password" required {...register("password", {
                    required: "Required",
                })} />

                <input type="submit" className="button button-outline login-button" value="Sign In" />
                <p>Already have an account? <Link className="signup-link" to='/account'>Log in</Link></p>
            </div>
        </form>
    )
}
    // }


    // export function LoginProvider({ children }) {
    //     const [user, setUser] = useState()
    //     return (
    //         <LoginContext.Provider value={{ user, setUser }}>
    //             {children}
    //         </LoginContext.Provider>
    //     )
    // }


    // export function useLogin() {
    //     return (
    //         useContext(LoginContext)
    //     )
// }