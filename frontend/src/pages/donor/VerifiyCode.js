import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const VerifiyCode = () => {
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
 const toast = useToast(); 
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/donor/verify-code", {mobile, code });

      if (response.data.message === "Verification successful") {
        // setVerificationMessage("Verification successful");
        // Display success toast
        toast({
          title: "Verification successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
          
      } else {
        //   setVerificationMessage("Invalid verification code");
           toast({
             title: "Invalid verification code",
             status: "error",
             duration: 5000,
             isClosable: true,
             position: "top",
           });
      }
    } catch (error) {
      console.error(error);
     toast({
       title: error.message,
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "top",
     });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
      {verificationMessage && <p>{verificationMessage}</p>}
    </div>
  );
};

export default VerifiyCode;