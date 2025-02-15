
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, useEffect} from 'react';
import App from "./App";

function Router() {

  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
  )
};

export default Router;