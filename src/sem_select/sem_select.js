import React, { useState } from 'react';
import './sem_select.css';
import S1 from '../Course_select/S1';
import S2 from '../Course_select/S2';
import S3 from '../Course_select/S3';
import S4 from '../Course_select/S4';
import S5 from '../Course_select/S5';

function SemSelect() {
    const OnSelectMs="Select Your Subject!"
    const [state, setState] = useState([
        <>
            <div className="sem_row1">
                <button className="sem_btns" onClick={()=>{setState([<S1/>,OnSelectMs])}}>S1</button>
                <button className="sem_btns" onClick={()=>{setState([<S2/>,OnSelectMs])}}>S2</button>
                <button className="sem_btns" onClick={()=>{setState([<S3/>,OnSelectMs])}}>S3</button>
                <button className="sem_btns" onClick={()=>{setState([<S4/>,OnSelectMs])}}>S4</button>
            </div>
            <div className="sem_row2">
                <button className="sem_btns" onClick={()=>{setState([<S5/>,OnSelectMs])}}>S5</button>
                <button className="sem_btns">S6</button>
                <button className="sem_btns">S7</button>
                <button className="sem_btns">S8</button>
            </div>
        </>,"Select your Semester!"
    ]
    );

    

    return (
        <div className='sem_select_con'>
            <h3>{state[1]}</h3>
            {state[0]}
        </div>
    );
}

export default SemSelect;
