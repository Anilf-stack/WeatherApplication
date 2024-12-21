import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import WeatherApp from './Page/WeatherApp';
import Report from './Page/Report';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem("token")); // Initialize from localStorage

    const isAuthenticated = !!token;

    return (
        <Router>
            <div className="text-center bg-gray-100 min-h-screen py-8">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login setToken={setToken} />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route
                        path="/weather"
                        element={isAuthenticated ? <WeatherApp token={token} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/report"
                        element={isAuthenticated ? <Report token={token} /> : <Navigate to="/" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
