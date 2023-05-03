import React from 'react';
import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import {useNavigate} from 'react-router-dom';
import myImage from "../src/images/10751.jpg"
// import '../index.css';

function App() {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <Transition
        show={showSplashScreen}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-6xl font-bold animate-fade-in">Yugo</div>
        </div>
      </Transition>
      <div className="flex-1 text-center">
        <Transition
          show={!showSplashScreen}
          enter="transition-transform duration-1000"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="transition-transform duration-1000"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
        >
          <div className="flex flex-col items-center">
            <img className='w-auto h-auto mt-[-250px]' src={myImage} alt="" />
            <h1 className="text-4xl font-bold mt-[-100px] text-blue-400">Yugo </h1>
            <p className="text-lg text-gray-700 mt-4">Find a ride or offer a ride and save the environment</p>
            <button className="bg-blue-500 text-white font-bold rounded-full px-4 py-2 mt-4 shadow-lg hover:bg-blue-700 transition duration-500 ease-in-out" onClick={() => navigate("/Signin")}>Start</button>
          </div>
        </Transition>
      </div>
    </div>
  );
}

export default App;
