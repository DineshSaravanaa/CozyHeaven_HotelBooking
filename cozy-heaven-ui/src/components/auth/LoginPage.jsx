import { useState } from "react";
import axios from "axios";

function LoginPage() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [msgUsername, setMsgUsername] = useState(null);
    const [msgPassword, setMsgPassword] = useState(null);
    const navigate = useNavigate();

    const login = () => {
        let isCorrect = false;

        if (username === null || username === "" || username === undefined) {
            setMsgUsername("Username cannot be blank")
            return
        }
        else {
            setMsgUsername(null)
        }

        if (password == null || password === "" || password === undefined) {
            setMsgPassword("Password cannot be blank")
            return
        }
        else {
            setMsgPassword(null)
        }

        let body = {
            'username': username,
            'password': password
        }

        axios.post('http://localhost:8080/api/auth/token/generate', body)
            .then(response => {
                //console.log(response)
                let token = response.data.token
                //save the token in localstorage memory of web browser 
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)

                //console.log(token)
                axios.get('http://localhost:8080/api/auth/user/details',
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`  //token goes here but not getting detected in backend
                        }
                    }
                )
                    .then(resp => {
                        //console.log(resp)
                        switch (resp.data.role) {
                            case 'CUSTOMER':
                                //navigate to customer dashboard
                                navigate("/customer")
                                break;
                            case 'HOTEL OWNER':
                                //navigate to hotel owner dashboard
                                navigate("/hotelowner")
                                break;
                            case 'ADMIN':
                                //navigate to admin dashboard
                                navigate("/admin")
                                break;
                            case 'DSS':
                                //navigate to dss dashboard
                                navigate("/dss")
                                break;
                            default:
                                break;
                        }
                    })
                    .catch(err => {
                        setMsgUsername("Invalid Credentials")
                        console.log(err)
                    })
            })
            .catch(err => {
                setMsgUsername("Invalid Credentials")
                console.log(err)
            })

    }

    return (
        <div>
            <div className="container-fluid">

                <div className="row mb-4">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-light bg-light">
                            <div className="container-fluid">
                                <span className="navbar-brand mb-0 h1">Navbar</span>
                            </div>
                        </nav>
                    </div>
                </div>
                <br /><br /><br />
                <div className="row mt-4">
                    <div className="col-sm-4">

                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-header">
                                Login
                            </div>
                            <div className="card-body">
                                {
                                    msgUsername === null ? "" : <div className="mb-4">
                                        {msgUsername}
                                    </div>
                                }
                                {
                                    msgPassword === null ? "" : <div className="mb-4">
                                        {msgPassword}
                                    </div>
                                }
                                <div className="mb-4">
                                    <label>Username: </label>
                                    <input type="text" className="form-control"
                                        onChange={$event => {
                                            setUsername($event.target.value);
                                            setMsgUsername(null)
                                        }} />
                                </div>
                                <div className="mb-4">
                                    <label>Password: </label>
                                    <input type="password" className="form-control"
                                        onChange={($event) => {
                                            setPassword($event.target.value);
                                            setMsgPassword(null)
                                        }} />
                                </div>
                                <div className="mb-4">
                                    <button type="button" className="btn btn-primary"
                                        onClick={() => login()}>Login</button>
                                </div>
                            </div>
                            <div className="card-footer">
                                Don't have an Account? <br />
                                <Link to="/customer/signup"> Sign Up as Customer </Link> <br />
                                Sign Up as Seller <br />
                                Reset Password
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">

                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoginPage;