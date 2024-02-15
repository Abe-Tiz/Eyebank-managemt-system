import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18next";
import "./static/styles/signup.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";

const Root = () => {
  return (
    <Suspense>
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    </Suspense>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));
