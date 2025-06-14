"use client";

import { useState, useRef, useEffect } from "react";
import directLineService from "@/services/directLineService";
import { IoSend, IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import styles from "./FloatingChatbot.module.css";

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hola, ¿En qué puedo ayudarte hoy?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Inicia token + refresh loop
    directLineService.init().catch(console.error);

    const unsubscribe = directLineService.onActivity((activity) => {
      if (activity.from.id !== "user" && activity.type === "message") {
        setMessages((prev) => [
          ...prev,
          { text: activity.text, sender: "bot" },
        ]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      directLineService.dispose();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    directLineService
      .postActivity({
        from: { id: "user", name: "Usuario" },
        type: "message",
        text: input,
      })
      .subscribe({
        error: (err) => {
          console.error("Error enviando mensaje:", err);
          setMessages((prev) => [
            ...prev,
            {
              text:
                "Lo siento, hubo un problema enviando tu mensaje. Intenta de nuevo.",
              sender: "bot",
            },
          ]);
          setLoading(false);
        },
      });
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={`${styles.chatbotWindow} ${styles.open}`}>
          <div className={styles.chatbotHeader}>
            <h3>Tatooine Medical Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="Cerrar chat"
            >
              <IoClose />
            </button>
          </div>
          <div className={styles.chatbotMessages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {msg.sender === "bot" ? (
                  <div
                    className={styles.bot}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                ) : (
                  msg.text
                )}
              </div>
            ))}
            {loading && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.chatbotInput}>
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={!input.trim() || loading}>
              <IoSend />
            </button>
          </div>
          <div className={styles.chatbotFooter}>
            <p>
              Asistente virtual – No reemplaza asesoramiento médico
              profesional
            </p>
          </div>
        </div>
      )}
      <button
        className={styles.chatbotButton}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <IoClose /> : <IoChatbubbleEllipses />}
      </button>
    </div>
  );
}
