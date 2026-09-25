import {
    ArrowRight,
    CheckCircle2,
    CloudSun,
    Droplets,
    Leaf,
    LineChart,
    Sprout,
    FlaskConical,
    ShieldCheck,
    BrainCircuit,
} from "lucide-react";

import { Link } from "react-router-dom";


function Home() {

    const features = [
        {
            icon: BrainCircuit,
            title: "AI Crop Recommendation",
            description:
                "Analyze soil and environmental parameters using a machine-learning model to generate crop recommendations.",
        },
        {
            icon: FlaskConical,
            title: "Soil Analysis",
            description:
                "Store and analyze important soil parameters including N, P, K, pH, moisture, temperature and humidity.",
        },
        {
            icon: Leaf,
            title: "Fertilizer Guidance",
            description:
                "Get soil-based nutrient guidance to support better agricultural decision-making.",
        },
        {
            icon: Droplets,
            title: "Irrigation Assistant",
            description:
                "Use soil moisture and environmental conditions to provide irrigation decision-support.",
        },
        {
            icon: CloudSun,
            title: "Weather Information",
            description:
                "View current weather, forecast information and previously recorded weather observations.",
        },
        {
            icon: LineChart,
            title: "History & Analytics",
            description:
                "Maintain prediction, soil and weather history for future analysis and decision-making.",
        },
    ];


    const benefits = [
        "Centralized farm management",
        "Machine-learning based crop recommendation",
        "Soil parameter tracking",
        "Weather information and forecast",
        "Agricultural decision-support tools",
        "Historical records and visualization",
    ];


    return (

        <div className="min-h-screen bg-white">


            {/* ==========================================
                HERO
            ========================================== */}

            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-amber-50">

                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">

                    <div className="grid items-center gap-14 lg:grid-cols-2">


                        {/* LEFT */}

                        <div>

                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">

                                <Leaf
                                    size={17}
                                />

                                Smart Technology for Modern Agriculture

                            </div>


                            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">

                                Smarter Decisions.
                                <span className="block text-green-700">
                                    Better Farming.
                                </span>

                            </h1>


                            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">

                                AI Smart Agriculture Assistant
                                is a web-based agricultural
                                decision-support system that
                                combines machine learning,
                                soil analysis, weather
                                information and farm management
                                tools in one platform.

                            </p>


                            {/* BUTTONS */}

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-green-800"
                                >

                                    Get Started

                                    <ArrowRight
                                        size={19}
                                    />

                                </Link>


                                <Link
                                    to="/features"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-700"
                                >
                                    Explore Features
                                </Link>

                            </div>


                            {/* TRUST */}

                            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">

                                <div className="flex items-center gap-2">

                                    <CheckCircle2
                                        size={17}
                                        className="text-green-600"
                                    />

                                    AI-assisted decisions

                                </div>


                                <div className="flex items-center gap-2">

                                    <CheckCircle2
                                        size={17}
                                        className="text-green-600"
                                    />

                                    Farm management

                                </div>


                                <div className="flex items-center gap-2">

                                    <CheckCircle2
                                        size={17}
                                        className="text-green-600"
                                    />

                                    Weather insights

                                </div>

                            </div>

                        </div>


                        {/* RIGHT VISUAL */}

                        <div className="relative">

                            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-green-200/50 blur-3xl" />

                            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-amber-200/50 blur-3xl" />


                            <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl">

                                {/* Dashboard heading */}

                                <div className="mb-6 flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-gray-500">
                                            Agriculture Dashboard
                                        </p>

                                        <h2 className="text-xl font-bold text-gray-900">
                                            Farm Overview
                                        </h2>

                                    </div>


                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                        <Sprout
                                            size={23}
                                        />

                                    </div>

                                </div>


                                {/* Stats */}

                                <div className="grid grid-cols-2 gap-4">

                                    <div className="rounded-2xl bg-green-50 p-4">

                                        <p className="text-sm text-gray-500">
                                            Soil pH
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-gray-900">
                                            6.5
                                        </p>

                                        <p className="mt-1 text-xs text-green-700">
                                            Near neutral
                                        </p>

                                    </div>


                                    <div className="rounded-2xl bg-blue-50 p-4">

                                        <p className="text-sm text-gray-500">
                                            Moisture
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-gray-900">
                                            45%
                                        </p>

                                        <p className="mt-1 text-xs text-blue-700">
                                            Moderate
                                        </p>

                                    </div>


                                    <div className="rounded-2xl bg-amber-50 p-4">

                                        <p className="text-sm text-gray-500">
                                            Temperature
                                        </p>

                                        <p className="mt-1 text-2xl font-bold text-gray-900">
                                            25°C
                                        </p>

                                        <p className="mt-1 text-xs text-amber-700">
                                            Current
                                        </p>

                                    </div>


                                    <div className="rounded-2xl bg-purple-50 p-4">

                                        <p className="text-sm text-gray-500">
                                            AI Prediction
                                        </p>

                                        <p className="mt-1 text-xl font-bold capitalize text-gray-900">
                                            Crop
                                        </p>

                                        <p className="mt-1 text-xs text-purple-700">
                                            ML based
                                        </p>

                                    </div>

                                </div>


                                {/* Prediction */}

                                <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5">

                                    <div className="flex items-center justify-between">

                                        <div>

                                            <p className="text-sm text-gray-500">
                                                AI Crop Recommendation
                                            </p>

                                            <p className="mt-1 text-lg font-bold text-gray-900">
                                                Machine Learning Prediction
                                            </p>

                                        </div>


                                        <BrainCircuit
                                            className="text-green-700"
                                            size={30}
                                        />

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                INTRODUCTION
            ========================================== */}

            <section className="bg-white py-20">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mx-auto max-w-3xl text-center">

                        <p className="font-semibold text-green-700">
                            WHY THIS PROJECT?
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Technology for informed agricultural decisions
                        </h2>

                        <p className="mt-5 leading-7 text-gray-600">

                            Farmers work with changing soil,
                            weather and crop conditions.
                            This project brings relevant
                            information together in one
                            easy-to-use platform to support
                            agricultural decision-making.

                        </p>

                    </div>

                </div>

            </section>


            {/* ==========================================
                FEATURES
            ========================================== */}

            <section className="bg-gray-50 py-20">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="mb-12 text-center">

                        <p className="font-semibold text-green-700">
                            CORE FEATURES
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Everything in one agriculture platform
                        </h2>

                    </div>


                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {features.map(
                            (feature) => {

                                const Icon =
                                    feature.icon;

                                return (

                                    <div
                                        key={
                                            feature.title
                                        }
                                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                                    >

                                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                            <Icon
                                                size={24}
                                            />

                                        </div>


                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {
                                                feature.title
                                            }
                                        </h3>


                                        <p className="mt-3 leading-7 text-gray-600">
                                            {
                                                feature.description
                                            }
                                        </p>

                                    </div>

                                );
                            }
                        )}

                    </div>

                </div>

            </section>


            {/* ==========================================
                BENEFITS
            ========================================== */}

            <section className="py-20">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">


                        <div>

                            <p className="font-semibold text-green-700">
                                PLATFORM BENEFITS
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                                A connected approach to farm decision support
                            </h2>

                            <p className="mt-5 leading-7 text-gray-600">

                                Instead of using separate tools
                                for farm records, soil analysis,
                                crop recommendation and weather
                                information, the platform
                                connects these functions in one
                                application.

                            </p>

                        </div>


                        <div className="grid gap-4 sm:grid-cols-2">

                            {benefits.map(
                                (benefit) => (

                                    <div
                                        key={
                                            benefit
                                        }
                                        className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                    >

                                        <CheckCircle2
                                            size={20}
                                            className="mt-0.5 shrink-0 text-green-600"
                                        />

                                        <span className="text-sm font-medium text-gray-700">
                                            {
                                                benefit
                                            }
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                CTA
            ========================================== */}

            <section className="bg-green-800 py-16">

                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Start exploring smarter agriculture
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-green-100">

                        Create a farm profile, record soil
                        information and explore AI-assisted
                        agricultural decision-support tools.

                    </p>


                    <div className="mt-7">

                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-green-800 transition hover:bg-gray-100"
                        >

                            Create Account

                            <ArrowRight
                                size={18}
                            />

                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}


export default Home;