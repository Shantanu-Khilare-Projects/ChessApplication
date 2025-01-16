import { Route, Routes } from "react-router";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
