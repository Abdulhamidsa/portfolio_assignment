import "./App.css";
import AuthProvider from "./context/AuthProvider";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoutes";
import Signin from "./components/Auth/SignIn";
import AppLayout from "./components/Layout/AppLayout";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Auth />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
