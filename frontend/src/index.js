import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { createRoot } from'react-dom';
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18next";
import "./static/styles/signup.css";
import { ChakraProvider } from "@chakra-ui/react";
import App from './App';
import './App.css'

const Root = () => {
  return (
    <Suspense>
        <ChakraProvider>
          <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] t0-100%'>
           <App />
           </div>
        </ChakraProvider>
    </Suspense>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));
