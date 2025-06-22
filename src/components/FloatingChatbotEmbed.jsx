"use client";
import React, { useState } from "react";
import { IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import PropTypes from "prop-types";
import styles from "./FloatingChatbotEmbed.module.css";

const CHATBOT_URL =
  "https://copilotstudio.microsoft.com/environments/Default-e7984cac-2543-4f88-8f97-9524335e6bc4/bots/cr29b_agentedeprueba/webchat?__version__=2";

export default function FloatingChatbotEmbed({
  src,
  width = 400,
  height = 600,
  buttonSize = 60,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const iframeSrc = src || CHATBOT_URL;

  if (!iframeSrc) {
    console.error(
      "FloatingChatbotEmbed: no se proporcionó URL. Verifica la constante o la prop `src`."
    );
    return null;
  }

  const formatDim = (dim) => (typeof dim === "number" ? `${dim}px` : dim);

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div
          className={styles.chatbotWindow}
          style={{
            width: formatDim(width),
            height: formatDim(height),
          }}
        >

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
          width: formatDim(buttonSize),
          height: formatDim(buttonSize),
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
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buttonSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
