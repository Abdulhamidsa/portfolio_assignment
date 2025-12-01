import "./App.css";
import useGetMovies from "./hooks/useGetMovies";

function App() {
  const { movies } = useGetMovies();
  console.log(movies);

  return <></>;
}

export default App;
