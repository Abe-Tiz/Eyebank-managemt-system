import { useTranslation } from "react-i18next";
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa';


const Clients = () => {
    const { t } = useTranslation();

    const Client = [
    {
      name: `{t("about:Yohannis")}`,
      image: "../images/Joye.jpg",
      role: `{t("about:medicalDirector")}`,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name: `{t("about:Amsalu")}`,
      image: "../images/Amsalu.jpg",
      role: `{t("about:labTechnician")}`,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name: `{t("about:Abebe")}`,
      image: "../images/Abebe.jpg",
      role: `{t("about:technicalManager")}`,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name: `{t("about:Tefera")}`,
      image: "../images/Tefera.jpg",
      role: `{t("about:councellor")}`,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name: `{t("about:Awoke")}`,
      image: "../images/Awoke.jpg",
      role: `{t("about:technicalManager")}`,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    {
      name: `{t("about:Lemlem")}`,
      image: "../images/Lemlem.jpg",
      role: `{t("about:labTechnician")}`,
      icon: [<FaFacebook />, <FaTwitter />, <FaTelegram />],
    },
    ];
    
    
    return Client;
   
}


export default Clients;
