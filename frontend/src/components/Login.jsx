import { useState } from "react"; // Importing useState for managing form state
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for routing after successful login
import axios from "axios"; // Importing axios for API requests

const Login = () => {
  // State to hold user input values for email and password
  const [values, setValues] = useState({ email: "", password: "" });

  // State for error message in case of failed login attempt
  const [errorMessage, setErrorMessage] = useState(null);

  // useNavigate hook for navigating after successful login
  const navigate = useNavigate();

  // Function to handle changes in form input fields
  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Function to handle form submission (login attempt)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Check if both email and password are provided
    if (!values.email || !values.password) {
      setErrorMessage("Both email and password are required.");
      return;
    }

    try {
      // Sending login request to backend with the user's email and password
      const response = await axios.post("http://localhost:5000/auth/login", values);
      
      // If login is successful, store token in localStorage and navigate to weather page
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/weather');
      }
    } catch (err) {
      // Set error message if the login attempt fails
      setErrorMessage(err.response?.data?.message || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Main login card */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {/* Display error message if any */}
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChanges} // Call handleChanges on input change
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password input field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChanges} // Call handleChanges on input change
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button for form */}
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800 transition duration-200">
            Submit
          </button>
        </form>

        {/* Link to navigate to registration page if user doesn't have an account */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            <span>Don&apos;t have an account?</span>
            <a href="/register" className="text-blue-500 hover:underline font-medium">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

