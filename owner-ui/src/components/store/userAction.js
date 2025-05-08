import axios from "axios"
import { setUsers } from "./userSlice"

const fetchUser = () => async (dispatch) => {
    
    let token = localStorage.getItem('token')
    let header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const response = await axios.get('http://localhost:8083/api/hotelowner/get',header)
    console.log(response.data)
    dispatch(setUsers({users:(response).data}))

}
export default fetchUser