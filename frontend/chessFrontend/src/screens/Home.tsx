import { Link } from "react-router";
import chessBG from "../assets/chessBackground3.jpg";

export function Home() {
  return (
    <div
    className="bg-cover fixed h-[100vh] w-[100vw]"
    style={{
      backgroundImage: `url(${chessBG})`,
    }}>
        <h1 className="flex justify-center px-10 py-10 text-pretty text-[4rem] text-black font-bold ">Welcome, Join to play a Match</h1>
      <div className="flex justify-evenly items-center h-[900px] ">
        <div>
          <Link to="/game" className="w-[200px] hover:animate-pulse h-[60px] px-10 py-5 bg-yellow-200 text-black  rounded-lg text-xl 
          hover:bg-green-400 hover:borer-green-400 hover:text-black hover:transition transition duration-700">
            Join Room
          </Link>
        </div>
      </div>
    </div>
  );
}
