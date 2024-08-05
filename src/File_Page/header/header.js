import React, { useState } from 'react';
import './header.css';

function Header() {
    const [showUnderline, setShowUnderline] = useState(2); // State to track which header item is clicked

    // Function to handle click and toggle underline visibility
    const handleClick = (index) => {
        setShowUnderline(index === showUnderline ? null : index); // Toggle showUnderline state
    };

    return (
        <div className='header'>
            <h3 className={`header-item ${showUnderline === 0 ? 'show-underline' : ''}`} onClick={() => handleClick(0)}>Notes</h3>
            <h3 className={`header-item ${showUnderline === 1 ? 'show-underline' : ''}`} onClick={() => handleClick(1)}>Question paper</h3>
            <h3 className={`header-item ${showUnderline === 2 ? 'show-underline' : ''}`} onClick={() => handleClick(2)}>Solved QP</h3>
            <h3 className={`header-item ${showUnderline === 3 ? 'show-underline' : ''}`} onClick={() => handleClick(3)}>Other Notes</h3>
        </div>
    );
}

export default Header;
