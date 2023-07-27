import React from 'react';
import { Container,Box,Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentication/login';
import Signup from '../components/authentication/signup';
import { useNavigate } from 'react-router-dom';

import { useEffect } from "react";



const HomePage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user)
    navigate("/chats");
    
  }, [navigate]);
  
  return (
    <Container maxW='xl' centerContent>
      <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"black"}
      w="100%"
      m="40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      textAlign="center"
      textColor={"white"}
      >
      <Text fontSize="2xl" fontFamily = "Work sans">Chatter-Box</Text>
      </Box>
      <Box 
      justifyContent="center"
      p={4}
      w="100%"
      bg={"black"}
      borderRadius="lg"
      borderWidth="1px"
      textColor={"White"}
      > 
      <Tabs variant='soft-rounded' colorScheme='pink'>
       <TabList mb="1em">
         <Tab width="50%">Login</Tab>
         <Tab width="50%">Sign-Up</Tab>
       </TabList>
       <TabPanels>
       <TabPanel> <Login /></TabPanel>
        <TabPanel> <Signup /> </TabPanel>
       </TabPanels>
      </Tabs>

      </Box>

    </Container>
  )
};

export default HomePage;
