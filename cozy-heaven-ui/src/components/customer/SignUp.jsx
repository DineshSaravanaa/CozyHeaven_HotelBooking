import { useEffect } from "react";
import "./sign.css";

function SignupPage() {
  return (
    <div>
      <div id="particles-js"></div>

      <div className="signup-container">
        <h2 className="signup-title">Create an Account</h2>
        <p>Join AgodaClone and start booking your dream stays.</p>

        {/* Signup Form */}
        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Full Name" />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Confirm Password" />
          </div>
          <a className="btn btn-signup w-100 text-white" href="login.html">Sign Up</a>
        </form>

        {/* Already have an account? */}
        <div className="mt-3">
          <small>
            Already have an account?{" "}
            <a href="login.html" className="fw-bold text-decoration-none">Login</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
