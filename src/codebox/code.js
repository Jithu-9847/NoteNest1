import React, { useState, useEffect } from 'react';
import './code.css';
import { db } from '../firebase'; // Ensure this path is correct
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

function Code() {
  const [snippets, setSnippets] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'snippets'));
        const snippetsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSnippets(snippetsList);
      } catch (error) {
        console.error("Error fetching snippets: ", error);
      }
    };

    fetchSnippets();
  }, []);

  const handleSave = async () => {
    if (name && content) {
      try {
        const newSnippet = { name, content, access: 'public', timestamp: new Date() }; // Add timestamp field
        // Check if there are already 3 snippets
        if (snippets.length > 9) {
          // Delete the oldest snippet
          const oldestSnippet = snippets[0]; // The first one is the oldest due to sorting
          await deleteDoc(doc(db, 'snippets', oldestSnippet.id));
          // Remove the deleted snippet from local state
          setSnippets(snippets.slice(1));
        }
        // Add the new snippet
        const docRef = await addDoc(collection(db, 'snippets'), newSnippet);
        setSnippets([...snippets, { id: docRef.id, ...newSnippet }]);
        setName('');
        setContent('');
      } catch (error) {
        console.error("Error saving document: ", error);
      }
    } else {
      alert('Please provide a title and content before saving.');
    }
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
            <button onClick={handleSave}>Save</button>
             <h4 style={{color:"orange",visibility:0.8}}>Note:You can only access the latest 10 pastes. After reaching this limit, old pastes will be deleted.</h4>
          </div>
        </div>
        <div className="recent-pastes">
          <h3>Recent Pastes</h3>
          <ul>
            {snippets.map((snippet) => (
              <li key={snippet.id}>
                <h4>
                  {snippet.name || 'Untitled'}
                </h4>
                <button onClick={() => handleCopy(snippet.content)}>Copy</button>
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
