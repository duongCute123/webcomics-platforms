import { Link } from "react-router-dom"
import logo from "../../images/logo.png"
import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, ref, storage } from "../../@config"
import { getDownloadURL, uploadBytes } from "firebase/storage"
const RegisterPage = () => {
    const list = {
        email: "",
        photoURL: "",
        displayName: "",
        password: ""
    }
    const [forms, setForms] = useState(list)
    const handlerChangValue = (e) => {
        const { name, value, type } = e.target
        if (type === 'file') {
            setForms({ ...forms, [name]: e.target.files[0] })
        } else {
            setForms({ ...forms, [name]: value })
        }
    }
    const uploadImageToFirebase = async (file) => {
        const storageRef = ref(storage, `images/${file.name}`)
        await uploadBytes(storageRef, file)
        const photoURL = await getDownloadURL(storageRef)
        console.log(photoURL);
        return photoURL
    }
    const handlerSubmit = async (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user
                if (photoURL) {
                    const imageURL = await uploadImageToFirebase(photoURL)
                    forms.photoURL = imageURL
                    console.log(imageURL);
                    updateProfile(user, {
                        photoURL: imageURL,
                        displayName: displayName
                    })
                        .then(info => {
                            console.log(info);
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }

            })
            .catch(err => {
                console.log(err);
            })
    }
    const { email, password, photoURL, displayName } = forms
    console.log(forms);
    return (
        <section className="bg-gray-50 w-full flex flex-col justify-center items-center min-h-screen dark:bg-gray-900">
            <div className="flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    Truyện Tranh
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            ĐĂNG KÝ
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ email</label>
                                <input type="text" name="email" id="email" value={email} onChange={handlerChangValue} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập họ và tên</label>
                                <input type="text" name="displayName" value={displayName} onChange={handlerChangValue} id="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nguyễn Văn A " required="" />
                            </div>
                            <div>
                                <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập họ và tên</label>
                                <input type="file" name="photoURL" onChange={handlerChangValue} id="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input type="password" name="password" value={password} onChange={handlerChangValue} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div> */}
                            <button type="submit" onClick={handlerSubmit} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">ĐĂNG KÝ</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Đã có tài khoản? <Link to="/user/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default RegisterPage