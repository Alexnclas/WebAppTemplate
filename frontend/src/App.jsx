import './App.css';
import MediaPage from './components/MediaPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import { AuthProvider } from './hooks/useAuth';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPassword';
import ResetPasswordPage from './components/ResetPassword';
import ExternalAPIPage from './components/ExternalAPIPage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
          <Route path="/reset-password" element={<ResetPasswordPage />}/>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Navbar/>
                  <MediaPage/>
                  <ExternalAPIPage/>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;

