import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Import Firebase services
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './upload.css';
import BottomPage from '../bottom_page/BottomPage';
import { normalize } from 'gsap';

function Upload() {
  const [file, setFile] = useState(null);
  const [noteType, setNoteType] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [isOwnNote, setIsOwnNote] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFile(event.dataTransfer.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async () => {
    if (file && noteType && courseCode && isOwnNote) {
      setIsUploading(true);

      try {
        // Upload file to Firebase Storage
        const storageRef = ref(storage, `${courseCode}/${noteType}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
          (snapshot) => {
            // Calculate and update progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          }, 
          (error) => {
            console.error('Error uploading file: ', error);
            alert('Failed to upload file.');
            setIsUploading(false);
          }, 
          async () => {
            // Get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Save metadata to Firestore
            await addDoc(collection(db, `lists/${courseCode}/${noteType}`), {
              title: file.name,
              noteType,
              courseCode,
              isOwnNote,
              downloadURL,
              downloads: 0, 
            });

            
            handleCancel();  
            setIsUploading(false);
          }
        );
      } catch (error) {
        console.error('Error uploading file: ', error);
        alert('Failed to upload file.');
        setIsUploading(false);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleCancel = () => {
    setFile(null);
    setNoteType('');
    setCourseCode('');
    setIsOwnNote('');
    setUploadProgress(0);
  };

  return (
    <div className="main_upload_con">
      <div className="up_con">
        <main>
          <section className="upload-section">
            <h2>Upload your notes</h2>
            <div
              className="upload-box"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleUploadClick}
            >
              {file ? (
                <p>{file.name}</p>
              ) : (
                <>
                  <p>Drag and drop your notes</p>
                  <p>We support PDF, images, and text files</p>
                  <button type="button">Browse files</button>
                  <input
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </>
              )}
            </div>
          </section>
          <section className="note-details-section">
            <h2>About the Note</h2>
            <div className="note-type">
              <label htmlFor="noteType">Select the Category:</label>
              <select
                id="noteType"
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="note">Note</option>
                <option value="qp">QP</option>
                <option value="solved-qp">Solved QP</option>
                <option value="other-note">Other Note</option>
              </select>
            </div>
            <div className="course-code">
              <label htmlFor="courseCode">Course Code:</label>
              <select
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
              >
                <option value="">Select a course</option>
                <option value="FLAT">FLAT</option>
                <option value="MSS">MSS</option>
                <option value="SS">SS</option>
                <option value="DM">DM</option>
                <option value="MP&MC">MP&MC</option>
                <option value="SS&MP">SS&MP(LAB)</option>
                <option value="DBMS">DBMS(LAB)</option>
                {/* Add more course options as needed */}
              </select>
            </div>
            <div className="own-note">
              <label htmlFor="isOwnNote">Are these your own notes?</label>
              <select
                id="isOwnNote"
                value={isOwnNote}
                onChange={(e) => setIsOwnNote(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </section>
          <div className="buttons">
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" onClick={handleSubmit} disabled={isUploading}>
              {isUploading ? `Uploading... ${uploadProgress.toFixed(0)}%` : 'Submit'}
            </button>
          </div>
        </main>
      </div>
      {/* <BottomPage/> */}
    </div>
  );
}

export default Upload;
