import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
// import CropRecommendation from "./pages/CropRecommendation";

function App(){
  return(
    <div className="min-h-screen bg-gray-50 text-gray-900">

      <Navbar />

      <main>
        <AppRoutes />
      </main>

      <Footer />

    </div>
  )
}

export default App;