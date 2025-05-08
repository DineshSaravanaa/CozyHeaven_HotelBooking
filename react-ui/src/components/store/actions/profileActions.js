// src/actions/fetchProfile.js
import axios from "axios";
import { setProfile } from "../profileSlice";

const fetchProfile = () => async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
        const resp = await axios.get("http://localhost:8080/api/customer/getcustomer", {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setProfile({ profile: resp.data }));
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
};

export default fetchProfile;