import React from 'react'
 
import { Outlet } from "react-router-dom";
import Navbar from '../components/Header';
import Footer from '../components/footer';

const Main = () => {
  return  (
    <div className=''>
      <Navbar />
      <div className="min-h-screen space-y-5 mt-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Main
