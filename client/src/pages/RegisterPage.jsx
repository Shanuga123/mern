import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true)

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        navigate("/")
      }
    } catch (err) {
      alert("Registration failed", err.message)
    }
  }

 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!passwordMatch && (
            <p className="text-red-500 text-center">Passwords do not match!</p>
          )}

          <div className="flex items-center justify-center">
            <input
              id="image"
              type="file"
              name="profileImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleChange}
              required
            />
            <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
              <img src="/assets/addImage.png" alt="add profile" className="w-14 h-14 mb-2" />
              <p className="text-blue-500">Upload Your Photo</p>
            </label>
          </div>

          {formData.profileImage && (
            <div className="flex justify-center mt-4">
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="profile photo"
                className="max-w-[80px] rounded-full border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!passwordMatch}
            className={`w-full py-2 px-4 rounded-md text-white ${
              passwordMatch ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            REGISTER
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/" className="text-blue-500 hover:underline">Already have an account? Log In Here</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
