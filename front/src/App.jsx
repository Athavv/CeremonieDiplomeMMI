import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Planning from './pages/Planning';
import Gallery from './pages/Gallery';
import Guestbook from './pages/Guestbook';

// Admin Imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UsersPage from './pages/admin/UsersPage';
import GuestbookAdminPage from './pages/admin/GuestbookAdminPage';
import GalleryAdminPage from './pages/admin/GalleryAdminPage';
import Footer from './components/common/layout/Footer';

import './index.css';


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


function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Navbar is global, but maybe hide it for admin layout if handled inside? 
            AdminLayout DOES NOT render Navbar now. 
            So Navbar will appear above AdminLayout content. 
            This is fine, as long as AdminLayout padding accounts for it.
            AdminLayout has pt-24 which is good.
         */}
        <Navbar />
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

        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}


export default App;
