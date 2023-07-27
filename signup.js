import { FormControl, FormLabel, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import {Input} from '@chakra-ui/react';
import {Button} from '@chakra-ui/react';
import React,{useState} from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const [show, setshow] = useState(false);
    const [name, setname] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [confirmpassword, setconfirmpassword] = useState();
    const [pic, setpic] = useState();
    const [loading, setloading] = useState(false);
    const toast = useToast();
   
    const [fetchData, setfetchData] = useState();

    const handleClick = ()=>setshow(!show);
    const navigate = useNavigate();
    



const submitHandler = async () => {

    setloading(true);
    if (!name || !email || !password || !confirmpassword) {

      toast({

        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",

      });

      setloading(false);
      return;
    }

    if (password !== confirmpassword) {

      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setloading(false);
      return;
    }
    console.log(name, email, password, pic);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      try {
  const data = await axios.post(
    "http://localhost:3001/api/user",
    {
      name,
      email,
      password,
      pic,
    },
    config
  );
  console.log(data);
  setfetchData(data);
  // Handle the successful response here
} catch (error) {
  console.error(error);
  // Handle the error here
}

      toast({

        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",

      });

      localStorage.setItem("userInfo", JSON.stringify(fetchData.data));
      setloading(false);
      navigate('/chats');

    } catch (error) {

      
      setloading(false);
    }
  };

    
const postDetails = (pics) => {
    setloading(true);

    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type !== "image/jpeg" && pics.type !== "image/png") {
      toast({
        title: "Please Select a JPEG or PNG Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {

      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset", "Chatter-Box")
      data.append("cloud_name", "chatter-box")
      axios.post("https://api.cloudinary.com/v1_1/chatter-box/image/upload", data)
        .then((response) => {
          console.log("Cloudinary response:", response);
          setpic(response.data.url.toString());
          setloading(false);
          toast({
            title: "Image uploaded successfully!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        })
        .catch((error) => {
          console.log("Cloudinary error:", error);
          setloading(false);
        });
    };
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
        placeholder='Enter your Email-id'
        onChange ={(e)=>setemail(e.target.value)}
        />
    </FormControl>

     <FormControl id="password" isRequired >
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input 
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

    <FormControl id="confirm-password" isRequired >
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
        <Input 
        type={show? "text": "password"}
        placeholder='Confirm your password'
        onChange ={(e)=>setconfirmpassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="xs" onClick={handleClick}>
                {show? "Hide":"Show"}
            </Button>
        </InputRightElement>
        
        </InputGroup>
        
    </FormControl>

    <FormControl id="pic" >
        <FormLabel>Upload your Picture</FormLabel>
        <Input 
        type="file"
        p={1.5}
        accept="image/*"
        onChange={(e)=>postDetails(e.target.files[0])}
        />
    </FormControl>


    <Button
    colorScheme="pink"
    width="100%"
    style={{marginTop:15}}
    onClick = {submitHandler}
    isLoading={loading}>
        Sign-Up

    </Button>



  </VStack>

  );
   
  
}

export default Signup;
