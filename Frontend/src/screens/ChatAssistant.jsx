// src/screens/ChatAssistant.js
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const ChatAssistant = ({ dashboardData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi Miraj! I'm Capital AI. I have access to your live dashboard. Ask me about your balance, spending, or savings goals!", 
      sender: 'bot' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // --- THE LOGIC BRAIN (No Backend Required) ---
  const processQuery = (query) => {
    const q = query.toLowerCase();
    
    // 1. Balance & Money Queries
    if (q.includes('balance') || q.includes('total') || q.includes('money')) {
      return `Your current total balance is ₹${dashboardData.balance.toLocaleString()}. You are up 12.5% from last month!`;
    }
    
    // 2. Spending Queries
    if (q.includes('spend') || q.includes('expense') || q.includes('cost')) {
      return `You have spent ₹${dashboardData.monthlySpend.toLocaleString()} this month. The biggest category is usually 'Salaries' or 'Operations' based on your charts.`;
    }

    // 3. Goal Queries
    if (q.includes('goal') || q.includes('save') || q.includes('target')) {
      return "You have 3 active goals. 'MacBook Pro M3' needs more funds to stay on track. I recommend adding ₹500 more this month.";
    }

    // 4. Investment Advice
    if (q.includes('invest') || q.includes('sip') || q.includes('market')) {
      return "Based on your surplus cash flow, I recommend starting a ₹5,000 SIP in a Nifty 50 Index Fund. Check the 'Investing' tab for projections.";
    }

    // 5. Greetings / General
    if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
      return "Hello! I'm ready to analyze your finances. Try asking: 'What is my balance?' or 'How much did I spend?'";
    }

    // Default Fallback
    return "I am tuned to analyze your dashboard data. Try asking specific questions like 'What is my balance?' or 'Show me my expenses'.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // 2. Simulate AI "Thinking" Delay (makes it feel real)
    setTimeout(() => {
      const responseText = processQuery(userMsg.text);
      const botMsg = { id: Date.now() + 1, text: responseText, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800); // 0.8 second delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.fab}
      >
        {isOpen ? <X size={24} color="white" /> : <MessageSquare size={24} color="white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <div style={styles.botIcon}>
                    <Bot size={20} color="white" />
                </div>
                <div>
                    <h4 style={{margin:0, fontSize:'16px', color:'white'}}>Capital AI</h4>
                    <span style={{fontSize:'11px', color:'rgba(255,255,255,0.7)'}}>• Online</span>
                </div>
            </div>
          </div>

          {/* Messages Area */}
          <div style={styles.messageArea}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                style={{
                  ...styles.messageRow,
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                {msg.sender === 'bot' && <div style={styles.tinyIcon}><Bot size={14} color="white" /></div>}
                
                <div style={msg.sender === 'user' ? styles.userBubble : styles.botBubble}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
                <div style={{...styles.messageRow, justifyContent: 'flex-start'}}>
                    <div style={styles.tinyIcon}><Bot size={14} color="white" /></div>
                    <div style={{...styles.botBubble, fontStyle:'italic', color:'#9CA3AF'}}>Typing...</div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={styles.inputArea}>
            <input 
              style={styles.input} 
              placeholder="Ask about your finances..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button style={styles.sendBtn} onClick={handleSend}>
              <Send size={18} color="white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  fab: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#111827', // Black/Dark Theme
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    zIndex: 2000, // Very high z-index to sit on top of everything
    transition: 'transform 0.2s',
  },
  chatWindow: {
    position: 'fixed',
    bottom: '100px',
    right: '30px',
    width: '360px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 2000,
    border: '1px solid #E5E7EB',
  },
  header: {
    backgroundColor: '#111827',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#2563EB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageArea: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#F9FAFB',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  messageRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-end',
  },
  tinyIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  botBubble: {
    backgroundColor: 'white',
    padding: '12px 16px',
    borderRadius: '12px 12px 12px 2px',
    fontSize: '14px',
    color: '#374151',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    border: '1px solid #E5E7EB',
    maxWidth: '85%',
    lineHeight: '1.5',
  },
  userBubble: {
    backgroundColor: '#2563EB',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '12px 12px 2px 12px',
    fontSize: '14px',
    maxWidth: '85%',
    lineHeight: '1.5',
    boxShadow: '0 1px 2px rgba(37, 99, 235, 0.3)',
  },
  inputArea: {
    padding: '16px',
    borderTop: '1px solid #E5E7EB',
    display: 'flex',
    gap: '10px',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '24px',
    border: '1px solid #D1D5DB',
    outline: 'none',
    fontSize: '14px',
    backgroundColor: '#F9FAFB',
  },
  sendBtn: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#111827',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};

export default ChatAssistant;