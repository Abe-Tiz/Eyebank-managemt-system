import React, { useEffect } from 'react'
import { useToast } from "@chakra-ui/react";
import axios  from 'axios';
import { useParams } from 'react-router-dom';
import Card from '../../components/PrintCard';
import { useState } from 'react';
 
const PrintCard = () => {
    const toast = useToast();
  const { id } = useParams();
  
  
    
    useEffect(() => {
      const fetchDonor = async () => {
        try {
          const res = await axios.get(`https://eyebank-backend-2.onrender.com/donor/${id}`);
          console.log(res);
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      };
      fetchDonor();
    }, []);
     
    
  return (
    <div className="m-4 min-h-screen flex items-center justify-center bg-white ">
      <Card id={id} />
    </div>
  );
}

export default PrintCard
