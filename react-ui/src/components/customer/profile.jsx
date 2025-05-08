import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import fetchProfile from "../store/actions/profileActions";
import "./profile.css";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profileData = useSelector((state) => state.profile.profile);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        address: ""
    });

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profileData) {
            setFormData(profileData);
        }
    }, [profileData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const payload = {
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            address: formData.address
        };
        try {
            await axios.put("http://localhost:8080/api/customer/profile/update", payload, {
                headers: { Authorization: `Bearer ${token}`}
            });
            dispatch(fetchProfile()); // refresh profile after update
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    

    return (
        <div>
            <div className="rooms-navbar">
                <h2 className="hotel-title">ROOMS</h2>
            </div>
        <div className="container-fluid">
            <div className="row my-4" />
            <div className="row my-4" />
            <div className="row">
                <div className="col-sm-4">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={() => navigate("/CustomerDashboard")}>
                            Back
                        </button>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white position-relative">
                            <h5 className="mb-0 text-center">User Profile</h5>
                            <small className="d-block text-center">Welcome, {formData.name}</small>
                            <button
                                className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                        </div>

                        <div className="card-body">
                            {isEditing ? (
                                <>
                                    {["name", "email", "contact", "address"].map((field) => (
                                        <div className="row mb-2" key={field}>
                                            <div className="col-5 font-weight-bold">{field.charAt(0).toUpperCase() + field.slice(1)}:</div>
                                            <div className="col-7">
                                                <input
                                                    name={field}
                                                    className="form-control"
                                                    value={formData[field]}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-center mt-3">
                                        <button className="btn btn-success" onClick={handleSave}>
                                            Save
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {["name", "email", "contact", "address"].map((field) => (
                                        <div className="row mb-2" key={field}>
                                            <div className="col-5 font-weight-bold">{field.charAt(0).toUpperCase() + field.slice(1)}:</div>
                                            <div className="col-7">{formData[field] || "N/A"}</div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Profile;