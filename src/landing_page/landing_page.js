import React from 'react';
import { Link } from 'react-router-dom';
import './landing_page.css';

function LandingPage() {
  return (
    <div className='container'>
      <div className='content'>
        <h1 className='land_head animate-heading'>NOTE NEST</h1>
        <h3 className='animate-subheading1'>Short on time, long on goals? Note Nest:</h3>
        <h3 className='animate-subheading2'>Download notes, connect with classmates, and ace your exams!</h3>
        <div className='btns animate-buttons'>
          <Link to="/Contribute" className='button-link'><button>Contribute</button></Link>
          <Link to="/Notes" className='button-link'><button>Get Notes</button></Link>
        </div>
      </div>
      <div className='edu_vector'></div>
    </div>
  );
}

export default LandingPage;
