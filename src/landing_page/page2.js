import React from 'react'
import "./page.css"
import Aim from "./Aim.svg"
import download from "./Downloading-documents.svg"
import upload from "./uploading.svg"
import share from "./sharing.svg"
function Page2() {
  return (
    <div className='page2'>
      <div className="card1">
        <img src={Aim} alt="" />
        <h4>Headings must have content and the content must be accessible by a screen reader</h4>
      </div>

      <div className="card2">
        <img src={download} alt="" />
        <h4>Headings must have content and the content must be accessible by a screen reader</ h4>
      </div>

      <div className="card1">
        <img src={upload} alt="" />
        <h4>Headings must have content and the content must be accessible by a screen reader</ h4>
      </div>

      <div className="card2 share">
        <img src={share} alt="" />
        <h4>Headings must have content and the content must be accessible by a screen reader</h4>
      </div>
    </div>
  )
}

export default Page2
