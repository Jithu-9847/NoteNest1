import React, { useState, useEffect, useRef } from "react";
import { ref, onValue, push, off, update } from "firebase/database";
import { database } from "../firebase"; // Ensure this points to your Firebase initialization file
import { FiSend, FiCopy } from "react-icons/fi"; // Import React Icon for sending and copying

const RealtimeChatApp = () => {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [newMessage, setNewMessage] = useState(""); // State for the input message
  const [senderName, setSenderName] = useState(""); // State for the sender's name
  const [longPressedMessageId, setLongPressedMessageId] = useState(null); // State to store the ID of the long-pressed message
  const [showConfirmation, setShowConfirmation] = useState(false); // State to show the confirmation dialog
  const [hasMounted, setHasMounted] = useState(false); // Track if the component has mounted

  const messagesEndRef = useRef(null); // Reference to the end of the message container
  const [pressTimer, setPressTimer] = useState(null); // Timer for detecting long press
  
  // Load sender's name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("senderName"); // Get the name from localStorage
    if (savedName) {
      setSenderName(savedName);
    }
    setHasMounted(true); // Set the mounted flag to true after the component mounts
  }, []);

  // Save sender's name to localStorage when it changes
  useEffect(() => {
    if (senderName.trim() !== "") {
      localStorage.setItem("senderName", senderName);
    }
  }, [senderName]);

  // Load messages in real-time when the component mounts
  useEffect(() => {
    const messagesRef = ref(database, "messages/");
    const listener = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (let id in data) {
        loadedMessages.push({ id, ...data[id] });
      }
      setMessages(loadedMessages);
    });

    // Cleanup listener on unmount
    return () => off(messagesRef);
  }, []);

  // Function to send a new message to Firebase
  const sendMessage = () => {
    if (newMessage.trim() !== "" && senderName.trim() !== "") {
      const messagesRef = ref(database, "messages/");
      push(messagesRef, {
        text: newMessage,
        sender: senderName,
        timestamp: Date.now(),
      });
      setNewMessage(""); // Clear input field
    }
  };

  // Function to copy message to clipboard
  const copyMessage = (messageText) => {
    navigator.clipboard.writeText(messageText).then(() => {
      alert("Message copied to clipboard!");
    }).catch((err) => {
      console.error("Failed to copy message: ", err);
    });
  };

  // Function to "delete" the message by changing its content
  const deleteMessage = (messageId) => {
    const messageRef = ref(database, `messages/${messageId}`);
    update(messageRef, {
      text: "This message is deleted !",
    }).then(() => {
      console.log("Message updated to 'This is deleted!'");
    }).catch((err) => {
      console.error("Error updating message: ", err);
    });
    setLongPressedMessageId(null); // Reset the long-pressed message ID after deletion
    setShowConfirmation(false); // Close the confirmation dialog
  };

  // Handle long press to show confirmation
  const handleLongPress = (messageId) => {
    // Find the message by its ID and check if its text is not "This is deleted!"
    const message = messages.find((msg) => msg.id === messageId);
    
    if (message && message.text !== "This message is deleted !") {
      setPressTimer(
        setTimeout(() => {
          setLongPressedMessageId(messageId);
          setShowConfirmation(true); // Show the confirmation dialog
        }, 700) // 1 second hold
      );
    }
  };

  // Cancel long press if the user releases the mouse button or touch event
  const handlePressEnd = () => {
    clearTimeout(pressTimer);
  };

  // Handle cancel button for confirmation dialog
  const handleCancel = () => {
    setShowConfirmation(false); // Close the confirmation dialog without deleting
    setLongPressedMessageId(null); // Reset the long-pressed message ID
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6 text-center">Welcome to SnippetChat 😉</h1>
      <div className="w-full max-w-2xl mb-4">
        <input
          type="text"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          placeholder="Enter your name..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div
        className="w-full max-w-2xl h-96 overflow-y-auto bg-gray-800 rounded-lg p-6 shadow-xl mb-6"
        style={{
          scrollbarWidth: "thin", // Firefox
          scrollbarColor: "#4a5568 #2d3748", // Firefox
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="mb-4 flex justify-between items-start"
            onMouseDown={() => handleLongPress(msg.id)} // Detect long press
            onTouchStart={() => handleLongPress(msg.id)} // For touch devices
            onMouseUp={handlePressEnd} // Cancel long press on release
            onTouchEnd={handlePressEnd} // Cancel long press on touch end
          >
            <div className="flex-1">
              <textarea
                readOnly
                value={msg.text}
                className="bg-gray-700 p-4 rounded-lg w-full text-sm text-gray-300 resize-none focus:outline-none cursor-pointer"
                rows={Math.max(1, msg.text.split("\n").length)} // Adjust rows based on content
                style={{ height: "auto" }} // Adjust height dynamically
              />
              <small className="block text-xs text-gray-500 mt-2">
                <strong>{msg.sender || "Unknown"}:</strong> {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
            <button
              onClick={() => copyMessage(msg.text)}
              className="ml-4 text-gray-300 hover:text-gray-100"
            >
              <FiCopy size={20} />
            </button>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This is the ref to scroll to */}
      </div>
      <div className="w-full max-w-2xl flex">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-6 py-3 rounded-l-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="1"
        />
        <button
          onClick={hasMounted && senderName ? sendMessage : () => alert("Yo ! 😜 No ghosts allowed, show up first! 👻🚫")}
          className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FiSend size={20} />
        </button>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg">
            <p>Are you sure you want to delete this message?</p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => deleteMessage(longPressedMessageId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes, delete
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimeChatApp;
