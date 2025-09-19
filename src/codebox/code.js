import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaSave, FaCopy, FaPlusCircle, FaClipboardList,FaTimes } from 'react-icons/fa';
import './code.css';

function Code() {
  const [snippets, setSnippets] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);
  const [save, setSave] = useState("save");
  const [is_enable, setEnable] = useState(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pastes'));
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
    setSave("Saving, please wait...");
    setEnable(true);
    if (name && content) {
      try {
        const newSnippet = { name, content, access: 'public', timestamp: new Date() };
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
        setSave("save");
        setEnable(false);
        setError(null);

        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } catch (error) {
        console.error("Error saving document: ", error);
        setError('Failed to save snippet. Please try again.');
      }
    } else {
      setError('Please provide a title and content before saving.');
    }

    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const handleTitleClick = (snippet) => {
    setSelectedSnippet(snippet);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      {notification && (
        <div className="bg-green-500 text-white p-2 rounded mb-4 w-full max-w-3xl">
          {notification}
        </div>
      )}
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4 w-full max-w-3xl">
          {error}
        </div>
      )}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* New Paste Section */}
        <div className="new-paste bg-gray-800 p-6 rounded-lg shadow-lg h-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaPlusCircle className="mr-2" /> New Paste
          </h2>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your code here..."
            className="w-full p-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
          ></textarea>
          <div className="optional-settings mt-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Paste Title"
              className="w-full p-2 mb-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
              onClick={handleSave}
              disabled={is_enable}
              className="w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 flex items-center justify-center"
            >
              <FaSave className="mr-2" /> {save}
            </button>
            <h4 className="text-orange-400 mt-4 text-sm">
              Note: You can only access the latest 10 pastes. After reaching this limit, old pastes will be deleted.
            </h4>
          </div>
        </div>

        {/* Recent Pastes Section */}
        <div className="recent-pastes bg-gray-800 p-6 rounded-lg shadow-lg h-[80vh] overflow-hidden overflow-y-scroll scroll-smooth">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FaClipboardList className="mr-2" /> Recent Pastes
          </h3>
          <ul className="space-y-4">
            {snippets
              .slice()
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by timestamp (newest first)
              .map((snippet) => (
                <li
                  key={snippet.id}
                  className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
                >
                  <h4
                    onClick={() => handleTitleClick(snippet)}
                    className="text-lg font-medium cursor-pointer hover:text-indigo-400"
                  >
                    {snippet.name || 'Untitled'}
                  </h4>
                  <button
                    onClick={() => handleCopy(snippet.content)}
                    className="text-indigo-400 hover:text-indigo-600 flex items-center"
                  >
                    <FaCopy className="mr-1" /> Copy
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </main>

      {/* Selected Snippet Display */}
      {selectedSnippet && (
        <div className="selected-snippet mt-6 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl scroll-smooth">
          <div className=' w-full flex justify-between items-center mb-5'>

          <h3 className="text-xl font-semibold">{selectedSnippet.name || 'Untitled'}</h3>
          <button onClick={()=>setSelectedSnippet(null)}><>

          <FaTimes/>

          </></button>
          </div>

          <textarea
            value={selectedSnippet.content}
            readOnly
            className="w-full p-4 bg-gray-700 text-white rounded-md focus:outline-none"
            rows={15}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default Code;