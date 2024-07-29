import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Homepage from "./components/Homepage";

function App() {
  return (
    <>
      <header className="mb-3">
        <Navbar />
      </header>

      <main className="container">
        <Routes>
          <Route
            element={<Homepage />}
            path="/"
          />

          <Route
            element={<Register />}
            path="/register"
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
