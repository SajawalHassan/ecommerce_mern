import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;