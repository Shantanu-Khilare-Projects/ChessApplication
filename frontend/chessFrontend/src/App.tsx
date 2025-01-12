import { Route, Routes } from "react-router";
import { Home } from "./screens/Home";
import { Game } from "./screens/Game";
import chessBG from "./assets/chessBackground2.jpg";

function App() {
  return (
    <div
      className="bg-cover h-[100vh] w-[100vw]"
      style={{
        backgroundImage: `url(${chessBG})`, // Corrected syntax for backgroundImage
      }}
    >
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
