import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteIquira from "./Routes/RouteIquira";


function App() {
  return (
    <BrowserRouter>
      <RouteIquira />
    </BrowserRouter>
  );
}

export default App;