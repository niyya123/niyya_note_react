import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../redux/features/auth/authSlice";
import axios from "axios";
import "./Login.less"; // Assuming you have some styles for the login form
import { useNavigate  } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirect to home if token exists
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  // Get state from Redux
  const { isLoading, error } = useSelector((state) => state.auth);

  // Get dispatch function to send actions
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch "loginStart" action
    dispatch(loginStart());

    try {
      // API call to backend
      const response = await axios.post(
        "https://niyya-notes-api.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      // Dispatch "loginSuccess" with user data
      dispatch(loginSuccess(response.data));

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to home (using react-router)
      navigate("/home");
    } catch (err) {
      // Dispatch "loginFailure" with error message
      dispatch(loginFailure(err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-auto">
            <div className="login-container">
              <h2 className="text-center text-primary">Login</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}

              <form onSubmit={handleSubmit} className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="mb-2"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="mb-4"
                />

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="login-button"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
                <h5 className="text-center mt-2">Register <a className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate('/register')}>here</a> if you don't have an account</h5>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
