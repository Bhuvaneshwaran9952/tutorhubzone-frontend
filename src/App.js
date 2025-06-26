import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../src/Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import Footer from "../src/Component/Footer/Footer";
import About from "./Component/About/About";
import TrainerCards from "./Component/TrainerCards/TrainerCards";
import Contact from './Component/Contact/Contact'
import BecomeTutor from "./Component/TrainerDetials/BecomeTutor";
import Signin from "./Component/TrainerDetials/Signin";
import SignUp from "./Component/TrainerDetials/SignUp";
import CreateProfile from "./Component/TrainerDetials/CreatProfile";
import Subject from "./Component/TrainerDetials/Subject";
import Skills from "./Component/TrainerDetials/Skiils";
import PreferredType from "./Component/TrainerDetials/PreferredType";
import Location from "./Component/TrainerDetials/Location";
import Rate from "./Component/TrainerDetials/Rate";
import TrainerContact from "./Component/TrainerDetials/TrainerContact";
import Submit from "./Component/TrainerDetials/Submit";
import ByIt from "./Component/TrainerDetials/ByIt"
import { TrainerFormProvider } from "./Component/TrainerDetials/TrainerFormContext";
import WhatsAppButton from "./WhatsApp";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <TrainerFormProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/trainers" element={<TrainerCards/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/trainerdetails" element={<BecomeTutor/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/create-profile" element={<CreateProfile/>}/> 
          <Route path="/create-profile/subject" element={<Subject/>}/>
          <Route path="/create-profile/skills" element={<Skills/>}/>
          <Route path="/create-profile/preferred-type" element={<PreferredType/>}/>
          <Route path="/create-profile/location" element={<Location />} />
          <Route path="/create-profile/rate" element={<Rate />} />
          <Route path="/create-profile/contact" element={<TrainerContact />} />
          <Route path="/create-profile/submit" element={<Submit />} />
          <Route path="/by-it" element={<ByIt/>}/>
        </Routes>
        </TrainerFormProvider>
        <WhatsAppButton/>
        <Footer />  
      </div>
    </BrowserRouter>
  );
}

export default App;
