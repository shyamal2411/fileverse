import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-white">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-semibold tracking-tighter mb-6">
          Your One-Stop Site for <span className="text-black">PDFs</span>
        </h1>
        <p className="text-lg mb-8">
          Sign up today and ease the file management
        </p>
        <button
          className="bg-white text-blue-500 py-2 px-6 rounded-lg font-semibold hover:bg-blue-200 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={handleButtonClick}
        >
          Sign up today!
        </button>
      </div>
    </section>
  );
};

export default Home;
