import { FormControl, FormLabel, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import {Input} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import React,{useState} from 'react';
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import { useNavigate } from 'react-router-dom';
          



const Login = () => {
  
    const [show, setshow] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const handleClick = ()=>setshow(!show);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const [fetchData, setfetchData] = useState();
    const navigate = useNavigate();
   

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try {
       const data = await axios.post(
       "http://localhost:3001/api/user/login",
        { email,password },
       config
     );
      console.log(data);
      setfetchData(data);
    } catch (error) {
     console.error(error);
 
}
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(fetchData.data));
      setLoading(false);
      navigate('/chats');
      console.log("Redirecting to /chats...");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
  <VStack spacing='5px'>

    <FormControl id="first-name" isRequired >
        <FormLabel>Name</FormLabel>
        <Input 
        placeholder='Enter your name'
        onChange ={(e)=>setname(e.target.value)}
        />
    </FormControl>

     <FormControl id="email-id" isRequired >
        <FormLabel>Email id</FormLabel>
        <Input 
        value={email}
        type="email"
        placeholder='Enter your Email-id'
        onChange ={(e)=>setemail(e.target.value)}
        />
    </FormControl>

     <FormControl id="password" isRequired >
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input 
        value={password}
        type={show? "text": "password"}
        placeholder='Enter your Password'
        onChange ={(e)=>setpassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="xs" onClick={handleClick}>
                {show? "Hide":"Show"}
            </Button>
        </InputRightElement>
        
        </InputGroup>
        
    </FormControl>
    <Button
    colorScheme="pink"
    width="100%"
    style={{marginTop:15}}
    onClick = {submitHandler}
    isLoading={loading}>
        Login

    </Button>

    <Button 
    colorScheme="blue"
    width="100%"
    onClick={()=>{
        setname("Guest")
        setemail("guest@example.com")
        setpassword("123456")
    }}>
        Get Guest User credentials

    </Button>



  </VStack>

  );
   
}

export default Login
