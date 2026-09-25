import {
    BrainCircuit,
    CloudSun,
    Database,
    Droplets,
    FlaskConical,
    History,
    Leaf,
    LineChart,
    ShieldCheck,
    Sprout,
} from "lucide-react";

import { Link } from "react-router-dom";


function Features() {

    const features = [
        {
            icon: Sprout,
            title: "Farm Management",
            description:
                "Create and manage multiple farm profiles with area, location, soil type, irrigation source and crop information.",
        },
        {
            icon: FlaskConical,
            title: "Soil Analysis",
            description:
                "Record nitrogen, phosphorus, potassium, pH, moisture, temperature and humidity values for individual farms.",
        },
        {
            icon: BrainCircuit,
            title: "AI Crop Recommendation",
            description:
                "A Random Forest machine-learning model analyzes soil and environmental parameters to generate crop recommendations.",
        },
        {
            icon: Leaf,
            title: "Fertilizer Guidance",
            description:
                "Use available soil nutrient information to generate structured fertilizer decision-support guidance.",
        },
        {
            icon: Droplets,
            title: "Irrigation Assistant",
            description:
                "Analyze soil moisture and environmental conditions to provide irrigation-related decision-support information.",
        },
        {
            icon: CloudSun,
            title: "Current Weather",
            description:
                "Retrieve current weather information for the selected farm location using an external weather service.",
        },
        {
            icon: CloudSun,
            title: "5-Day Forecast",
            description:
                "View upcoming temperature, humidity, rainfall and wind information for the selected farm location.",
        },
        {
            icon: History,
            title: "History Management",
            description:
                "Maintain historical records of soil measurements, crop predictions and weather observations.",
        },
        {
            icon: LineChart,
            title: "Data Visualization",
            description:
                "Present historical information through charts and structured visual summaries for easier interpretation.",
        },
    ];


    const technologies = [
        "React",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "Python",
        "FastAPI",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "OpenWeather API",
    ];


    return (

        <div className="min-h-screen bg-white">


            {/* ==========================================
                HEADER
            ========================================== */}

            <section className="bg-gradient-to-br from-green-50 via-white to-amber-50 py-20">

                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-white">

                        <BrainCircuit
                            size={28}
                        />

                    </div>


                    <p className="mt-6 font-semibold text-green-700">
                        PLATFORM FEATURES
                    </p>


                    <h1 className="mt-3 text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Intelligent tools for agricultural decision support
                    </h1>


                    <p className="mt-5 text-lg leading-8 text-gray-600">

                        AI Smart Agriculture Assistant
                        integrates farm management,
                        soil analysis, machine learning,
                        agricultural guidance and weather
                        information into a single web platform.

                    </p>

                </div>

            </section>


            {/* ==========================================
                FEATURE GRID
            ========================================== */}

            <section className="py-20">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {features.map(
                            (feature) => {

                                const Icon =
                                    feature.icon;

                                return (

                                    <div
                                        key={
                                            feature.title
                                        }
                                        className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                                    >

                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">

                                            <Icon
                                                size={24}
                                            />

                                        </div>


                                        <h2 className="mt-6 text-xl font-bold text-gray-900">
                                            {
                                                feature.title
                                            }
                                        </h2>


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
                AI SECTION
            ========================================== */}

            <section className="bg-gray-50 py-20">

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                    <div className="grid items-center gap-12 lg:grid-cols-2">


                        <div>

                            <p className="font-semibold text-green-700">
                                MACHINE LEARNING
                            </p>


                            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                                AI-powered crop recommendation
                            </h2>


                            <p className="mt-5 leading-7 text-gray-600">

                                The crop recommendation module
                                uses a supervised machine-learning
                                classification model trained on
                                agricultural soil and environmental
                                data.

                            </p>


                            <p className="mt-4 leading-7 text-gray-600">

                                The deployed model uses parameters
                                such as N, P, K, temperature,
                                humidity, pH and rainfall to
                                generate a predicted crop and
                                candidate probabilities.

                            </p>

                        </div>


                        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-lg">

                            <div className="mb-6 flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">

                                    <BrainCircuit
                                        size={25}
                                    />

                                </div>

                                <div>

                                    <p className="text-sm text-gray-500">
                                        ML Pipeline
                                    </p>

                                    <h3 className="font-bold text-gray-900">
                                        Random Forest Classifier
                                    </h3>

                                </div>

                            </div>


                            <div className="space-y-3">

                                {[
                                    "Soil & environmental inputs",
                                    "Feature preparation",
                                    "Trained ML model",
                                    "Crop prediction",
                                    "Confidence & top candidates",
                                ].map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                item
                                            }
                                            className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
                                        >

                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                                                {
                                                    index +
                                                    1
                                                }
                                            </div>

                                            <span className="text-sm font-medium text-gray-700">
                                                {
                                                    item
                                                }
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==========================================
                TECHNOLOGY
            ========================================== */}

            <section className="py-20">

                <div className="mx-auto max-w-6xl px-4 sm:px-6">

                    <div className="text-center">

                        <p className="font-semibold text-green-700">
                            TECHNOLOGY STACK
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-900">
                            Built using modern web and AI technologies
                        </h2>

                    </div>


                    <div className="mt-10 flex flex-wrap justify-center gap-3">

                        {technologies.map(
                            (technology) => (

                                <span
                                    key={
                                        technology
                                    }
                                    className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm"
                                >
                                    {
                                        technology
                                    }
                                </span>

                            )
                        )}

                    </div>

                </div>

            </section>


            {/* ==========================================
                SECURITY / DATA
            ========================================== */}

            <section className="bg-gray-50 py-20">

                <div className="mx-auto max-w-5xl px-4 sm:px-6">

                    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">

                        <div className="flex flex-col gap-6 sm:flex-row">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">

                                <ShieldCheck
                                    size={28}
                                />

                            </div>


                            <div>

                                <h2 className="text-2xl font-bold text-gray-900">
                                    Secure and structured data management
                                </h2>

                                <p className="mt-3 leading-7 text-gray-600">

                                    User authentication is
                                    handled using JWT-based
                                    authentication and passwords
                                    are securely hashed before
                                    storage. Farm, soil,
                                    prediction and weather
                                    information are maintained
                                    using MongoDB.

                                </p>

                            </div>

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
                        Explore the agriculture assistant
                    </h2>

                    <p className="mt-4 text-green-100">
                        Create an account and start using the platform.
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


export default Features;