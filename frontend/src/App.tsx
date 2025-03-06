import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landingpage/Landingpage';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
        </Router>
    );
}

export default App;