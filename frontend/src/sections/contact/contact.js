import React, { useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import "../../static/styles/contact.css";
import Footer from '../footer/footer';
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ChakraProvider, Text, Box, Icon, Spinner } from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const { t } = useTranslation();
    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        //const contactmessage = await axios.post('/contact')
        axios.post("http://localhost:4000/contact/create", {
            name,
            email,
            phone,
            message,
        })
            .then((res) => {
                if (name === "" || !email || !phone || !message) {
                    toast({
                        title: "Please Fill all the Feilds",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                    setIsLoading(false);
                } else {
                    toast({
                        title: "Message sent successfully! Thanks you",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                    });
                    setIsLoading(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                }

            })
            .catch((err) => {
                toast({
                    title: "Error Occured!",
                    description: err.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                });
                setIsLoading(false);
            });
    };

    return (
        <>
            <Header />
            <section className="page-section" id="contact">
                <div className="container">

                    <div className="row">
                        <div className=" tittle ">
                            <h2 className=" section-heading text-uppercase">{t('contactus')}</h2>
                            {/* <h3 className="section-subheading text-muted">Eye Bank Center</h3> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <form
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
                                                onChange={e => setName(e.target.value)}
                                                placeholder={t('name')}
                                                required
                                            />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder={t('email')}
                                                required
                                            />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                placeholder={t('phone')}
                                                required
                                            />
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                                placeholder={t("message")}
                                                required
                                            ></textarea>
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className='form-group text-center '>
                                            <button
                                                title='Sent your message'
                                                className="btn btn-primary btn-xl mr-8"
                                                disabled={isLoading} // Disable the button when loading is true
                                                type="submit"
                                            >
                                                {isLoading ? <Spinner
                                                    thickness='4px'
                                                    speed='0.65s'
                                                    emptyColor='gray.200'
                                                    color='blue.500'
                                                    size='md'
                                                /> : t('sendmessage')}
                                            </button>

                                        </div>
                                    </div>

                                    <div className=" contact  col-sm-7 col-md-4">
                                        <ChakraProvider className="space-y-5">
                                            <Box className='flex mt-4'>
                                                <PhoneIcon boxSize={7} color="slateblue" />
                                                <Box className='padding-0'>
                                                    <Text>{t('phone')}</Text>
                                                    <Text>+2519334657</Text>
                                                    <Text>+251933433333</Text>
                                                </Box>
                                            </Box>
                                            <Box className='flex mt-2'>
                                                <Icon as={EmailIcon} boxSize={7} color="slateblue" />
                                                <Box>
                                                    <Text>{t("email")}</Text>
                                                    <Text>eyebank@gmail.com</Text>

                                                </Box>
                                            </Box>
                                            <Box className='flex mt-2'>
                                                <Icon as={FaMapMarkerAlt} boxSize={7} color="slateblue" />
                                                <Box>
                                                    <Text>{t("Address")}</Text>
                                                    <Text>{t("MenelikHospital")}</Text>
                                                </Box>

                                            </Box>
                                        </ChakraProvider>
                                    </div>

                                    <div className='addresss col-lg-12'>
                                        <p> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.1392425087067!2d38.77300695560036!3d9.03834149774648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f796ed5bae9%3A0xecd4cddce9e2ba7e!2sMenelik%20II%20Referal%20Hospital!5e0!3m2!1sen!2set!4v1702593776903!5m2!1sen!2set" width="800" height="600" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Contact;