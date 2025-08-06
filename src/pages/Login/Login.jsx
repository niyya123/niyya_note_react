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
      <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
          <div class="col-auto">
            <div class="login-container">
              <h2 class="text-center text-primary">Login</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}

              <form onSubmit={handleSubmit} class="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  class="mb-2"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  class="mb-4"
                />

                <div class="text-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    class="login-button"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </button>
                </div>
                <h5 class="text-center mt-2">Register <a href="/register">here</a> if you don't have an account</h5>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
