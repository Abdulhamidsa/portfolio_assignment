import "./App.css";
import useGetMovies from "./hooks/useGetMovies";
import useGetPeople from "./hooks/useGetPeople";

function App() {
  const { movies } = useGetMovies();
  console.log(movies);

  const { people } = useGetPeople();
  console.log(people);


  return <></>;
}

export default App;
