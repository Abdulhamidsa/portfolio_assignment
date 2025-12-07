import "./App.css";
import AuthProvider from "./context/AuthContext";
import useGetMovies from "./hooks/useGetMovies";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import AuthExample from "./components/AuthExample";

function App() {
  const { movies } = useGetMovies();
  console.log(movies);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthExample />} /> {/* NEW */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
