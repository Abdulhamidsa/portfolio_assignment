import "./App.css";
import AuthProvider from "./context/AuthProvider";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import SignOut from "./components/SignOut.jsx";
import Profile from "./components/Profile.jsx";
import AppNavbar from "./components/AppNavbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import PersonProfile from "./pages/PersonProfile";

import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoutes";

const App = () => {
  return (
    <AuthProvider>
      <AppNavbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/people" element={<PersonProfile />} />

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
