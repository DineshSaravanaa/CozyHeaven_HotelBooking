import { Route, Routes } from "react-router"
import Login from "./components/hotel-owner/Login"
import OwnerDashboard from "./components/hotel-owner/OwnerDashboard"

function App() {
  return (
    <>
     <Routes>
      <Route index path="" element={<Login/>}/>
      
      </Routes>
    </>
  )
}

export default App
