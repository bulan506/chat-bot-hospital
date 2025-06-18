"use client";

import { useState, useRef, useEffect } from "react";
import directLineService from "@/services/directLineService";
import { IoSend, IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // opcional, según confianza en HTML embebido
import styles from "./FloatingChatbot.module.css";


export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: removeCitations("Hola, ¿En qué puedo ayudarte hoy?"),
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Inicia token + refresh loop
    directLineService.init().catch(console.error);

    const unsubscribe = directLineService.onActivity((activity) => {
      if (activity.from.id !== "user" && activity.type === "message") {
        // Limpio citations antes de guardar
        const raw = activity.text || "";
        const cleaned = removeCitations(raw);
        setMessages((prev) => [
          ...prev,
          { text: cleaned, sender: "bot" },
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
    // Añadir mensaje de usuario (sin limpieza; suponemos texto plano)
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

  const renderMessageContent = (msg) => {
    // Antes de renderizar, como refuerzo, limpiamos de nuevo:
    const textToRender = removeCitations(msg.text);

    // Si prefieres no renderizar Markdown en el mensaje de usuario, podrías:
    // if (msg.sender === "user") return <>{textToRender}</>;

    // Renderizamos Markdown en ambos
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // Si no confías en HTML embebido, quita rehypeRaw:
        rehypePlugins={[rehypeRaw]}
        components={{
          a: ({ node, ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          // Aquí podrías personalizar code, pre, etc.
        }}
      >
        {textToRender}
      </ReactMarkdown>
    );
  };

  return (
    <div className={styles.chatbotContainer}>
      {isOpen && (
        <div className={`${styles.chatbotWindow} ${styles.open}`}>
          {/* Header */}
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

          {/* Mensajes */}
          <div className={styles.chatbotMessages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {renderMessageContent(msg)}
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

          {/* Input */}
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

          {/* Footer */}
          <div className={styles.chatbotFooter}>
            <p>
              Asistente virtual – No reemplaza asesoramiento médico
              profesional
            </p>
          </div>
        </div>
      )}
      {/* Botón flotante */}
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

// Versión mejorada:
function removeCitations(text) {
  if (!text) return text;
  let cleaned = text;
  cleaned = cleaned.replace(/\[\^?\d+\]/g, "");
  cleaned = cleaned.replace(/\(\d+\)/g, "");
  cleaned = cleaned.replace(/<sup>.*?<\/sup>/gi, "");
  cleaned = cleaned.replace(/\b\d+_+\b/g, "");
  cleaned = cleaned.replace(/_\d+\b/g, "");
  cleaned = cleaned.replace(/:?\s*cite:\d+\s*"[^"]*"/gi, "");
  cleaned = cleaned.replace(/:?\s*cite:\d+/gi, "");
  cleaned = cleaned.replace(/\s+([.,;:!?])/g, "$1");
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  cleaned = cleaned
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
  return cleaned.trim();
}