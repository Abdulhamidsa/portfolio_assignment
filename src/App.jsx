import "./App.css";
import AuthProvider from "./context/AuthContext";
import useGetMovies from "./hooks/useGetMovies";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";

function App() {
  const { movies } = useGetMovies();
  console.log(movies);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
