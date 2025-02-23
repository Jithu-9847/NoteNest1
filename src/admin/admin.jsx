import React, { useState, useEffect } from "react";
import { ref, remove, set } from "firebase/database";
import { getDocs, query, collection, where, deleteDoc, doc ,getDoc} from "firebase/firestore"; 
import { database, db } from "../firebase";

const AdminDashboard = () => {
  const [dataPath, setDataPath] = useState("");
  const [docPath, setDocPath] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifySecurityKey = async () => {
    const keyDocRef = doc(db, "admin", "securitykey");
    const keySnapshot = await getDoc(keyDocRef);
    if (keySnapshot.exists() && keySnapshot.data().key === securityKey) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Security Key");
      setIsAuthenticated(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-lg mx-auto bg-black text-green-400 rounded-xl shadow-md space-y-4 font-mono">
        <h2 className="text-xl font-bold text-green-500 border-b border-green-500 pb-2">Admin Authentication</h2>
        <input
          type="password"
          placeholder="Enter Security Key"
          value={securityKey}
          onChange={(e) => setSecurityKey(e.target.value)}
          className="border border-green-500 bg-gray-900 text-green-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={verifySecurityKey}
          className="bg-green-700 hover:bg-green-600 text-white p-2 w-full"
        >
          Verify Key
        </button>
      </div>
    );
  }

  const deleteRealtimeData = async () => {
    if (!dataPath) return alert("Enter a valid Realtime DB path");
    await remove(ref(database,'messages'));
    alert("Realtime DB data deleted");
  };

  const deleteFirestoreData = async () => {
    if (!docPath) return alert("Enter a valid Firestore document path");

    const q = query(collection(db, "snippets"), where("name", "==", docPath));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        return alert("No document found with the given name");
    }

    querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "snippets", document.id));
    });

    alert("Firestore document deleted");
};


  const shutdownWebsite = async () => {
    await set(ref(database, "shutdown"), { status: true });
    alert("Website shutdown triggered");
  };

  const wakeWebsite = async () => {
    await set(ref(database, "shutdown"), { status: false });
    alert("Website wake up triggered");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-black text-green-400 rounded-xl shadow-md space-y-4 font-mono">
      <h2 className="text-xl font-bold text-green-500 border-b border-green-500 pb-2">Admin Dashboard</h2>
      <div>
         
        <button
          onClick={deleteRealtimeData}
          className="bg-red-700 hover:bg-red-600 text-white p-2 mt-2 w-full"
        >
          clear Snippet chat messages !
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Snippet Name"
          value={docPath}
          onChange={(e) => setDocPath(e.target.value)}
          className="border border-green-500 bg-gray-900 text-green-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={deleteFirestoreData}
          className="bg-red-700 hover:bg-red-600 text-white p-2 mt-2 w-full"
        >
          Delete Snippet
        </button>
      </div>
      <button
        onClick={shutdownWebsite}
        className="bg-green-700 hover:bg-green-600 text-white p-2 w-full"
      >
        Shutdown Website
      </button>
      <button
        onClick={wakeWebsite}
        className="bg-green-700 hover:bg-green-600 text-white p-2 w-full"
      >
        wake up Website
      </button>
    </div>
  );
};

export default AdminDashboard;
