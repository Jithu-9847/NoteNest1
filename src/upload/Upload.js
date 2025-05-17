import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function Upload() {
  const [files, setFiles] = useState([]);
  const [noteType, setNoteType] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [isOwnNote, setIsOwnNote] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...event.dataTransfer.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async () => {
    if (files.length && noteType && courseCode && isOwnNote) {
      setIsUploading(true);
      let completed = 0;

      for (const file of files) {
        try {
          const storageRef = ref(storage, `${courseCode}/${noteType}/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              'state_changed',
              (snapshot) => {
                const progress = ((completed + snapshot.bytesTransferred / snapshot.totalBytes) / files.length) * 100;
                setUploadProgress(progress);
              },
              (error) => {
                console.error('Error uploading file: ', error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await addDoc(collection(db, `lists/${courseCode}/${noteType}`), {
                  title: file.name,
                  noteType,
                  courseCode,
                  isOwnNote,
                  downloadURL,
                  downloads: 0,
                });
                completed++;
                setUploadProgress((completed / files.length) * 100);
                resolve();
              }
            );
          });
        } catch (error) {
          alert('One or more files failed to upload.');
          setIsUploading(false);
          return;
        }
      }

      handleCancel();
      setIsUploading(false);
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleCancel = () => {
    setFiles([]);
    setNoteType('');
    setCourseCode('');
    setIsOwnNote('');
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-center">Upload Your Notes</h2>

        <div
          className="border-2 border-dashed border-gray-500 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-indigo-500"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleUploadClick}
        >
          {files.length ? (
            <ul className="text-gray-300 list-disc list-inside">
              {files.map((file, idx) => (
                <li key={idx}>{file.name}</li>
              ))}
            </ul>
          ) : (
            <>
              <p className="text-gray-400">Drag and drop your notes here</p>
              <p className="text-gray-400">Supports multiple PDFs, images, and text files</p>
              <button
                type="button"
                className="mt-4 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg"
              >
                Browse Files
              </button>
              <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="noteType" className="block text-gray-400 mb-2">
            Select the Category:
          </label>
          <select
            id="noteType"
            value={noteType}
            onChange={(e) => setNoteType(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-gray-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a category</option>
            <option value="note">Note</option>
            <option value="qp">QP</option>
            <option value="solved-qp">Solved QP</option>
            <option value="other-note">Other Note</option>
          </select>

          <label htmlFor="courseCode" className="block text-gray-400 mt-4 mb-2">
            Course Code:
          </label>
          <select
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-gray-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select a course</option>
            <option value="AAD">AAD</option>
            <option value="CCW">CCW</option>
            <option value="CD">CD</option>
            <option value="CG">CG</option>
            <option value="ELI">ELI</option>
            <option value="IE&FT">IE&FT</option>
            <option value="NW LAB">NW LAB</option>
          </select>

          <label htmlFor="isOwnNote" className="block text-gray-400 mt-4 mb-2">
            Are these your own notes?
          </label>
          <select
            id="isOwnNote"
            value={isOwnNote}
            onChange={(e) => setIsOwnNote(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-700 text-gray-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading}
            className={`px-4 py-2 rounded-lg text-white ${isUploading
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-400'
              }`}
          >
            {isUploading ? `Uploading... ${uploadProgress.toFixed(0)}%` : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Upload;
