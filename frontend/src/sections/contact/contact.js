import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import axios from "axios";
import Header from "../header/Header";
import "../../static/styles/contact.css";
import Footer from "../footer/footer";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ChakraProvider, Text, Box, Icon, Spinner } from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const { t } = useTranslation();
    const [showNameWarning, setShowNameWarning] = useState(false);
    const [showEmailWarning, setShowEmailWarning] = useState(false);
    const [showPhoneWarning, setShowPhoneWarning] = useState(false);
    const [showMessageWarning, setShowMessageWarning] = useState(false);
    const form = useRef();
    const handleNameChange = (event) => {
        const inputValue = event.target.value;
        const isValid = /^[A-Za-z]+$/.test(inputValue); // Only allow letters
        setName(inputValue);
        if (inputValue.trim() === '' || !isValid) {
            setShowNameWarning(true);
        } else {
            setShowNameWarning(false);
        }
    }
    
    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue); // Email validation regex

        setEmail(inputValue);

        if (inputValue.trim() === '' || !isValid) {
            setShowEmailWarning(true);
        } else {
            setShowEmailWarning(false);
        }
    };
    const handlePhoneChange = (event) => {
        const inputValue = event.target.value;
        const isValid = /^\d{10}$/.test(inputValue); // Only allow 10-digit numbers

        setPhone(inputValue);

        if (inputValue.trim() === '' || !isValid) {
            setShowPhoneWarning(true);
        } else {
            setShowPhoneWarning(false);
        }
    };
    const handleMessageChange = (event) => {
        const inputValue = event.target.value;
        const wordCount = inputValue.trim().split(/\s+/).length;

        setMessage(inputValue);

        if (inputValue.trim() === '' || wordCount > 100) {
            setShowMessageWarning(true);
        } else {
            setShowMessageWarning(false);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        emailjs.sendForm('service_0a0l7kp', 'template_orivcky', form.current, 'k0FfFK_lalSy7U739')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <>
            {/* <Header /> */}
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="row">
                        <div className=" tittle ">
                            <h2 className=" section-heading text-uppercase">
                                {t("contact:contactus")}

                            </h2>
                            {/* <h3 className="section-subheading text-muted">Eye Bank Center</h3> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form ref={form}
                                id="contactForm"
                                name="contactForm"
                                onSubmit={handleSubmit}
                                noValidate
                            >
                                <div className="inputForm row">
                                    <div className="col-sm-6 col-md-8 ">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={name}
                                                onChange={handleNameChange}
                                                placeholder={t("contact:name")}
                                                required
                                            />
                                            {showNameWarning && <div className="warning text-danger">{t("contact:invalidname")}</div>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder={t("contact:email")}
                                                required
                                            />
                                            {showEmailWarning && <div className="warning text-danger">{t("contact:invalidemail")}</div>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={phone}
                                                onChange={handlePhoneChange}
                                                placeholder={t("contact:phone")}
                                                required
                                            />
                                            {showPhoneWarning && <div className="warning text-danger">{t("contact:invalidphone")}</div>}
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                value={message}
                                                onChange={handleMessageChange}
                                                placeholder={t("contact:message")}

                                                required
                                            ></textarea>
                                            {showMessageWarning && <div className="warning">{t("contact:invalidmessage")}</div>}
                                        </div>
                                        <div className="form-group text-center ">
                                            <button
                                                title="Sent your message"
                                                className="btn btn-primary btn-xl mr-8"
                                                disabled={isLoading} // Disable the button when loading is true
                                                type="submit"
                                            >
                                                {isLoading ? (
                                                    <Spinner
                                                        thickness="4px"
                                                        speed="0.65s"
                                                        emptyColor="gray.200"
                                                        color="blue.500"
                                                        size="md"
                                                    />
                                                ) : (
                                                    t("contact:sendmessage")
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className=" contact  col-sm-7 col-md-4">
                                        <ChakraProvider className="space-y-5">
                                            <Box className="flex mt-4">
                                                <PhoneIcon boxSize={7} color="slateblue" />
                                                <Box className="padding-0">
                                                    <Text>{t("contact:phone")}</Text>
                                                    <Text>+2519334657</Text>
                                                    <Text>+251933433333</Text>
                                                </Box>
                                            </Box>
                                            <Box className="flex mt-2">
                                                <Icon as={EmailIcon} boxSize={7} color="slateblue" />
                                                <Box>
                                                    <Text>{t("contact:email")}</Text>
                                                    <Text>eyebank@gmail.com</Text>
                                                </Box>
                                            </Box>
                                            <Box className="flex mt-2">
                                                <Icon
                                                    as={FaMapMarkerAlt}
                                                    boxSize={7}
                                                    color="slateblue"
                                                />
                                                <Box>
                                                    <Text>{t("contact:Address")}</Text>
                                                    <Text>{t("contact:MenelikHospital")}</Text>
                                                </Box>
                                            </Box>
                                        </ChakraProvider>
                                    </div>

                                    <div className="addresss col-lg-12">
                                        <p>
                                            {" "}
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.1392425087067!2d38.77300695560036!3d9.03834149774648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f796ed5bae9%3A0xecd4cddce9e2ba7e!2sMenelik%20II%20Referal%20Hospital!5e0!3m2!1sen!2set!4v1702593776903!5m2!1sen!2set"
                                                width="800"
                                                height="600"
                                                style={{ border: 0 }}
                                                allowfullscreen=""
                                                loading="lazy"
                                                referrerpolicy="no-referrer-when-downgrade"
                                            ></iframe>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </section >

            {/* <Footer /> */}
        </>
    );
};

export default Contact;
