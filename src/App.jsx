import "./App.css";
import AuthProvider from "./context/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuth";

import Home from "./components/home/Home";
import ProtectedRoute from "./components/ProtectedRoutes";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Logout from "./components/auth/Logout";
import AppLayout from "./components/Layout/AppLayout";
import UserBookmark from "./components/user/UserBookmark";
import Browse from "./pages/Browse";
import Catalog from "./pages/Catalog";
import TitlePage from "./pages/TitlePage";
import PersonProfile from "./pages/PersonProfile";


const IndexRedirect = () => {
  const { authReady, isAuthenticated } = useAuthContext();

  if (!authReady) {
    return null;
  }

  return <Navigate to={isAuthenticated ? "/home" : "/signin"} replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<IndexRedirect />} />
          {/* Public */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          {/* Protected */}
          <Route path="/home" element={<Home />} />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <UserBookmark />
              </ProtectedRoute>
            }
          />
          <Route path="/browse" element={<Browse />} />
          <Route path="/catalog/:type" element={<Catalog />} />
          <Route path="/catalog/:type/:genre" element={<Catalog />} />

          <Route path="/title/:id" element={<TitlePage />} />
           {/* ✅ NEW: Person profile (Protected) */}
          <Route
            path="/people/:nconst"
            element={
              <ProtectedRoute>
                <PersonProfile />
              </ProtectedRoute>
            }
              />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
