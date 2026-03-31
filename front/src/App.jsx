import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Planning from './pages/Planning';
import Gallery from './pages/Gallery';
import Guestbook from './pages/Guestbook';
import NotFound from './pages/NotFound';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';
import GuestbookAdminPage from './pages/admin/GuestbookAdminPage';
import GalleryAdminPage from './pages/admin/GalleryAdminPage';
import Footer from './components/common/layout/Footer';
import Preloader from './components/common/Preloader';
import PageTransition from './components/common/PageTransition';
import SmoothScroll from './components/common/SmoothScroll';
import CustomCursor from './components/common/CustomCursor';

import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.firstLogin) {
    return <Navigate to="/change-password" />;
  }

  if (adminOnly && user.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return children;
};

const BACKEND_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api').replace('/api', '');

function KeepAlive() {
  useEffect(() => {
    const ping = () => fetch(`${BACKEND_URL}/api/public/guestbook`, { method: 'GET' }).catch(() => {});
    ping();
    const id = setInterval(ping, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <KeepAlive />
      <AuthProvider>
        <SmoothScroll>
          <CustomCursor />
          <Preloader />
              <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/guestbook" element={<Guestbook />} />
              <Route
                path="/gallery"
                element={
                  <ProtectedRoute>
                    <Gallery />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="guestbook" element={<GuestbookAdminPage />} />
                <Route path="gallery" element={<GalleryAdminPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </AuthProvider>
    </Router>
  );
}

export default App;
