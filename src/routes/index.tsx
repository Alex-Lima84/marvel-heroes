import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home'
import SuperHeroDescription from "../pages/super-hero-description";
import PageNotFound from "../pages/not-found";


export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/super-hero-description/:id" element={<SuperHeroDescription />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
