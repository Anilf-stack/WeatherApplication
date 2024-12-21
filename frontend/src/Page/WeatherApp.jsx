import { useState } from "react"; // Import useState for managing form and weather state
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { motion } from "framer-motion"; // Import motion for animation
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon

const WeatherApp = () => {
  // State initialization
  const [city, setCity] = useState(""); // Holds the city input
  const [weatherData, setWeatherData] = useState(null); // Holds the weather data
  const [error, setError] = useState(""); // Holds error messages
  const [backgroundClass, setBackgroundClass] = useState("bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"); // Default background class
  const navigate = useNavigate(); // Initialize navigation hook

  // Handles search action to fetch weather data based on city input
  const handleSearch = async () => {
    try {
      setError(""); // Reset any previous error

      // Retrieve token from localStorage for authentication
      const token = localStorage.getItem("token");

      // Make GET request to fetch weather data based on city name
      const response = await axios.get(`http://localhost:5000/weather/${city}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update state with fetched weather data
      setWeatherData(response.data);

      // Adjust background color based on temperature
      const temperature = response.data.current.temperature;
      setBackgroundClass(getBackground(temperature)); // Call function to set the background
    } catch (err) {
      // Set error message in case of failure
      setError(err.response?.data?.message || "Failed to fetch weather data");
    }
  };

  // Function to determine background class based on temperature
  const getBackground = (temperature) => {
    if (temperature < 10) {
      return "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-900"; // Cold weather gradient
    } else if (temperature >= 10 && temperature <= 25) {
      return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500"; // Moderate weather gradient
    } else {
      return "bg-gradient-to-r from-red-500 via-red-600 to-red-900"; // Hot weather gradient
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={`min-h-screen ${backgroundClass} bg-fixed pt-20 transition-all ease-in-out duration-500`}>
      {/* Heading for weather search */}
      <h1 className="text-3xl text-white font-bold mb-6 text-center animate__animated animate__fadeIn">
        Weather Search
      </h1>
      
      {/* Input and Search Button */}
      <div className="flex gap-4 mb-6 justify-center flex-col sm:flex-row">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state
          className="border rounded p-2 w-64 sm:w-96"
        />
        <button
          onClick={handleSearch} // Trigger handleSearch on click
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 sm:mt-0"
        >
          Search
        </button>
      </div>

      {/* Display error message if any */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display weather data if available */}
      {weatherData && (
        <motion.div
          className="mt-6 p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto transition-transform transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-center">{`Weather in ${city}`}</h2>
          <p className="text-center text-3xl font-bold">
            {weatherData.current.temperature}°C
          </p>
          <p className="text-center text-xl">{weatherData.current.weather_descriptions[0]}</p>

          {/* Weather Icon */}
          {weatherData.current.weather_icons.length > 0 && (
            <motion.img
              src={weatherData.current.weather_icons[0]}
              alt="Weather Icon"
              className="w-32 h-32 mx-auto mt-4 animate__animated animate__zoomIn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Additional weather info */}
          <div className="text-center mt-4">
            <p>Wind Speed: {weatherData.current.wind_speed} km/h</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>
        </motion.div>
      )}

      {/* Navigation Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/report")} // Navigate to Weather Report page
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          View Weather Reports
        </button>
      </div>

      {/* Logout Button */}
      <div className="absolute top-10 right-5">
        <button
          onClick={handleLogout} // Trigger logout functionality
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 border-2 border-white"
        >
          <FaSignOutAlt className="mr-2 inline" /> Logout
        </button>
      </div>
    </div>
  );
};

export default WeatherApp;
