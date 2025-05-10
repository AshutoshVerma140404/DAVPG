import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import ViewNews from './components/admin/ViewNews';
import FacultyDashboard from './components/FacultyDashboard';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroSection />} />
           <Route path="/login" element={<Login />} />
            <Route path="/AdminDashboard" element={<AdminDashboard/>} />
            <Route path="/viewNews" element={<ViewNews />} />
             <Route path="/viewalumni" element={<ViewNews />} />
              <Route path="/FacultyDashboard" element={<FacultyDashboard/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
