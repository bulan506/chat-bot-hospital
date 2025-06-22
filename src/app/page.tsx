"use client";
import { useState } from "react";
import {
  FaClinicMedical,
  FaUserMd,
  FaMapMarkerAlt,
  FaHome,
  FaAmbulance,
  FaStethoscope,
} from "react-icons/fa";
import FloatingChatbotEmbed from "@/components/FloatingChatbotEmbed";
import OpenStreetMap from "../components/OpenStreetMap";
import Header from "@/components/Header/Header";
import { FaHeartPulse } from "react-icons/fa6";
import contactImg from "../app/contact.jpeg";

const branches = [
  {
    id: "S001",
    name: "Clínica Central San José",
    coords: [9.9333, -84.0833],
    address:
      "Av. Central, 200m norte del Hospital Calderón Guardia, Carmen, San José",
  },
  {
    id: "S002",
    name: "Clínica Este Curridabat",
    coords: [9.9145, -83.9987],
    address: "Frente a Multiplaza del Este, Granadilla, Curridabat, San José",
  },
  {
    id: "S003",
    name: "Clínica Heredia Norte",
    coords: [10.0003, -84.1165],
    address: "Contiguo al Walmart de Heredia, San Francisco, Heredia, Heredia",
  },
  {
    id: "S004",
    name: "Clínica Alajuela Centro",
    coords: [10.0163, -84.2116],
    address: "200m oeste del Parque Central, Alajuela, Alajuela, Alajuela",
  },
  {
    id: "S005",
    name: "Clínica Tibás",
    coords: [9.9577, -84.0902],
    address:
      "Frente a la Iglesia Católica de Tibás, San Juan, Tibás, San José",
  },
];

