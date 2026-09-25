import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import Features from "../pages/Features";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Protected Pages
import Dashboard from "../pages/Dashboard";
import Farms from "../pages/Farms";

import SoilAnalysis from "../pages/SoilAnalysis";
import SoilHistory from "../pages/SoilHistory";

import CropRecommendation from "../pages/CropRecommendation";
import CropPredictionHistory from "../pages/CropPredictionHistory";

import Fertilizer from "../pages/Fertilizer";
import Irrigation from "../pages/Irrigation";

import Weather from "../pages/Weather";
import WeatherForecast from "../pages/WeatherForecast";
import WeatherHistory from "../pages/WeatherHistory";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>

            {/* =====================================
                PUBLIC ROUTES
            ===================================== */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/features"
                element={<Features />}
            />

            <Route
                path="/about"
                element={<About />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* =====================================
                PROTECTED ROUTES
            ===================================== */}

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/farms"
                element={
                    <ProtectedRoute>
                        <Farms />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                SOIL
            ===================================== */}

            <Route
                path="/soil-analysis"
                element={
                    <ProtectedRoute>
                        <SoilAnalysis />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/soil-history"
                element={
                    <ProtectedRoute>
                        <SoilHistory />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                AI CROP RECOMMENDATION
            ===================================== */}

            <Route
                path="/crop-recommendation"
                element={
                    <ProtectedRoute>
                        <CropRecommendation />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/crop-history"
                element={
                    <ProtectedRoute>
                        <CropPredictionHistory />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                FERTILIZER
            ===================================== */}

            <Route
                path="/fertilizer"
                element={
                    <ProtectedRoute>
                        <Fertilizer />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                IRRIGATION
            ===================================== */}

            <Route
                path="/irrigation"
                element={
                    <ProtectedRoute>
                        <Irrigation />
                    </ProtectedRoute>
                }
            />


            {/* =====================================
                WEATHER
            ===================================== */}

            <Route
                path="/weather"
                element={
                    <ProtectedRoute>
                        <Weather />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/weather-forecast"
                element={
                    <ProtectedRoute>
                        <WeatherForecast />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/weather-history"
                element={
                    <ProtectedRoute>
                        <WeatherHistory />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default AppRoutes;