import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import tutorhubLogo from "./assets/img/TutorHubZone.png";

const WhatsAppButton = () => {
  return (
    <FloatingWhatsApp
      phoneNumber="+91 8946004709"
      accountName="TutorHubZone"
      chatMessage="Hi 👋, how can we help you?"
      placeholder="Type your message here..."
      avatar={tutorhubLogo} 
    />
  );
};

export default WhatsAppButton;
