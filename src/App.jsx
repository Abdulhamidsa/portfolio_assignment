import "./App.css";
import AuthProvider from "./context/AuthContext";
import AuthExample from "./components/AuthExample";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AuthExample />
      </div>
    </AuthProvider>
  );
}

export default App;
