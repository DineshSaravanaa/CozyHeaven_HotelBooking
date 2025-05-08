import axios from "axios";
import { useState } from "react"
import '../auth/login.css'; 
import { useNavigate } from "react-router"; 
function CustomerSignUp() {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [contact, setContact] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();

    const signUp = async ($e) => {
        $e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/customer/add',
                {
                    "name": name,
                    "email": email, 
                    "address": address,    
                    "contact": contact,
                    "user": {
                        "username": username, 
                        "password": password
                    }
                }
            )

            console.log('sign Up success....')
            navigate('/customer');
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="signup-page-wrapper">
            <div className="container-fluid">

                <div className="row mb-4">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-light bg-light">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">COZY HEAVEN</span>
                            </div>

                        </nav>
                    </div>
                    
                    <div className="col-sm-3">

                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                Customer SignUp
                            </div>
                            <div className="card-body">
                                <form className="row g-3" onSubmit={($e) => signUp($e)}>
                                    <div className="col-md-6">
                                        <label for="inputEmail4" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="inputEmail4"
                                            onChange={($event) => { setName($event.target.value) }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control"
                                            onChange={($event) => { setEmail($event.target.value) }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Address</label>
                                        <input type="text" className="form-control"
                                            onChange={($event) => { setAddress($event.target.value) }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label for="inputPassword4" className="form-label">Contact</label>
                                        <input type="number" className="form-control" id="inputPassword4"
                                            onChange={($event) => { setContact($event.target.value) }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label for="inputEmail4" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="inputEmail4"
                                            onChange={($event) => { setUsername($event.target.value) }} />
                                    </div>

                                    <div className="col-md-6">
                                        <label for="inputPassword4" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="inputPassword4"
                                            onChange={($event) => { setPassword($event.target.value) }} />
                                    </div>


                                    <div className="col-12">

                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Sign Up</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-3">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerSignUp