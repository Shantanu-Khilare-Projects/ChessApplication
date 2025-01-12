import { Link } from "react-router";

export function Home() {
  return (
    <div>
        <h1 className="flex justify-center px-10 py-10 text-pretty text-[4rem] text-black font-bold ">Welcome, Join to play a Match</h1>
      <div className="flex justify-evenly items-center h-screen ">
        <div>
          <Link to="/game" className="w-[200px] h-[60px] px-5 py-2 bg-green-700 text-white  rounded-lg text-xl 
          hover:bg-green-400 hover:borer-green-400 hover:text-black hover:transition duration-700  transition duration-700">
            Join Room
          </Link>
        </div>
      </div>
    </div>
  );
}
