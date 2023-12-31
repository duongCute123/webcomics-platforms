import { Link, useNavigate } from "react-router-dom"
import {  selectedUser } from "../../store/auth/userslice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../@config"
import { toast } from "react-toastify";
const LoginPage = () => {
    const user = {
        email: "",
        password: ""
    }
    const users = useSelector(selectedUser)
    const [infoUser, setInfoUser] = useState(user)
    const navigation = useNavigate()
    const [message, setMessage] = useState("")
    useEffect(() => {
        if (users) {
            navigation("/")
        }
    }, [users])
    const validation = () => {
        const msg = {
        }
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regexPass = /^[a-zA-Z0-9]{6,8}$/
        if (!infoUser.email) {
            msg.email = "Vui lòng nhập địa chỉ email"
        } else if (!regexEmail.test(email)) {
            msg.email = "Nhập lại email theo name@gmail.com"
        } else {
            msg.email = ""
        }
        if (!infoUser.password) {
            msg.password = "Vui lòng nhập mật khẩu"
        }
        if (!regexPass.test(password)) {
            msg.password = "Vui lòng nhập mật khẩu từ 6->8 ký tự"
        }
        setMessage(msg)
        return !msg.email && !msg.password
    }
    const handlerChangValue = (e) => {
        const { name, value } = e.target
        setInfoUser({ ...infoUser, [name]: value })
    }
    const handlerSubmit = (e) => {
        e.preventDefault()
        const isValid = validation()

        if (isValid) {
            signInWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const IDTokent = res.user.accessToken
                    localStorage.setItem("token", IDTokent)
                    navigation("/")
                })
                .catch(err => {
                    toast("Lỗi đăng nhập")
                    console.log(err);

                })
        }
    }
    const { email, password } = infoUser
   
    return (
        <section className="bg-gray-50 w-full flex flex-col justify-center items-center min-h-screen dark:bg-gray-900">
            <div className="flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Đăng Nhập
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ email</label>
                                <input type="text" name="email" id="email" value={email} onChange={handlerChangValue} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Vui lòng nhập địa chỉ email" />
                                <span>{message.email}</span>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input type="password" name="password" id="password" onChange={handlerChangValue} value={password} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <span>{message.password}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                            </div>
                            <button onClick={handlerSubmit} type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 
                            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
                             dark:focus:ring-primary-800">ĐĂNG NHẬP</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Chưa có tài khoản? <Link to="/user/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default LoginPage