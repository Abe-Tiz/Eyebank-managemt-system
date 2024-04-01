import React, { useState } from "react";
import axios  from 'axios';
import { useToast } from "@chakra-ui/react";
import { useTranslation } from 'react-i18next';
import ButtonComponent from './../../../components/ButtonComponent';

const ActivateAccount = () => {
    const [email,setEmail] = useState()

    const { t } = useTranslation();
    const toast = useToast();
   
     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         const response = await axios.post(
           "http://localhost:4000/user/activate",
           {
             email
           }
         );
         const data = response.data;
        //    console.log(data.message);
            toast({
              title:data.message,
              //    description: error.response.message,
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
       } catch (error) {
         if (error.response) {
           if (
             error.response.status === 500 
           ) {
             toast({
               title:error.response.data.message,
            //    description: "Please check your email and try again.",
               status: "warning",
               duration: 5000,
               isClosable: true,
               position: "top",
             });
             }  
             
             toast({
               title: error.response.message,
            //    description: error.response.message,
               status: "error",
               duration: 5000,
               isClosable: true,
               position: "top",
             });
         } else {
        //    console.log(error.message);
           toast({
             title: "Error Occurred!",
             description: error.message,
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
         }
       }
     };


  return (
    <>
      <div className="signup__container container">
        <div className="login-form m-10">
          <h3 className="title text-2xl md:text-3xl font-semibold text-gray-800">
                      {/* {t("login:loginLabel")} */}
                      Activate User Account
          </h3>

          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 mt-4">
                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {t("login:labelLoginEmail")}
                    <span class="text-red-500">*</span>
                  </label>

                  <div className="flex flex-col items-start">
                    <input
                      name="email"
                      type="email"
                      className="block w-full  border-2 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder-gray-300 focus:border-purple-500 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 [&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400 valid:[&:not(:placeholder-shown)]:border-green-500"
                      autoComplete="off"
                      required
                      pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      placeholder={t("common:emailPlaceholderLabel")}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <span className="mt-1 hidden text-sm text-red-400">
                      {t("login:labelErrorEmail")}
                    </span>
                  </div>
                </div>
                  <ButtonComponent title="Activate" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivateAccount
