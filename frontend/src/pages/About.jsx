import {
    BrainCircuit,
    Database,
    Leaf,
    Target,
    Users,
    Workflow,
} from "lucide-react";

import { Link } from "react-router-dom";


function About() {

    const objectives = [
        "Provide a centralized platform for managing farm information.",
        "Record and organize important soil parameters.",
        "Use machine learning to generate crop recommendations.",
        "Provide fertilizer and irrigation decision-support information.",
        "Integrate weather information for agricultural planning.",
        "Maintain historical records for future analysis.",
    ];


    const architecture = [
        {
            icon: Leaf,
            title: "React Frontend",
            description:
                "Provides the user interface for farmers and communicates with backend APIs.",
        },
        {
            icon: Database,
            title: "Node.js Backend",
            description:
                "Handles authentication, business logic, REST APIs and database communication.",
        },
        {
            icon: BrainCircuit,
            title: "Python AI Service",
            description:
                "Runs the machine-learning model through a FastAPI-based prediction service.",
        },
        {
            icon: Workflow,
            title: "MongoDB Database",
            description:
                "Stores users, farms, soil records, predictions and weather observations.",
        },
    ];


    return (

        <div className="min-h-screen bg-white">


            {/* ==========================================
                HERO
            ========================================== */}

            <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-20">

                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-white">

                        <Leaf
                            size={28}
                        />

                    </div>


                    <p className="mt-6 font-semibold text-green-700">
                        ABOUT THE PROJECT
                    </p>


                    <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        AI Smart Agriculture Assistant
                    </h1>


                    <p className="mt-6 text-lg leading-8 text-gray-600">

                        An AI/ML-based smart decision-support
                        system designed to bring farm,
                        soil, crop and weather information
                        together in one platform.

                    </p>

                </div>

            </section>


            {/* ==========================================
                PROJECT INTRODUCTION
            ========================================== */}

            <section className="py-20">

                <div className="mx-auto max-w-6xl px-4 sm:px-6">

                    <div className="grid gap-12 lg:grid-cols-2">


                        <div>

                            <p className="font-semibold text-green-700">
                                PROJECT OVERVIEW
                            </p>


                            <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                What is this system?
                            </h2>


                            <p className="mt-5 leading-8 text-gray-600">

                                AI Smart Agriculture Assistant
                                is a web-based agricultural
                                decision-support system developed
                                to demonstrate how modern web
                                technologies and machine learning
                                can be applied to agriculture.

                            </p>


                            <p className="mt-4 leading-8 text-gray-600">

                                The system allows users to manage
                                farms, record soil parameters,
                                generate machine-learning based
                                crop recommendations, access
                                fertilizer and irrigation guidance,
                                and view weather information.

                            </p>


                            <p className="mt-4 leading-8 text-gray-600">

                                The system is designed as a
                                decision-support platform. Its
                                outputs should be interpreted
                                together with local agricultural
                                knowledge and field conditions.

                            </p>

                        </div>


                        {/* PROJECT CARD */}

                        <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">

                            <h3 className="text-xl font-bold text-gray-900">
                                Project Information
                            </h3>


                            <div className="mt-6 space-y-5">

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Project Title
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        AI Smart Agriculture Assistant
                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500">
                                        Project Type
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        AI/ML-Based Web Application
                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500">
                                        Primary Domain
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        Smart Agriculture
                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500">
                                        AI Component
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        Crop Recommendation using Machine Learning
                                    </p>

                                </div>


                                <div>

                                    <p className="text-sm text-gray-500">
                                        Database
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-900">
                                        MongoDB
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                PROBLEM
            ========================================== */}

            <section className="bg-gray-50 py-20">

                <div className="mx-auto max-w-6xl px-4 sm:px-6">

                    <div className="mx-auto max-w-3xl text-center">

                        <p className="font-semibold text-green-700">
                            PROBLEM & SOLUTION
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                            Why was this project developed?
                        </h2>

                        <p className="mt-5 leading-8 text-gray-600">

                            Agricultural decisions can involve
                            multiple types of information,
                            including soil characteristics,
                            environmental conditions, farm
                            details and weather.

                        </p>

                    </div>


                    <div className="mt-12 grid gap-6 md:grid-cols-2">


                        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">

                                <Target
                                    size={24}
                                />

                            </div>


                            <h3 className="mt-5 text-xl font-bold text-gray-900">
                                Problem
                            </h3>


                            <p className="mt-3 leading-7 text-gray-600">

                                Farm information and agricultural
                                observations may be distributed
                                across different sources. This
                                can make it difficult to organize
                                information and use it consistently
                                for decision-making.

                            </p>

                        </div>


                        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                <BrainCircuit
                                    size={24}
                                />

                            </div>


                            <h3 className="mt-5 text-xl font-bold text-gray-900">
                                Proposed Solution
                            </h3>


                            <p className="mt-3 leading-7 text-gray-600">

                                The proposed system provides a
                                centralized web platform that
                                combines farm management, soil
                                records, machine-learning crop
                                recommendation and weather
                                information.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                OBJECTIVES
            ========================================== */}

            <section className="py-20">

                <div className="mx-auto max-w-6xl px-4 sm:px-6">

                    <div className="grid items-start gap-12 lg:grid-cols-2">


                        <div>

                            <p className="font-semibold text-green-700">
                                OBJECTIVES
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-gray-900">
                                What the project aims to achieve
                            </h2>

                            <p className="mt-5 leading-7 text-gray-600">

                                The project demonstrates the
                                practical application of web
                                development, databases, APIs
                                and machine learning in an
                                agricultural context.

                            </p>

                        </div>


                        <div className="space-y-4">

                            {objectives.map(
                                (objective) => (

                                    <div
                                        key={
                                            objective
                                        }
                                        className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                    >

                                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">

                                            ✓

                                        </div>

                                        <p className="leading-6 text-gray-700">
                                            {
                                                objective
                                            }
                                        </p>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                ARCHITECTURE
            ========================================== */}

            <section className="bg-gray-50 py-20">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <p className="font-semibold text-green-700">
                            SYSTEM ARCHITECTURE
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                            How the major components work together
                        </h2>

                    </div>


                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                        {architecture.map(
                            (item) => {

                                const Icon =
                                    item.icon;

                                return (

                                    <div
                                        key={
                                            item.title
                                        }
                                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                                    >

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                            <Icon
                                                size={24}
                                            />

                                        </div>


                                        <h3 className="mt-5 text-lg font-bold text-gray-900">
                                            {
                                                item.title
                                            }
                                        </h3>


                                        <p className="mt-3 text-sm leading-6 text-gray-600">
                                            {
                                                item.description
                                            }
                                        </p>

                                    </div>

                                );
                            }
                        )}

                    </div>


                    {/* ARCHITECTURE FLOW */}

                    <div className="mx-auto mt-12 max-w-5xl overflow-x-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="flex min-w-[700px] items-center justify-center gap-3 text-center">


                            <div className="rounded-xl bg-green-50 px-5 py-4">

                                <p className="font-bold text-gray-900">
                                    React
                                </p>

                                <p className="text-xs text-gray-500">
                                    Frontend
                                </p>

                            </div>


                            <span className="text-2xl text-gray-400">
                                →
                            </span>


                            <div className="rounded-xl bg-blue-50 px-5 py-4">

                                <p className="font-bold text-gray-900">
                                    Node.js
                                </p>

                                <p className="text-xs text-gray-500">
                                    Backend
                                </p>

                            </div>


                            <span className="text-2xl text-gray-400">
                                →
                            </span>


                            <div className="rounded-xl bg-purple-50 px-5 py-4">

                                <p className="font-bold text-gray-900">
                                    FastAPI
                                </p>

                                <p className="text-xs text-gray-500">
                                    AI Service
                                </p>

                            </div>


                            <span className="text-2xl text-gray-400">
                                →
                            </span>


                            <div className="rounded-xl bg-amber-50 px-5 py-4">

                                <p className="font-bold text-gray-900">
                                    ML Model
                                </p>

                                <p className="text-xs text-gray-500">
                                    Prediction
                                </p>

                            </div>


                            <span className="text-2xl text-gray-400">
                                →
                            </span>


                            <div className="rounded-xl bg-gray-100 px-5 py-4">

                                <p className="font-bold text-gray-900">
                                    MongoDB
                                </p>

                                <p className="text-xs text-gray-500">
                                    Storage
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                FUTURE SCOPE
            ========================================== */}

            <section className="py-20">

                <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">

                    <p className="font-semibold text-green-700">
                        FUTURE SCOPE
                    </p>


                    <h2 className="mt-3 text-3xl font-bold text-gray-900">
                        Planned future enhancements
                    </h2>


                    <p className="mt-5 leading-7 text-gray-600">

                        The current system provides the core
                        decision-support functionality.
                        Additional capabilities can be integrated
                        in future versions.

                    </p>


                    <div className="mt-8 flex flex-wrap justify-center gap-3">

                        {[
                            "Disease Detection",
                            "IoT Sensors",
                            "Regional Languages",
                            "Voice Assistant",
                            "Mobile Application",
                            "Satellite Data",
                            "Advanced ML Models",
                        ].map(
                            (item) => (

                                <span
                                    key={
                                        item
                                    }
                                    className="rounded-full border border-green-200 bg-green-50 px-5 py-2.5 text-sm font-medium text-green-800"
                                >
                                    {
                                        item
                                    }
                                </span>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==========================================
                CTA
            ========================================== */}

            <section className="bg-green-800 py-16">

                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

                    <Users
                        size={35}
                        className="mx-auto text-green-200"
                    />


                    <h2 className="mt-4 text-3xl font-bold text-white">
                        Explore the platform
                    </h2>


                    <p className="mt-3 text-green-100">
                        Start using the agriculture decision-support system.
                    </p>


                    <Link
                        to="/register"
                        className="mt-7 inline-block rounded-xl bg-white px-6 py-3.5 font-semibold text-green-800 hover:bg-gray-100"
                    >
                        Get Started
                    </Link>

                </div>

            </section>

        </div>
    );
}


export default About;