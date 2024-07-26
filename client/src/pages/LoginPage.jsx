import React, { useState } from "react";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const loggedIn = await response.json();

        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );

        // Show success alert
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Navigate after the alert is closed
          navigate("/dashboard");
        });
      } else {
        // Show error alert for invalid input
        Swal.fire({
          title: "Invalid Input",
          text: "Email or password is incorrect.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      console.log("Login failed", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            LOG IN
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/register" className="text-blue-500 hover:underline">
            Don't have an account? Sign Up Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
