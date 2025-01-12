import { useState, useEffect } from 'react';
import './App.css';
import FilePage from './File_Page/FilePage';
import BottomPage from './bottom_page/BottomPage';
import LandingPage from './landing_page/landing_page';
import NavBar from './navbar/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Upload from './upload/Upload';
import S5 from './Course_select/S5';
import Code from './codebox/code';
import SplashPage from './splash_page/Splash';
import AboutUs from './aboutus/AboutUs';
import ContactUs from './contactus/ContactUs';
import TermsOfUse from './term_and_privacy/term';
import PrivacyPolicy from './term_and_privacy/privacy';
import RealtimeChatApp from './chat/chat';
import SplashCursor from './cursor-animation/cursor';

function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Function to check the screen size
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Adjust this breakpoint as needed
    };

    // Check screen size on initial render
    checkScreenSize();

    // Add event listener to handle resizing
    window.addEventListener('resize', checkScreenSize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const Home = () => (
    <>
      {isDesktop && <SplashCursor />} {/* Render only on desktop */}
      <NavBar />
      <LandingPage />
      <BottomPage />
    </>
  );

  const Notes = () => (
    <>
      <NavBar />
      <S5 />
      <BottomPage />
    </>
  );

  const Files = () => (
    <>
      <NavBar />
      <FilePage />
      <BottomPage />
    </>
  );

  const Contribute = () => (
    <>
      <NavBar />
      <Upload />
      <BottomPage />
    </>
  );

  const FileNest = () => (
    <>
      <NavBar />
      <Code />
      <BottomPage />
    </>
  );

  const Aboutus = () => (
    <>
      <NavBar />
      <AboutUs />
      <BottomPage />
    </>
  );

  const Contactus = () => (
    <>
      <NavBar />
      <ContactUs />
      <BottomPage />
    </>
  );

  const Chat = () => (
    <>
      <NavBar />
      <RealtimeChatApp />
      <BottomPage />
    </>
  );

  const Privacypolicy = () => (
    <>
      <PrivacyPolicy />
    </>
  );

  const TermsUse = () => (
    <>
      <TermsOfUse />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/Contribute" element={<Contribute />} />
        <Route path="/FileNest" element={<FileNest />} />
        <Route path="/Files" element={<Files />} />
        <Route path="/TermsOfUse" element={<TermsUse />} />
        <Route path="/PrivacyPolicy" element={<Privacypolicy />} />
        <Route path="/Snippetchat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
