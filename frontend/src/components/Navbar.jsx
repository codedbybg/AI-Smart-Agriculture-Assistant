import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    Leaf,
    LayoutDashboard,
    Sprout,
    FlaskConical,
    CloudSun,
    LogOut,
    ChevronDown,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


function Navbar() {

    const [mobileOpen, setMobileOpen] =
        useState(false);

    const [toolsOpen, setToolsOpen] =
        useState(false);

    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();


    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {

        logout();

        setMobileOpen(false);

        navigate("/login");
    };


    // ==========================================
    // NAV LINK CLASS
    // ==========================================

    const navLinkClass = ({ isActive }) =>
        `transition ${
            isActive
                ? "font-semibold text-green-700"
                : "text-gray-700 hover:text-green-700"
        }`;


    // ==========================================
    // CLOSE MOBILE MENU
    // ==========================================

    const closeMobileMenu = () => {
        setMobileOpen(false);
        setToolsOpen(false);
    };


    return (

        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="flex h-16 items-center justify-between">


                    {/* ==========================================
                        LOGO
                    ========================================== */}

                    <Link
                        to={
                            user
                                ? "/dashboard"
                                : "/"
                        }
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2"
                    >

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">

                            <Leaf
                                size={23}
                                strokeWidth={2.2}
                            />

                        </div>


                        <div className="hidden sm:block">

                            <p className="text-sm font-bold leading-tight text-gray-900">
                                AI Smart Agriculture
                            </p>

                            <p className="text-xs text-gray-500">
                                Intelligent Farming Assistant
                            </p>

                        </div>

                    </Link>


                    {/* ==========================================
                        DESKTOP NAVIGATION
                    ========================================== */}

                    <nav className="hidden items-center gap-7 md:flex">


                        {!user ? (

                            <>

                                <NavLink
                                    to="/"
                                    className={navLinkClass}
                                >
                                    Home
                                </NavLink>


                                <NavLink
                                    to="/features"
                                    className={navLinkClass}
                                >
                                    Features
                                </NavLink>


                                <NavLink
                                    to="/about"
                                    className={navLinkClass}
                                >
                                    About
                                </NavLink>

                            </>

                        ) : (

                            <>

                                <NavLink
                                    to="/dashboard"
                                    className={navLinkClass}
                                >
                                    Dashboard
                                </NavLink>


                                <NavLink
                                    to="/farms"
                                    className={navLinkClass}
                                >
                                    My Farms
                                </NavLink>


                                {/* AI TOOLS */}

                                <div className="relative">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setToolsOpen(
                                                !toolsOpen
                                            )
                                        }
                                        className="flex items-center gap-1 text-gray-700 transition hover:text-green-700"
                                    >

                                        AI Tools

                                        <ChevronDown
                                            size={16}
                                        />

                                    </button>


                                    {toolsOpen && (

                                        <div className="absolute right-0 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">

                                            <NavLink
                                                to="/soil-analysis"
                                                onClick={() =>
                                                    setToolsOpen(false)
                                                }
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            >

                                                <FlaskConical
                                                    size={18}
                                                />

                                                Soil Analysis

                                            </NavLink>


                                            <NavLink
                                                to="/crop-recommendation"
                                                onClick={() =>
                                                    setToolsOpen(false)
                                                }
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            >

                                                <Sprout
                                                    size={18}
                                                />

                                                Crop Recommendation

                                            </NavLink>


                                            <NavLink
                                                to="/fertilizer"
                                                onClick={() =>
                                                    setToolsOpen(false)
                                                }
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            >

                                                <Leaf
                                                    size={18}
                                                />

                                                Fertilizer Guidance

                                            </NavLink>


                                            <NavLink
                                                to="/irrigation"
                                                onClick={() =>
                                                    setToolsOpen(false)
                                                }
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            >

                                                <CloudSun
                                                    size={18}
                                                />

                                                Irrigation Assistant

                                            </NavLink>


                                            <NavLink
                                                to="/weather"
                                                onClick={() =>
                                                    setToolsOpen(false)
                                                }
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            >

                                                <CloudSun
                                                    size={18}
                                                />

                                                Weather

                                            </NavLink>


                                            <NavLink
                                                to="/weather-forecast"
                                                onClick={() =>
                                                    setToolsOpen(false)
                                                }
                                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
                                            >

                                                <CloudSun
                                                    size={18}
                                                />

                                                Weather Forecast

                                            </NavLink>

                                        </div>
                                    )}

                                </div>

                            </>

                        )}

                    </nav>


                    {/* ==========================================
                        DESKTOP AUTH
                    ========================================== */}

                    <div className="hidden items-center gap-3 md:flex">

                        {!user ? (

                            <>

                                <Link
                                    to="/login"
                                    className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                                >
                                    Login
                                </Link>


                                <Link
                                    to="/register"
                                    className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white transition hover:bg-green-800"
                                >
                                    Get Started
                                </Link>

                            </>

                        ) : (

                            <>

                                <Link
                                    to="/dashboard"
                                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >

                                    <LayoutDashboard
                                        size={17}
                                    />

                                    Dashboard

                                </Link>


                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                                >

                                    <LogOut
                                        size={17}
                                    />

                                    Logout

                                </button>

                            </>

                        )}

                    </div>


                    {/* ==========================================
                        MOBILE MENU BUTTON
                    ========================================== */}

                    <button
                        type="button"
                        onClick={() =>
                            setMobileOpen(
                                !mobileOpen
                            )
                        }
                        className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                    >

                        {mobileOpen ? (
                            <X size={25} />
                        ) : (
                            <Menu size={25} />
                        )}

                    </button>

                </div>


                {/* ==========================================
                    MOBILE MENU
                ========================================== */}

                {mobileOpen && (

                    <div className="border-t border-gray-100 py-4 md:hidden">

                        <nav className="flex flex-col gap-1">


                            {!user ? (

                                <>

                                    <NavLink
                                        to="/"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Home
                                    </NavLink>


                                    <NavLink
                                        to="/features"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Features
                                    </NavLink>


                                    <NavLink
                                        to="/about"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        About
                                    </NavLink>


                                    <div className="mt-2 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">

                                        <Link
                                            to="/login"
                                            onClick={
                                                closeMobileMenu
                                            }
                                            className="rounded-lg border border-gray-200 px-4 py-2.5 text-center font-medium text-gray-700"
                                        >
                                            Login
                                        </Link>


                                        <Link
                                            to="/register"
                                            onClick={
                                                closeMobileMenu
                                            }
                                            className="rounded-lg bg-green-700 px-4 py-2.5 text-center font-medium text-white"
                                        >
                                            Get Started
                                        </Link>

                                    </div>

                                </>

                            ) : (

                                <>

                                    <NavLink
                                        to="/dashboard"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >

                                        <LayoutDashboard
                                            size={19}
                                        />

                                        Dashboard

                                    </NavLink>


                                    <NavLink
                                        to="/farms"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >

                                        <Sprout
                                            size={19}
                                        />

                                        My Farms

                                    </NavLink>


                                    <p className="mt-3 px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                        AI Tools
                                    </p>


                                    <NavLink
                                        to="/soil-analysis"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Soil Analysis
                                    </NavLink>


                                    <NavLink
                                        to="/crop-recommendation"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Crop Recommendation
                                    </NavLink>


                                    <NavLink
                                        to="/fertilizer"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Fertilizer Guidance
                                    </NavLink>


                                    <NavLink
                                        to="/irrigation"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Irrigation Assistant
                                    </NavLink>


                                    <NavLink
                                        to="/weather"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Current Weather
                                    </NavLink>


                                    <NavLink
                                        to="/weather-forecast"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Weather Forecast
                                    </NavLink>


                                    <NavLink
                                        to="/soil-history"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Soil History
                                    </NavLink>


                                    <NavLink
                                        to="/crop-history"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Crop History
                                    </NavLink>


                                    <NavLink
                                        to="/weather-history"
                                        onClick={
                                            closeMobileMenu
                                        }
                                        className="rounded-lg px-3 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700"
                                    >
                                        Weather History
                                    </NavLink>


                                    <button
                                        type="button"
                                        onClick={
                                            handleLogout
                                        }
                                        className="mt-3 flex items-center gap-3 rounded-lg border-t border-gray-100 px-3 py-4 text-left font-medium text-red-600"
                                    >

                                        <LogOut
                                            size={19}
                                        />

                                        Logout

                                    </button>

                                </>

                            )}

                        </nav>

                    </div>

                )}

            </div>

        </header>
    );
}


export default Navbar;