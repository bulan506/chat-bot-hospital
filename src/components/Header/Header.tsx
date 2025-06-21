// components/Header.tsx

"use client";
import "./Header.css";
import Image from "next/image";
import logo from "../../app/logo.png"; // Asegúrate de que el path es correcto

export default function Header() {
  return (
    <header className="main-header scrolled">
      <nav className="nav-container">
        <div className="logo">
          <Image src={logo} alt="Tatooine Medical Center Logo" width={120} />
        </div>
        <ul className="nav-links">
          <li><a href="#services">Servicios</a></li>
          <li><a href="#info">Información</a></li>
          <li><a href="#location">Ubicación</a></li>
        </ul>
      </nav>
    </header>
  );
}
