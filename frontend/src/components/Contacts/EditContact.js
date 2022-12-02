import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Text, Flex, Input } from '@chakra-ui/react';
import { RiContactsBookFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

const EditContact = () => {
    const { id } = useParams()

    const [contact, setContact] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.API_URL}/contacts/${id}`)
            .then(({ data }) => {
                setContact(data.data[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const onSubmit = () => {
        if (contact.id || contact.firstName || contact.lastName || contact.phoneNumber) {
            axios.patch(`${process.env.API_URL}/contacts/${id}`, contact)
                .then((res) => {
                    if (res.status === 200) {
                        window.history.go(-1)
                    } else Promise.reject();
                })
                .catch(() => alert("Something went wrong"));
        } else {
            return alert('please fill all fields')
        }
    };

    const handleContactChange = e => {
        const { target } = e;
        setContact(prevState => ({ ...prevState, [target.name]: target.value }));
    };
    return (<>
        <Box className='bg-light vh-100'>
            <Box className="container">
                <Box className='d-flex justify-content-center pt-2'>
                    <RiContactsBookFill style={{ marginRight: "30px" }} size={50} />
                    <Text className="fw-bold h1">Phone Book App</Text>
                </Box>
                <Box className="d-flex justify-content-center">
                    <Box className="col-md-6 ">
                        <Text className="h3  fw-bold mt-5">Edit Contact</Text>
                        <Box className="mt-4 col-md-12">
                            <Text className="h5">
                                First Name:
                            </Text>
                            <Flex>
                                <Input
                                    placeholder="first name"
                                    name="firstName"
                                    width={'100%'}
                                    height={35}
                                    border={'none'}
                                    borderRadius={4}
                                    value={contact.firstName}
                                    onChange={handleContactChange}
                                    required
                                />

                            </Flex>
                            <Text className="h5 mt-2">Last Name:</Text>
                            <Flex>
                                <Input
                                    placeholder="last name"
                                    name="lastName"
                                    width={'100%'}
                                    height={35}
                                    border={'none'}
                                    borderRadius={4}
                                    value={contact.lastName}
                                    onChange={handleContactChange}
                                    required
                                />

                            </Flex>
                            <Text className="h5 mt-2">Phone:</Text>
                            <Flex>
                                <Input
                                    placeholder="phone number"
                                    name="phoneNumber"
                                    width={'100%'}
                                    height={35}
                                    border={'none'}
                                    borderRadius={4}
                                    value={contact.phoneNumber}
                                    onChange={handleContactChange}
                                    required
                                />

                            </Flex>
                            <Button
                                className="btn btn-success mt-4"
                                onClick={onSubmit}
                            >Update Contact</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>);
}
export default EditContact