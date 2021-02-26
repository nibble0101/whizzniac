import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer";
import "./styles/App.css";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    </Router>
  );
}

export { App };
