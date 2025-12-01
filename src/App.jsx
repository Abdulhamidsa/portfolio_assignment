import "./App.css";
import AuthProvider from "./context/AuthContext";
import AuthExample from "./components/AuthExample";
import useGetMovies from "./hooks/useGetMovies";
import useGetPeople from "./hooks/useGetPeople";

function App() {
  const { movies } = useGetMovies();
  console.log(movies);

  return (
    <AuthProvider>
      <div className="App">
        <AuthExample />
      </div>
    </AuthProvider>
  );
}

export default App;
