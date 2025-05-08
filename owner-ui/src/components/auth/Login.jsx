import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailMsg, setEmailMsg] = useState(null);
  const [passwordMsg, setPasswordMsg] = useState(null);

  const navigate = useNavigate();

  const login = () => {
    {/* Checking Email And Password Are Given Or Not */ }
    if (!email) {
      setEmailMsg("Email cannot be blank");
      return;
    } else {
      setEmailMsg(null);
    }

    if (!password) {
      setPasswordMsg("Password cannot be blank");
      return;
    } else {
      setPasswordMsg(null);
    }

    {/* Calling Token Generation API And Store Token And Username In LocalStorage */ }

    axios.post("http://localhost:8083/api/auth/token/generate", {
      username: email,
      password: password,
    })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem('username', response.data.username)


        {/* Calling UserDetails API With Token It Gives Role , According To The Role Navigate The Dashboard */ }

        axios.get("http://localhost:8083/api/auth/user/details", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            if (response.data.role === "HotelOwner") {
              navigate("/owner-dashboard");
            }
          });
      })
      .catch(() => {
        setEmailMsg("Invalid credentials");
      });
  };

  return (
    <>
      <nav>
        <div className="logo">Cozy Heaven</div>
        <ul>
          <li><Link to="/signup" className="link">Create an Account</Link>  </li>
        </ul>
      </nav>

      <section className="login-section">
        <div className="container">
          <div className="form-container">
            <div className="form-header">
              <h2>Owner Login</h2>
              <p>Access your hotel management dashboard</p>
            </div>

            <form id="login-form">
              {emailMsg && <div className="error-message">{emailMsg}</div>}
              {passwordMsg && <div className="error-message">{passwordMsg}</div>}

              <div className="form-group">
                <label htmlFor="email" className="form-required">Email or Username</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email or username"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailMsg(null);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-required">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordMsg(null);
                  }}
                />
              </div>

              <div className="form-actions form-actions-center">
                <button type="button" className="btn btn-primary" onClick={login}>
                  <i className="fas fa-sign-in-alt"></i> Login
                </button>
              </div>

              <div className="form-links text-center">
                <Link to="/signup" className="link">Forgot Password?</Link>|
                <Link to="/signup" className="link">Create an Account</Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <p>© 2025 Cozy Heaven Stay. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default Login;
