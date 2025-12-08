import "./App.css";
import AuthProvider from "./context/AuthProvider";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";

import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  return (
    <AuthProvider>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
