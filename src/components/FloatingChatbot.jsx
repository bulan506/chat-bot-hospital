'use client';
import { useState, useRef, useEffect } from 'react';
import { IoSend, IoChatbubbleEllipses, IoClose } from 'react-icons/io5';
import styles from './FloatingChatbot.module.css';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de Tatooine Medical Center. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll al final de los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      // Simular respuesta del bot
      await new Promise(resolve => setTimeout(resolve, 1000));
      const botMessage = { 
        text: "Esta es una respuesta simulada. Conectaré con Dialogflow en el siguiente paso.", 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Lo siento, estoy teniendo problemas técnicos. Por favor intenta más tarde.", 
        sender: 'bot' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Ventana del chatbot */}
      {isOpen && (
        <div className={`${styles.chatbotWindow} ${styles.open}`}>
          {/* Header con botón de cerrar */}
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
          
          {/* Mensajes */}
          <div className={styles.chatbotMessages}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {msg.text}
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <IoSend />
            </button>
          </div>
          
          {/* Footer */}
          <div className={styles.chatbotFooter}>
            <p>Asistente virtual - No reemplaza asesoramiento médico profesional</p>
          </div>
        </div>
      )}

      {/* Botón flotante - Siempre visible */}
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