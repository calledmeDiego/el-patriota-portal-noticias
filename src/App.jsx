import { useState } from "react";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import HomePage from "./pages/homepage/homepage";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/searchpage/searchpage";
import Navegacion from "./components/navegacion/navegacion";
import RegisterPage from "./pages/registerpage/registerpage";
import DashboardPage from "./pages/dashboardpage/dashboardpage";
import GuardadosPage from "./pages/guardadopage/guardadospage";

function App() {
  const [theme, setTheme] = useState("light");

  const cambiarTema = () => {
    setTheme((actualTema) => (actualTema === "light" ? "dark" : "light"));
  };

  return (
    <div className={`app theme-${theme}`}>
      <Header theme={theme} cambiarTema={cambiarTema} />
      <div className="app-container container">
        <Navegacion />
        <Routes>
          <Route path="/inicio" element={<HomePage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="/guardados" element={<GuardadosPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/registrar" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
