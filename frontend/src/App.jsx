import React from "react";


import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaitentProfile from "./Patient Pages/PaitentProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patient" element={<PaitentProfile/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
