import { Routes, Route } from "react-router";
import Index from "./pages/Index";
import Tickets from "./pages/Tickets";
import About from "./pages/About";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
