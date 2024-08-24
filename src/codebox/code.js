import React, { useState, useEffect } from 'react';
import './code.css';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

function Code() {
  const [snippets, setSnippets] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [notification, setNotification] = useState(null); // Notification state
  const [error, setError] = useState(null); 
  const [save,setSave]=useState("save")
  const [is_enable,setEnable]=useState(false)

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'snippets'));
        const snippetsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSnippets(snippetsList);
      } catch (error) {
        console.error("Error fetching snippets: ", error);
        setError("Error fetching snippets. Please try again.");
      }
    };

    fetchSnippets();
  }, []);

  const handleSave = async () => {
    setSave("Saving please wait...")
    setEnable(true)
    if (name && content) {
      try {
        const newSnippet = { name, content, access: 'public', timestamp: new Date() };
        // Check if there are already 10 snippets
        if (snippets.length > 9) {
          const oldestSnippet = snippets[0];
          await deleteDoc(doc(db, 'snippets', oldestSnippet.id));
          setSnippets(snippets.slice(1));
        }
        const docRef = await addDoc(collection(db, 'snippets'), newSnippet);
        setSnippets([...snippets, { id: docRef.id, ...newSnippet }]);
        setName('');
        setContent('');
        setNotification('Code saved successfully!');
        setSave("save")
        setEnable(false)
        setError(null);

        setTimeout(() => {
          setNotification(null);
        }, 3000); // Hide notification after 3 seconds
      } catch (error) {
        console.error("Error saving document: ", error);
        setError('Failed to save snippet. Please try again.');
      }
    } else {
      setError('Please provide a title and content before saving.');
    }

    setTimeout(() => {
      setError(null);
    }, 3000); // Hide error after 3 seconds
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const handleTitleClick = (snippet) => {
    setSelectedSnippet(snippet);
  };

  return (
    <div className="code-container">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <main>
        <div className="new-paste">
          <h2>New Paste</h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your code here..."
          ></textarea>
          <div className="optional-settings">
            <label>
              Title
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Paste Title"
              />
            </label>
            <label>
              Syntax Highlighting
              <select>
                <option value="plaintext">Plaintext</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <label>
              Paste Expiration
              <select>
                <option value="never">Never</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <button onClick={handleSave} disabled={is_enable}>{save}</button>
            <h4 style={{color:"orange", visibility: 0.8}}>
              Note: You can only access the latest 10 pastes. After reaching this limit, old pastes will be deleted.
            </h4>
          </div>
        </div>
        <div className="recent-pastes">
          <h3>Recent Pastes</h3>
          <ul>
            {snippets.map((snippet) => (
              <li key={snippet.id}>
                <h4 onClick={() => handleTitleClick(snippet)}>
                  {snippet.name || 'Untitled'}
                </h4>
                <button onClick={() => handleCopy(snippet.content)} className='cpy_btn'>Copy</button>
              </li>
            ))}
          </ul>
        </div>
        {selectedSnippet && (
          <div className="selected-snippet">
            <h3>{selectedSnippet.name || 'Untitled'}</h3>
            <textarea
              value={selectedSnippet.content}
              readOnly
            ></textarea>
          </div>
        )}
      </main>
    </div>
  );
}

export default Code;
