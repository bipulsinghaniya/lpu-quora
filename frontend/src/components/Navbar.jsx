import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LpuLogo from "./LPU_logo.png";

export default function Navbar({ onAsk, search, setSearch }) {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b-2 border-orange-500 fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3 gap-3">
        {/* <h1 className="text-xl font-bold text-orange-500">LPU Quora</h1> */}
<div className="flex items-center gap-2">
  <img
    src={LpuLogo}
    alt="LPU Logo"
    className="h-10 w-10 object-contain"
  />
  <h1 className="text-xl font-bold text-orange-500">
    LPU Quora
  </h1>
</div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="border px-3 py-2 rounded-md w-1/2 text-sm"
        />

        <div className="flex gap-2">
          <button
            onClick={onAsk}
            className="bg-orange-500 text-white px-4 py-2 rounded-md"
          >
            Ask +
          </button>

          <button
            onClick={logout}
            className="bg-gray-200 px-3 py-2 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
