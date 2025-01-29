// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { text: input, sender: "user" }];
//     setMessages(newMessages);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await axios.post("http://localhost:5000/chat", {
//         message: input,
//       });

//       setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages([...newMessages, { text: "Error: Could not reach server.", sender: "bot" }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Chat with DeepSeek LLM</h2>
      
//       <div style={styles.chatBox}>
//         {messages.map((msg, index) => (
//           <div key={index} style={{ ...styles.message, textAlign: msg.sender === "user" ? "right" : "left" }}>
//             <b>{msg.sender === "user" ? "You:" : "Bot:"}</b> {msg.text}
//           </div>
//         ))}
//         {loading && <p style={styles.loading}>Bot is thinking...</p>}
//       </div>

//       <div style={styles.inputContainer}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//           style={styles.input}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage} style={styles.button} disabled={loading}>
//           {loading ? "..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { maxWidth: "600px", margin: "50px auto", textAlign: "center" },
//   title: { marginBottom: "20px" },
//   chatBox: { height: "300px", overflowY: "auto", border: "1px solid gray", padding: "10px", borderRadius: "8px" },
//   message: { margin: "10px", padding: "8px", borderRadius: "6px", background: "#f1f1f1" },
//   inputContainer: { display: "flex", marginTop: "10px" },
//   input: { flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid gray" },
//   button: { padding: "10px", marginLeft: "10px", borderRadius: "6px", cursor: "pointer", background: "blue", color: "white" },
//   loading: { fontStyle: "italic", color: "gray" },
// };

// export default App;
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      //console.log(newMessages);
      const response = await axios.post("http://localhost:5000/chat", {
        history: newMessages, // ✅ Send full history
      });

      setMessages([...newMessages, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { text: "Error: Could not reach server.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chat with DeepSeek LLM</h2>
      
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={{ ...styles.message, textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender === "user" ? "You:" : "Bot:"}</b> {msg.text}
          </div>
        ))}
        {loading && <p style={styles.loading}>Bot is thinking...</p>}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          style={styles.input}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={styles.button} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: "600px", margin: "50px auto", textAlign: "center" },
  title: { marginBottom: "20px" },
  chatBox: { height: "300px", overflowY: "auto", border: "1px solid gray", padding: "10px", borderRadius: "8px" },
  message: { margin: "10px", padding: "8px", borderRadius: "6px", background: "#f1f1f1" },
  inputContainer: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid gray" },
  button: { padding: "10px", marginLeft: "10px", borderRadius: "6px", cursor: "pointer", background: "blue", color: "white" },
  loading: { fontStyle: "italic", color: "gray" },
};

export default App;
