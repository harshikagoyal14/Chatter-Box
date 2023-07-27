import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button } from "@chakra-ui/button";
import React, {useState} from "react";
import { Input } from "@chakra-ui/input";
import { useDisclosure } from "@chakra-ui/hooks";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Avatar,Toast } from "@chakra-ui/react";
import {BellIcon, SearchIcon,ChevronDownIcon} from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SideDrawer = () =>{
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user, setSelectedChat,chats,setChats} = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = ()=>{
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async()=>{
     if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`http://localhost:3001/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async(userId)=>{
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:3001/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };



  return(
  <>

  <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="black"
        w="100%"
        p="5px 10px 5px 10px"
        
  >
    <Tooltip label="Search Users to chat" hasArrow placement="bottom-end" >
     <Button variant="ghost" d="flex" onClick={onOpen} >
            <SearchIcon color="white"/>
            <Text display={{ base: "none", md: "flex" }} px={4} style={{color:"white"}}>
              Search User
            </Text>
      </Button>      
    </Tooltip>

    <div display="flex">
      <Text fontSize="2xl" fontFamily="Work sans" color="white">
      Chatter-Box
    </Text>
    </div>

    

    <div>
      <Menu>
        <MenuButton p={1}>
          <BellIcon fontSize= "2xl" color="white" margin={1}/>
        </MenuButton>
        {/*<MenuList></MenuList> */}
      </Menu>
      <Menu>
        <MenuButton as={Button} bg="#C5A8AC" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
      </Menu>
    </div>
  </Box>

     <Drawer placement="left" onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader backgroundColor="black" textColor="white" borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody backgroundColor="black">
            <Box display="flex" pb={2}>
              <Input
                backgroundColor="#C5A8AC"
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button backgroundColor ="#C5A8AC" onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  </>

);
}


export default SideDrawer;
