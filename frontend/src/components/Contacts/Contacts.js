import { Link } from 'react-router-dom'
import { RiContactsBookFill } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactData from "./ContactData";
import { Box, Input, Text } from "@chakra-ui/react";

export const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        axios
            .get(`${process.env.API_URL}/contacts`)
            .then(({ data }) => {
                setContacts(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSearchChange = (e) => {
        axios.get(`${process.env.API_URL}/contacts?search=${e.target.value}`)
            .then(({ data }) => {
                setContacts(data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (<>
        <Box className='bg-light vh-100'>
            <Box className="container">
                <Box className='d-flex justify-content-center pt-2'>
                    <RiContactsBookFill style={{ marginRight: "30px" }} size={50} />
                    <Text className="fw-bold h1">Phone Book App</Text>
                </Box>
                <Box className="pt-4 d-flex ">
                    <Text className="h1 w-100 fw-bold">Contacts</Text>
                    <Link to={'/addContact'} className="float-end btn btn-primary justify-content-end"
                        style={{ width: "10rem", height: "40px" }}> + Add Contacts</Link>
                </Box>
                <Box className="pt-4 ">
                    <Input type="text" onChange={handleSearchChange} placeholder="Search for the contact by last name..." style={{ paddingLeft: "10px" }} width={"100%"} height={35} borderRadius={"4px"} border={"none"}></Input>
                </Box>
                <Box className="card mt-4">
                    <Box className="card-body">
                        {
                            contacts.length
                                ? contacts.map((res, i) => {
                                    return <ContactData obj={res} key={i} />
                                })
                                : <Text className="h5 w-100 d-flex justify-content-center">No contacts found!</Text>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    </>);
}

export default Contacts