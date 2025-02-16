
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, useEffect} from 'react';
import App from "./App";
import ViewItemInfo from "./view/ViewItemInfo";

function Router() {

  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/yourItems" element={<App />} />
          <Route exact path="/yourSavings" element={<App />} />
          <Route path="/items/:item_id" element={<ViewItemInfo />} />
        </Routes>
      </BrowserRouter>
  )
};

export default Router;