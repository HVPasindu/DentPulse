import React from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainInterface from "./Patient Pages/MainInterface";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patient" element={<MainInterface/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
