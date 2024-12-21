import { useState } from "react"; // Importing useState for managing form state
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for routing after successful registration
import axios from "axios"; // Importing axios for API requests

const Register = () => {
  // State to hold user input values for username, email, and password
  const [values, setValues] = useState({ username: "", email: "", password: "" });

  // State to handle loading state during registration process
  const [isLoading, setIsLoading] = useState(false);

  // State for storing error message if registration fails
  const [errorMessage, setErrorMessage] = useState("");

  // useNavigate hook for navigating to the login page after successful registration
  const navigate = useNavigate();

  // Function to handle changes in form input fields
  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Function to handle form submission (registration attempt)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setIsLoading(true); // Set loading state to true during registration
    try {
      // Sending registration request to backend with the user's input values
      const response = await axios.post("http://localhost:5000/auth/register", values);
      
      // If registration is successful, navigate to the login page
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      // Set error message if registration fails
      setErrorMessage(err.response?.data || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state after the request completes
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      {/* Main registration card */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

        {/* Registration form */}
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChanges} // Call handleChanges on input change
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
              required
            />
          </div>

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
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800 transition duration-200"
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* Display error message if registration fails */}
          {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
        </form>

        {/* Link to navigate to login page if user already has an account */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account? 
            <a href="/login" className="text-blue-500 hover:underline font-medium">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
