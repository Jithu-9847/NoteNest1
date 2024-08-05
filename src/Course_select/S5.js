import React from 'react'
import { Link } from 'react-router-dom';
import './Course.css'
function S5() {
  const items = [
    { name: 'MSS', value: 'mss' },
    { name: 'SS', value: 'ss' },
    { name: 'MP&MC', value: 'mpmc' },
    { name: 'FLAT', value: 'flat' },
    { name: 'DM', value: 'dm' },
    { name: 'CM', value: 'cm' },
    { name: 'DBMS(LAB)', value: 'dbms-lab' },
    { name: 'SS&MP(LAB)', value: 'ss-mp-lab' },
  ];

  return (
    <div className="con">
      <div className="button-grid">
      {items.map((item) => (
        <Link key={item.value} to="/Files" state={{ value: item.name }}>
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