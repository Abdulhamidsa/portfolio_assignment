import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import SignOut from "./components/SignOut.jsx";
import Profile from "./components/Profile.jsx";
import AppNavbar from "./components/AppNavbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <AppNavbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
