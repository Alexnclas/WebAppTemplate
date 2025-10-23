import './App.css';
import MediaPage from './components/MediaPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import { AuthProvider } from './hooks/useAuth';

function App() {
  // Missing a Root "/" Route
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
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

