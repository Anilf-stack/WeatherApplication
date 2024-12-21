import { useEffect, useState } from "react"; // Import hooks for managing state and side effects
import axios from "axios"; // Import axios for making API requests
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { FaArrowLeft } from "react-icons/fa"; // Import back arrow icon

const WeatherReport = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/report", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch reports");
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/weather")}
          className="text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Weather Search
        </button>
        <h1 className="text-3xl text-white font-bold text-center flex justify-center items-center animate__animated animate__fadeIn">
          Weather Reports
        </h1>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => {
          const weatherInfo = JSON.parse(report.weather_info);
          const temperature = weatherInfo.current.temperature;
          const condition = weatherInfo.current.weather_descriptions[0];
          const weatherIconUrl = weatherInfo.current.weather_icons[0];

          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="font-semibold text-xl mb-2">{report.username}</h2>
              <p className="text-lg">City: {report.city}</p>
              <div className="flex items-center space-x-4 mt-4">
                <img
                  src={weatherIconUrl}
                  alt={condition}
                  className="w-16 h-16 rounded-full animate__animated animate__zoomIn"
                />
                <div className="text-center">
                  <p className="text-3xl font-bold">{temperature}°C</p>
                  <p className="text-lg">{condition}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Date: {new Date(report.created_at).toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherReport;
