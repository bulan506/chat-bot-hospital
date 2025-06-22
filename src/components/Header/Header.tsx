"use client";
import { useState } from "react";
import "./Header.css";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../app/logo.png";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`main-header ${menuOpen ? "menu-open" : ""}`}>
      <nav className="nav-container">
        <div className="logo">
          <Image src={logo} alt="Tatooine Medical Center Logo" width={120} />
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className="nav-links">
          <li><a href="#services">Nuestros Servicios</a></li>
          <li><a href="#about">Sobre Nosotros</a></li>
          <li><a href="#location">Sucursales</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}
