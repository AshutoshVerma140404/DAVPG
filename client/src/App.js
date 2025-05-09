import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ViewNews from './components/ViewNews';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroSection />} />
           <Route path="/login" element={<Login />} />
            <Route path="/AdminDashboard" element={<AdminDashboard/>} />
             <Route path="/viewNews" element={<ViewNews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
