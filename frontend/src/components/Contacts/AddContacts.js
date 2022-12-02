import { Button, Box, Text, Input, Flex } from '@chakra-ui/react';
import { RiContactsBookFill } from "react-icons/ri";
import React, { useState } from "react";
import axios from "axios";

export const AddContact = () => {
    const [formValues, setFormValues] = useState({ firstName: '', lastName: '', phoneNumber: '' })
    const onSubmit = () => {
        if (formValues.firstName && formValues.lastName && formValues.phoneNumber) {
            axios.post(
                `${process.env.API_URL}/contacts/`,
                formValues)
                .then(res => {
                    if (res.status === 200)
                        window.history.go(-1)
                    else
                        Promise.reject()
                })
                .catch(err => alert('Please fill all the fields'))
        } else {
            return alert('please fill out all fields')
        }
    }
    const handleContactChange = e => {
        const { target } = e;
        setFormValues(prevState => ({ ...prevState, [target.name]: target.value }));
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
                        <Text className="h3  fw-bold mt-5">Add Contact</Text>
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
                                    value={formValues.firstName}
                                    onChange={handleContactChange}
                                    required
                                />

                            </Flex>
                            <Text className="h5 mt-2">Last Name:</Text>
                            <Flex>
                                <Input
                                    placeholder="last name"
                                    name="lastName"
                                    height={35}
                                    border={'none'}
                                    width={"100%"}
                                    borderRadius={4}
                                    value={formValues.lastName}
                                    onChange={handleContactChange}
                                    required
                                />

                            </Flex>
                            <Text className="h5 mt-2">Phone:</Text>
                            <Flex>
                                <Input
                                    placeholder="phone number"
                                    name="phoneNumber"
                                    height={35}
                                    border={'none'}
                                    width={"100%"}
                                    borderRadius={4}
                                    value={formValues.phoneNumber}
                                    onChange={handleContactChange}
                                    required
                                />

                            </Flex>
                            <Button
                                className="btn btn-success mt-4"
                                type='submit'
                                onClick={onSubmit}
                            >Save</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>);
}
export default AddContact