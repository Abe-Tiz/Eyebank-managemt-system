
import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18next";
import './static/styles/signup.css'
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
// import LoadingCircle from './components/LoadingCircle';
import router from "./router/Router";

const Root = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Suspense>
      <RouterProvider router={router}>
        <ChakraProvider />
          {/* {isLoading ? <LoadingCircle /> : <App />} */}
        {/* </ChakraProvider> */}
      </RouterProvider>
    </Suspense>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
