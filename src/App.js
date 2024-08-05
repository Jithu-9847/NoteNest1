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

function App() {
  const Home = () => (
    <>
      <NavBar />
      <LandingPage />
 
      <BottomPage/>
    </>
  );

  const Notes = () => (
    <>
      <NavBar />
      <S5></S5>
      <BottomPage/>
    </>
  );

  const Files = () => (
    <>
      <NavBar />
      <FilePage/>
      <BottomPage/>
    </>
  );

  const Contribute = () => (
    <>
      <NavBar />
       <Upload/>
      <BottomPage/>
    </>
  );

  const FileNest = () => (
    <>
      <NavBar />
      <Code/>
       <BottomPage/>
    </>
  );

  const Aboutus = () => (
    <>
      <NavBar />
      <AboutUs/>
       <BottomPage/>
    </>
  );
  const Contactus = () => (
    <>
      <NavBar />
      <ContactUs/>
       <BottomPage/>
    </>
  );
  return (
    <Router>
      <Routes>
         
        <Route path="/" element={<Home />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/Aboutus" element={<Aboutus/>} />
        <Route path="/Contactus" element={<Contactus/>} />
        <Route path="/Contribute" element={<Contribute />} />
        <Route path="/FileNest" element={<FileNest />} />
        <Route path="/Files" element={<Files />} />
      </Routes>
    </Router>
  );
}

export default App;
