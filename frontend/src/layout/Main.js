import React from 'react'
import Navbar from './../sections/header/Header';
import Footer from './../sections/footer/footer';
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen space-y-5 mt-24">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Main
