"use client";
import React, { useState } from "react";
import { IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import styles from "./FloatingChatbotEmbed.module.css";

const CHATBOT_URL =
  "https://copilotstudio.microsoft.com/environments/Default-e7984cac-2543-4f88-8f97-9524335e6bc4/bots/cr29b_agentedeprueba/webchat?__version__=2";

export default function FloatingChatbotEmbed({ src, buttonSize = 60 }) {
  const [isOpen, setIsOpen] = useState(false);
  const iframeSrc = src || CHATBOT_URL;

  if (!iframeSrc) {
    console.error("FloatingChatbotEmbed: no se proporcionó URL.");
    return null;
  }

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotBody}>
            <iframe
              src={iframeSrc}
              title="Chatbot Tatooine Medical Center"
              className={styles.chatbotIframe}
              allowFullScreen
            />
          </div>
          <div className={styles.chatbotFooter}>
            <small>Asistente virtual – No reemplaza asesoramiento médico profesional</small>
          </div>
        </div>
      )}

      <button
        className={styles.chatbotButton}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        style={{
          width: `${buttonSize}px`,
          height: `${buttonSize}px`,
          borderRadius: "50%",
        }}
      >
        {isOpen ? <IoClose size={24} /> : <IoChatbubbleEllipses size={24} />}
      </button>
    </div>
  );
}

FloatingChatbotEmbed.propTypes = {
  src: PropTypes.string,
  buttonSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
