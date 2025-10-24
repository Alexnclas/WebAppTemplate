import './App.css';
import MediaPage from './components/MediaPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import { AuthProvider } from './hooks/useAuth';
import RegisterPage from './components/RegisterPage';
import ForgotPasswordPage from './components/ForgotPassword';
import ResetPasswordPage from './components/ResetPassword';

function App() {
  // Missing a Root "/" Route
  return (
    <AuthProvider>
      <BrowserRouter>
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
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

