import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.less";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, username, password });
    try {
      // Make API call to register user
      setIsLoading(true);
      const response = await axios.post(
        "https://niyya-notes-api.onrender.com/api/register",
        {
          email,
          username,
          password,
        }
      );
      if (response.data.token) {
        setIsLoading(false);
        // Show success toast
        toast.success("Registration successful! Please log in.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      console.log("Registration data:", response.data);
    } catch (error) {
      setIsLoading(false);
      toast.error("Registration failed. Please try again.");
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-auto">
            <div className="login-container">
              <h2 className="text-center text-primary">Register</h2>

              <form onSubmit={handleSubmit} className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="mb-2"
                />
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
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
                    className="register-button"
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                </div>
                <h5 className="text-center mt-2">
                  Already have an account?{" "}
                  <a
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </a>{" "}
                  here
                </h5>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
