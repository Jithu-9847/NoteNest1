import React from 'react'
import { Link } from 'react-router-dom';
import './Course.css'
function S5() {
  const items = [
    { name: 'MSS', value: 'MSS' },
    { name: 'SS', value: 'SS' },
    { name: 'MP&MC', value: 'MPMC' },
    { name: 'FLAT', value: 'FLAT' },
    { name: 'DM', value: 'DM' },
    { name: 'CN', value: 'CN' },
    { name: 'DBMS(LAB)', value: 'DBMS' },
    { name: 'SS&MP(LAB)', value: 'SS-MP' },
  ];

  return (
    <div className="con">
      <div className="button-grid">
      {items.map((item) => (
        <Link key={item.name} to="/Files" state={{ value: item.value }}>
          <button className={`grid-button ${item.value.includes('lab') ? 'lab_btn' : ''}`}>
            {item.name}
          </button>
        </Link>
      ))}
     </div>
     <div className="Notification">
      
     </div>
    </div>

  );
}

export default S5