import { useDispatch, useSelector } from "react-redux"
import RouterPage from "./router/Router"
import { logOut, loginSucces, selectedUser } from "./store/auth/userslice"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./@config"
import LoginPage from "./main/login/login"

function App() {
  const user = useSelector(selectedUser)
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
  }, [])
  return (
    <div className="app">
      {/* {
        !user ?
          <LoginPage />
          :
          <RouterPage />
      } */}
      <RouterPage />
    </div>
  )
}
export default App