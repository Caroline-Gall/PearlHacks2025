
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useState, useEffect} from 'react';
import App from "./App";
import ViewItemInfo from "./view/ViewItemInfo";
import ViewSavings from "./view/ViewSavings";

function Router() {

  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/yourItems" element={<App />} />
          <Route exact path="/yourSavings" element={<ViewSavings />} />
          <Route path="/items/:item_id" element={<ViewItemInfo />} />
        </Routes>
      </BrowserRouter>
  )
};

export default Router;