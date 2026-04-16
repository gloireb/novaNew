import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/public/Home';
import Pricing from './pages/public/Pricing';
import Coverage from './pages/public/Coverage';
import HowItWorks from './pages/public/HowItWorks';
import Support from './pages/public/Support';
import Blog from './pages/public/Blog';
import Resellers from './pages/public/Resellers';
import About from './pages/public/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ClientDashboard from './pages/client/ClientDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Admin route without standard layout */}
          <Route path="/admin/*" element={<AdminDashboard />} />

          {/* Main App Routes with layout */}
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/offres" element={<Pricing />} />
                <Route path="/couverture" element={<Coverage />} />
                <Route path="/coverage" element={<Coverage />} />
                <Route path="/comment-ca-marche" element={<HowItWorks />} />
                <Route path="/support" element={<Support />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/revendeurs" element={<Resellers />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<ClientDashboard />} />
                <Route path="*" element={<div className="min-h-screen flex items-center justify-center">Page en construction...</div>} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
