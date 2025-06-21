"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaClinicMedical,
  FaUserMd,
  FaClock,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import FloatingChatbotEmbed from "@/components/FloatingChatbotEmbed";
import OpenStreetMap from "../components/OpenStreetMap";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="medical-layout">
            <Header />
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Tatooine Medical Center</h1>
          <p>Cuidando tu salud con tecnología y calidez humana</p>
          <a href="#services">
            <button className="hero-button">Conoce nuestros servicios</button>
          </a>
        </div>
      </section>

      {/* Servicios Destacados */}
<section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <div className="services-grid">
            <div className="service-card">
              <FaClinicMedical className="service-icon" />
              <h3>Urgencias 24/7</h3>
              <p>
                Atención médica inmediata las 24 horas del día, los 365 días del
                año.
              </p>
            </div>
            <div className="service-card">
              <FaUserMd className="service-icon" />
              <h3>Especialidades Médicas</h3>
              <p>
                Contamos con más de 20 especialidades para cuidar de tu salud
                integral.
              </p>
            </div>
            <div className="service-card">
              <FaClinicMedical className="service-icon" />
              <h3>Cirugías de Alta Complejidad</h3>
              <p>Quirófanos equipados con tecnología de última generación.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Información Importante */}
      <section id="info" className="info-section">
        <div className="container">
          <h2 className="section-title">Información para Pacientes</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-header">
                <FaClock className="info-icon" />
                <h3>Horarios de Visita</h3>
              </div>
              <div className="info-content">
                <ul>
                  <li>
                    <strong>Pacientes generales:</strong> 10:00 am - 8:00 pm
                  </li>
                  <li>
                    <strong>Terapia intensiva:</strong> 11:00 am - 12:00 pm y
                    6:00 pm - 7:00 pm
                  </li>
                  <li>
                    <strong>Pediatría:</strong> Abierto 24 horas para padres
                  </li>
                </ul>
              </div>
            </div>
            <div className="info-card">
              <div className="info-header">
                <FaPhone className="info-icon" />
                <h3>Contacto de Emergencia</h3>
              </div>
              <div className="info-content">
                <p>
                  <strong>Urgencias:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Información general:</strong> (555) 765-4321
                </p>
                <p>
                  <strong>Ambulancias:</strong> (555) 987-6543
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="location" className="location">
        <div className="container">
          <h2 className="section-title">Nuestra Ubicación</h2>
          <div className="location-grid">
            <div>
              <div className="location-info">
                <FaMapMarkerAlt className="location-icon" />
                <p>Av. Galaxia 1234, Sector Alderaan, Tatooine</p>
              </div>
              <div className="map-container">
                <p>Mapa de Ubicación</p>
                <OpenStreetMap />
              </div>
            </div>
            <div className="directions">
              <h3>Cómo llegar</h3>
              <div className="direction-step">
                <span className="step-number">1</span>
                <span>Línea 3 del Metro - Estación Medical Center</span>
              </div>
              <div className="direction-step">
                <span className="step-number">2</span>
                <span>Autobuses 45, 67 y 89 - Parada Hospital</span>
              </div>
              <div className="direction-step">
                <span className="step-number">3</span>
                <span>Estacionamiento gratuito para pacientes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>Tatooine Medical Center</h3>
              <p>
                El hospital más avanzado del sistema estelar, comprometido con
                tu salud y bienestar.
              </p>
            </div>
            <div>
              <h3>Enlaces Rápidos</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Servicios</a>
                </li>
                <li>
                  <a href="#">Médicos</a>
                </li>
                <li>
                  <a href="#">Pacientes</a>
                </li>
                <li>
                  <a href="#">Contacto</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Acreditaciones</h3>
              <div className="accreditations">
                <div className="accreditation">JCI</div>
                <div className="accreditation">ISO</div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>
              © {new Date().getFullYear()} Tatooine Medical Center. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot Flotante (ahora como componente independiente) */}
      <FloatingChatbotEmbed width={400} height={500} buttonSize={60} src={undefined} />
    </div>
  );
}
