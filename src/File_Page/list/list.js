import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path to where your firebase.js is
import { useLocation } from 'react-router-dom';

const List = () => {
  const location = useLocation();
  const value = location.state?.value;
  const [visibleItems, setVisibleItems] = useState(10);
  const [downloading, setDownloading] = useState(null);
  const [sortedLists, setSortedLists] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [noteType, setNoteType] = useState('note');
  const [showUnderline, setShowUnderline] = useState(0);
  const [loading, setLoading] = useState(false);

  let type=['note','qp','solved-qp','other-note'];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, `lists/${value}/${noteType}`));
        const dataArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });

        setSortedLists(dataArray);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [noteType, value]);

  const incrementDownloadCount = async (docId) => {
    const docRef = doc(db, `lists/${value}/${noteType}`, docId);
    try {
      await updateDoc(docRef, { downloads: increment(1) });
    } catch (error) {
      console.error('Error updating download count: ', error);
    }
  };

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const handleDownloadClick = async (list) => {
    setDownloading(list.id);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await incrementDownloadCount(list.id);

      const anchor = document.createElement('a');
      anchor.href = list.downloadURL;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      setDownloading(null);
    } catch (error) {
      console.error('Error during download: ', error);
      setDownloading(null);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);

    let sortedList = [...sortedLists];
    if (value === 'title') {
      sortedList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === 'downloads') {
      sortedList.sort((a, b) => b.downloads - a.downloads);
    }

    setSortedLists(sortedList);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTabClick = (index, type) => {
    setShowUnderline(index);
    setNoteType(type);
  };

  const filteredLists = sortedLists.filter((list) =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for notes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Header Tabs */}
      <div className="flex justify-around border-b border-gray-700 pb-2 mb-6">
        {['Notes', 'Question Papers', 'Solved QPs', 'Other Notes'].map((label, index) => (
          <button
            key={label}
            onClick={() => handleTabClick(index,type[index])}
            className={`text-lg font-medium transition ${
              showUnderline === index
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sorting Options */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">Sort by:</span>
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="p-2 rounded-lg bg-gray-800 text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="downloads">Most Downloads</option>
        </select>
      </div>

      {/* List Header */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg mb-4">
        <span className="font-bold text-gray-300">File Name</span>
        <span className="font-bold text-gray-300 text-center">Downloads</span>
        <span className="font-bold text-gray-300 text-right">Action</span>
      </div>

      {/* List Items */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
        </div>
      ) : filteredLists.length > 0 ? (
        filteredLists.slice(0, visibleItems).map((list) => (
          <div
            key={list.id}
            className="grid grid-cols-3 gap-4 p-4 bg-gray-800 rounded-lg mb-4"
          >
            <span className="truncate">{list.title}</span>
            <span className="text-center">{list.downloads}</span>
            <button
              className={`text-sm py-2 px-4 rounded-lg ${
                downloading === list.id
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-400 text-white'
              }`}
              onClick={() => handleDownloadClick(list)}
              disabled={downloading === list.id}
            >
              {downloading === list.id ? 'Downloading...' : 'Download'}
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No items to display</div>
      )}

      {/* Show More Button */}
      {visibleItems < filteredLists.length && (
        <button
          onClick={handleShowMore}
          className="self-center mt-6 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default List;
