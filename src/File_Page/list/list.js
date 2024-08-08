import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path to where your firebase.js is
import './list.css';
import BottomPage from '../../bottom_page/BottomPage';
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, `lists/${value}/${noteType}`));
        const dataArray = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });

        console.log('Fetched Data:', dataArray);
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
      await updateDoc(docRef, {
        downloads: increment(1)
      });
      console.log('Download count updated successfully');
    } catch (error) {
      console.error('Error updating download count: ', error);
    }
  };

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const handleDownloadClick = async (list) => {
    setDownloading(list.id);
    console.log(`Downloading item at index: ${list.id}`);

    try {
      // Simulate download time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Increase download count
      await incrementDownloadCount(list.id);

      const anchor = document.createElement('a');
      anchor.href = list.downloadURL;
      anchor.target = '_blank'; // Open in a new tab
      anchor.rel = 'noopener noreferrer'; // Security

      // Append to the body (necessary for Firefox)
      document.body.appendChild(anchor);

      // Trigger a click on the anchor element
      anchor.click();

      // Remove the anchor from the DOM
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
    <div className="list-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for note..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="header">
        <h3
          className={`header-item ${showUnderline === 0 ? 'show-underline' : ''}`}
          onClick={() => handleTabClick(0, 'note')}
        >
          Notes
        </h3>
        <h3
          className={`header-item ${showUnderline === 1 ? 'show-underline' : ''}`}
          onClick={() => handleTabClick(1, 'qp')}
        >
          Question Papers
        </h3>
        <h3
          className={`header-item ${showUnderline === 2 ? 'show-underline' : ''}`}
          onClick={() => handleTabClick(2, 'solved-qp')}
        >
          Solved QPs
        </h3>
        <h3
          className={`header-item ${showUnderline === 3 ? 'show-underline' : ''}`}
          onClick={() => handleTabClick(3, 'other-note')}
        >
          Other Notes
        </h3>
      </div>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          <div className="list-header">
            <span>File Name</span>
            <span>Total Downloads</span>
            <span>Download</span>
          </div>
          <div className="controls">
            <div className="sort-options">
              <label>Sort by: </label>
              <select value={sortOption} onChange={handleSortChange}>
                <option value="">None</option>
                <option value="title">Title</option>
                <option value="downloads">Most Downloads</option>
              </select>
            </div>
          </div>
          {filteredLists.length > 0 ? (
            filteredLists.slice(0, visibleItems).map((list, index) => (
              <div className="list-row slide-in" key={list.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="truncated-title">{list.title}</span>
                <span className='down'>{list.downloads}</span>
                <span>
                  <button
                    className={`download-btn ${downloading === list.id ? 'downloading' : ''}`}
                    onClick={() => handleDownloadClick(list)}
                    disabled={downloading === list.id}
                  >
                    {downloading === list.id ? 'Downloading...' : 'Download'}
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div className="no-items">There is nothing to show</div>
          )}
          {visibleItems < filteredLists.length && (
            <button className="show-more-btn" onClick={handleShowMore}>
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default List;
