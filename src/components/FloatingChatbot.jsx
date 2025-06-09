"use client";
import { useState, useRef, useEffect } from "react";
import { DirectLine } from "botframework-directlinejs";
import { IoSend, IoChatbubbleEllipses, IoClose } from "react-icons/io5";
import styles from "./FloatingChatbot.module.css";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hola", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const directLineRef = useRef(null);

  // Leer el token del .env.local
  const directLineToken = process.env.NEXT_PUBLIC_DIRECT_LINE_TOKEN;

  // Inicializar DirectLine
  useEffect(() => {
    if (!directLineRef.current && directLineToken) {
      directLineRef.current = new DirectLine({ token: directLineToken });
      directLineRef.current.activity$.subscribe((activity) => {
        if (activity.from.id !== "user" && activity.type === "message") {
          setMessages((prev) => [
            ...prev,
            { text: activity.text, sender: "bot" },
          ]);
          setLoading(false);
        }
      });
    }
  }, [directLineToken]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };
  function parseSimpleMarkdown(text) {
    // 1. Quitar referencias al pie (líneas que empiezan con [n]: ...)
    let cleaned = text.replace(/^\[\d+\]:.*$/gm, "");

    // 2. Quitar las citas en línea [1], [2], etc.
    cleaned = cleaned.replace(/\[\d+\]/g, "");

    // 3. Convertir ### encabezados en h3
    cleaned = cleaned.replace(/^### (.*)$/gm, "<h3>$1</h3>");

    // 4. Convertir negritas **texto**
    cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // 4.1 Convertir cursivas _texto_ o *texto*
    cleaned = cleaned.replace(/(?:\*|_)([^*_]+)(?:\*|_)/g, "<em>$1</em>");

    // 5. Convertir listas:
    // Encontrar grupos de líneas con - y convertir a <ul><li>
    cleaned = cleaned.replace(/(^- .+(?:\n- .+)*)/gm, (match) => {
      const items = match
        .split("\n")
        .map((item) => item.replace(/^- /, "").trim());
      const listItems = items.map((item) => `<li>${item}</li>`).join("");
      return `<ul>${listItems}</ul>`;
    });

    // 6. Cambiar saltos de línea por <br>
    cleaned = cleaned.replace(/\n/g, "<br>");

    return cleaned.trim();
  }

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Enviar mensaje al bot
    directLineRef.current
      ?.postActivity({
        from: { id: "user", name: "Usuario" },
        type: "message",
        text: input,
      })
      .subscribe({
        error: (err) => {
          console.error("Error al enviar al bot:", err);
          setMessages((prev) => [
            ...prev,
            {
              text: "Lo siento, hubo un problema enviando tu mensaje. Intenta de nuevo.",
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
              onClick={toggleChatbot}
              className={styles.closeButton}
              aria-label="Cerrar chat"
            >
              <IoClose />
            </button>
          </div>

          <div className={styles.chatbotMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {msg.sender === "bot" ? (
                  <div
                    className={styles[msg.sender]}
                    dangerouslySetInnerHTML={{
                      __html: parseSimpleMarkdown(msg.text),
                    }}
                  ></div>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>
              <IoSend />
            </button>
          </div>

          <div className={styles.chatbotFooter}>
            <p>
              Asistente virtual - No reemplaza asesoramiento médico profesional
            </p>
          </div>
        </div>
      )}

      <button
        className={styles.chatbotButton}
        onClick={toggleChatbot}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <IoClose /> : <IoChatbubbleEllipses />}
      </button>
    </div>
  );
};

export default FloatingChatbot;
