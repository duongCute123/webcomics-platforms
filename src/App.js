import { useDispatch } from "react-redux"
import RouterPage from "./router/Router"
import { logOut, loginSucces } from "./store/auth/userslice"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./@config"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(loginSucces({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }))
      } else {
        dispatch(logOut())
      }
    })
  }, [dispatch])
  return (
    <div className="app">
      <RouterPage />
      <ToastContainer />
    </div>
  )
}
export default App