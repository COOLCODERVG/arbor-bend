/*
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/


import Navbar from "./components/Navbar";
import { FaUserCog, FaUsers, FaChartBar } from "react-icons/fa";
import Footer from "./components/Footer";
import { Button } from "./components/ui/button";
import map from "./Files/map.png";
import "./App.css";
import WordPullUp from "./components/ui/word-pull-up";

function App() {
  return (
    <div className = "md:w-[99.9%] w-screen overflow-x-hidden">
      <Navbar />
      <div className = "min-h-screen h-fit overflow-hidden w-screen relative">
        <div className = "left-[50%] absolute">
          <span className = "bg-circle mx-auto -left-[50%]"></span>
        </div>
        <p className = "mx-auto md:w-fit w-screen h-fit md:mt-[200px] mt-[100px] text-center md:text-[80px] text-[60px] font-semibold font-sans bg-transparent leading-tight">
          <WordPullUp
            specialNumber={1}
            specialClass="text-green-500 hover:text-[100px] transition-all"
            className="highlight-local mx-auto wfit h-fit mt-[200px] md:max-w-[80%] max-w-screen space-x-4 text-center md:text-[80px] text-[70px] font-semibold font-sans bg-transparent word-spacing leading-tight"
            words = "Supporting Local in Every Way"
          />

          <span className = "text-neutral-500 font-thin text-2xl h-fit md:!w-[700px] w-fit md:px-0 px-10 mx-auto block mt-10">
            An AI-powered marketplace for Arbor Bend residents to securely buy, sell, and exchange goods and services with neighbors.
          </span>
          <a href = "/login">
            <button className = "w-fit text-lg px-7 py-2 font-normal bg-green-500 text-white rounded-md transition-all hover:scale-105 hover:shadow-md hover:shadow-green-500 hover:bg-transparent hover:border-green-500 border hover:text-green-500">
              Get Started
            </button>
          </a>
        </p>
      </div>
      <div>
    </div>
      <section className = "md:w-[70%] w-screen md:px-0 px-3 mx-auto md:mt-32 mt-10">
        <h1 className = "md:text-[80px] text-[70px] md:mx-0 mx-auto md:text-left text-center font-semibold">
          Buy, Sell and {" "}
          <span className = "bg-clip-text text-transparent bg-green-500 hover:text-[100px] transition-all">
            Connect
          </span>
        </h1>
        <p className = "text-neutral-500 font-[200] text-2xl h-fit md:w-1/2 w-[80%] md:mx-0 mx-auto md:text-left text-center block">
          Our Arbor Bend Marketplace creates a seemless, local commerce
          experience for buying, selling and connecting with your neighbors. {" "}
        </p>
        <div className = "mt-20 grid md:grid-cols-3 grid-cols-1 justify-between md:mx-0 mx-auto w-fit">
          <Feature
            title={"Personalized Recommendations"}
            text={"Discover items you'll love with our AI-driven recommendations. Our platform suggests products based on interests and purchasing habits, making it easier to find your needs."}
            icon={<FaUserCog />}
          />
          <Feature
            title={"Smart Pricing Assistant"}
            text={"Price and check your items effectively with our smart Pricing Assistant, which offers optimal price suggestions based on market trends and similar listings in the area."}
            icon={<FaUsers />}
          />
          <Feature
            title={"Automated Notifications"}
            text={"Stay informed with instant notifications for new listings, updatesm and offers that match your preferences. Customize your alerts to get updates that matter to you."}
            icon={<FaChartBar />}
          />
        </div>
     </section>

     <section className="md:w-[70%] w-screen mx-auto my-32">
        <div className = "w-full min-h-[470px] rounded-[30px] bg-gradient-to-br from-green-200 to-green-500 pt-24 md:pl-24 pl-10 md:px-0 px-10 flex relative">
          <div className = "md:w-1/2 w-full">
            <h3 className = "text-xl mt-[-20px]">Love Our Tools?</h3>
            <h1 className = "text-[50px] font-semibold mt-2 leading-snug">
              We're here to empower the Arbor Bend Community!
            </h1>
            <h3 className = "text-[18px] mt-2">
              Providing out playform to residents at no cost, making it easier
              than even to connect, buy, sell, and support local.
            </h3>
            <a href = "/login">
              <Button className = "mt-8 mb-10" variant = {"outline"}>
                Get Started
              </Button>
            </a>
          </div>
          <img 
            src = {map}
            className = "my-auto ml-3 md:block hidden absolute right-0 top-[50%] -translate-y-[50%]"
            > </img>
        </div>
     </section>
     <Footer />
     </div>
  )
}

function Feature({
  text,
  title,
  icon,
}: {
  text: string;
  title: string;
  icon: JSX.Element;
}) {
  return (
    <div className = "bg-white p-6 rounded-xl md:w-[100%] w-[90%] text-black">
      <span className = "!w-[50px] !h-[50px] flex items-center justify-center rounded-full bg-green-500 text-white text-center mb-6">
        {icon}
      </span>
      <h1 className = "text-3xl font-normal mb-4">{title}</h1>
      <p className = "text-md text-neutral-500">
        {text}
      </p>
    </div>
  );
}

export default App;