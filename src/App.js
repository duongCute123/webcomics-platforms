import { useDispatch, useSelector } from "react-redux"
import RouterPage from "./router/Router"
import { logOut, loginSucces, selectedUser } from "./store/auth/userslice"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./@config"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const user = useSelector(selectedUser)
  console.log(user);
  const dispatch = useDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        console.log(userAuth);
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
  }, [])
  return (
    <div className="app">
      <RouterPage />
      <ToastContainer />
    </div>
  )
}
export default App