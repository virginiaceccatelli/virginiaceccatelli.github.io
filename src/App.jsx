import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SmoothScroll from "./components/fx/SmoothScroll";
import Cursor from "./components/fx/Cursor";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Writing from "./pages/Writing";

export default function App() {
  return (
    <SmoothScroll>
      <Cursor />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/writing" element={<Writing />} />
        </Routes>
      </Layout>
    </SmoothScroll>
  );
}