export default function Home() {

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

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

  <section id="services" className="services" style={{paddingTop:"60px"}}>
    
    <div className="container">
      <h2 className="section-title">Nuestros Servicios</h2>
      <div className="services-grid">
        <div className="service-card">
          <FaHeartPulse className="service-icon" />
          <h3>Consulta Externa</h3>
          <p>
            Cardiología, Pediatría, Ginecología, Reumatología, entre otras especialidades. Cita previa en Ext. 3100
            <br/>
            <br/>
            <b>Lunes a viernes, 7:00 AM a 7:00 PM.</b>
          </p>
        </div>
        <div className="service-card">
          <FaStethoscope className="service-icon" />
          <h3>Cirugía Ambulatoria</h3>
          <p>
            Procedimientos como cataratas, biopsias y endoscopias. 
            Ext. 5200.
            <br/>
            <br/>
            <br/>
            <b>Lunes a viernes, 6:00 AM a 4:00 PM.</b>
          </p>
        </div>
        <div className="service-card">
          <FaClinicMedical className="service-icon" />
          <h3>Laboratorio Clínico</h3>
          <p>
            Exámenes de sangre, orina y cultivos.<br></br>
            Ext. 4000.
          </p>
            <br/>
            <br/>
            <b>Lunes a sábado, 6:00 AM a 6:00 PM.</b>

        </div>
        <div className="service-card">
          <FaHome className="service-icon" />
          <h3>Atención Domiciliaria</h3>
          <p>
            Enfermería, fisioterapia y apoyo psicológico en casa. 
            Ext. 7000.
            <br/>
            <br/>
            <br/>
            <b>Lunes a viernes, 8:00 AM a 6:00 PM.</b>
          </p>
        </div>
        <div className="service-card">
          <FaUserMd className="service-icon" />
          <h3>Servicios Especiales</h3>
          <p>
            Otorrinolaringología, dermatología y oftalmología.
          </p>
            <br/>
            <br/>
            <b>Lunes a viernes, 7:00 AM a 7:00 PM.</b>
        </div>
        <div className="service-card">
          <FaAmbulance className="service-icon" />
          <h3>Emergencias 24/7</h3>
          <p>
            Atención médica inmediata todo el año. Edificio C, Piso 1. Contacto: 911.
          </p>
            <br/>
            <br/>
            <b>Todos los días, todo el día. </b>
        </div>
      </div>
    </div>

    <br></br>
    <br></br>
  </section>

  <section id="about" className="about-section" style={{backgroundColor:"white", paddingTop:"60px", borderTop: "1px solid #ddd"}}>
    <div className="container">

      <div className="history-text">
        <h2 className="section-title">Sobre Nosotros</h2>
        <p>
          Tatooine Medical Center es el hospital más avanzado del sistema estelar, fundado en el año 2003 con el objetivo de
          ofrecer atención médica de vanguardia y servicios de salud innovadores a la comunidad de Tatooine. Fue concebido
          como una respuesta a la creciente necesidad de servicios médicos en un planeta desértico, conocido por sus
          condiciones extremas y su población dispersa. Su fundador, Dr. Armand Tatoo, un médico visionario originario de la
          región de Mos Espa, lideró la iniciativa para crear un centro de salud que pudiera proporcionar una atención accesible y
          de calidad a los habitantes del planeta.
        </p>
        <p>
          A lo largo de los años, el hospital ha evolucionado para convertirse en un centro de excelencia, reconocido no solo por
          su capacidad para atender emergencias y problemas de salud comunes, sino también por su innovación y adaptación a
          las condiciones extremas del planeta.
        </p>
      </div>

      <div className="timeline-wrapper">
        <ul className="timeline">
          {[
            { year: 2003, label: "Fundación" },
            { year: 2005, label: "Expansión servicios" },
            { year: 2008, label: "IA en citas" },
            { year: 2010, label: "Cirugía Ambulatoria" },
            { year: 2015, label: "Telemedicina" },
            { year: 2020, label: "Crisis sanitaria" },
            { year: 2022, label: "Renovación" },
            { year: 2025, label: "22° Aniversario" },
          ].map((item, idx) => (
            <li key={idx} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-label">{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <div className="info-header">
            <h3>Misión</h3>
          </div>
          <div className="info-content">
            <p>
              Proporcionar atención médica integral y de alta calidad a todos los habitantes 
              de Tatooine. Estamos comprometidos con el bienestar de nuestros pacientes, 
              ofreciendo soluciones de salud accesibles, efectivas y humanas, basadas en 
              la innovación, la investigación y el cuidado personalizado.
            </p>
          </div>
        </div>
        <div className="info-card">
          <div className="info-header">
            <h3>Visión</h3>
          </div>
          <div className="info-content">
            <p>
              Ser el hospital líder en tecnología médica y bienestar de pacientes, 
              reconocido por la excelencia en atención y nuestra capacidad para 
              enfrentar los desafíos de Tatooine, promoviendo una salud sostenible, 
              accesible y de calidad para todos.
            </p>
          </div>
        </div>
      </div>

    </div>
    <br></br>
  </section>

      <section id="location" className="location" style={{borderTop: "1px solid #ddd"}}>
        <div className="container">
          <h2 className="section-title">Nuestras Sucursales</h2>
          <div className="location-grid">
            <div>
              <div className="location-info">
                <FaMapMarkerAlt className="location-icon" size={40}/>
                <p><b>{selectedBranch.name}</b> <br></br>{selectedBranch.address}</p>
                
              </div>
                <OpenStreetMap center={selectedBranch.coords} />
            </div>
            <div className="directions">
              <h3>Sucursales</h3>
              {branches.map((b, i) => (
                <div
                  key={b.id}
                  className={`direction-step ${
                    b.id === selectedBranch.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedBranch(b)}
                >
                  <span className="step-number" style={{cursor:"pointer"}}>{i + 1}</span>
                  <p style={{cursor:"pointer"}}>{b.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>  


    <section
      id="contact"
      className="location"
      style={{ backgroundColor: "white", padding: "4rem 0", borderTop: "1px solid #ddd" }}
    >
      <div className="container">
        <h2 className="section-title">Contáctanos</h2>
        <div
          className="location-grid"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              flex: "0 0 50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <img
              src={contactImg.src}
              alt="Agente de atención al cliente"
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>

          <div
            className="directions"
            style={{
              flex: "0 0 40%",
              minWidth: "280px",
            }}
          >
            <h3>¡Estamos para servirte!</h3>
            <p>
              No dudes en contactarnos para cualquier consulta o apoyo que necesites.
            </p>
            <p>
              <strong>Teléfono:</strong> +506 1234-1234
            </p>
            <p>
              <strong>Horario de atención:</strong> Lunes a viernes, 8:00 a.m. – 6:00 p.m.
            </p>
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
              <h3>Menú</h3>
              <ul className="footer-links">
                
                <li><a href="#services">Nuestros Servicios</a></li>
                <li><a href="#about">Sobre Nosotros</a></li>
                <li><a href="#location">Sucursales</a></li>
                <li><a href="#contact">Contacto</a></li>

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
      <FloatingChatbotEmbed  buttonSize={60} src={undefined} />
    </div>
  );
}
