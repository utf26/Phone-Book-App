import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Box, Text, Link, Flex, Input } from '@chakra-ui/react';
import { RiContactsBookFill } from "react-icons/ri";
import { useParams } from "react-router-dom";

const EditContact = (props) => {
    const { id } = useParams()

    const [contact, setcontact] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:9000/api/contacts/get_data_by_id", { id })
            .then(({ data }) => {
                setcontact(data.data[0]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const onSubmit = () => {
        if (contact.id || contact.first_name || contact.last_name || contact.phone_number) {
            axios.post("http://localhost:9000/api/contacts/update", contact)
                .then((res) => {
                    if (res.status === 200) {
                        window.history.go(-1)
                    } else Promise.reject();
                })
                .catch((err) => alert("Something went wrong"));
        } else {
            return alert('please fill all fields')
        }
    };

    const handleContactChange = e => {
        const { target } = e;
        setcontact(prevState => ({ ...prevState, [target.name]: target.value }));
    };
    return (<>
        <Box className='bg-light vh-100'>
            <Box className="container">
                <Box className='d-flex justify-content-center pt-2'>
                    <RiContactsBookFill style={{ marginRight: "30px" }} size={50} />
                    <Text className="fw-bold h1">Phone Book App</Text>
                </Box>
                <Text className="h2 fw-bold d-flex justify-content-left mt-3">Edit Contact</Text>
                <Box className="mt-4">
                    <Text className="h5">
                        First Name:
                    </Text>
                    <Flex>
                        <Input
                            placeholder="write here your first name"
                            name="first_name"
                            width={"100%"}
                            value={contact.first_name}
                            onChange={handleContactChange}
                            required
                        />

                    </Flex>
                    <Text className="h5 mt-2">Last Name:</Text>
                    <Flex>
                        <Input
                            placeholder="write here your last name"
                            name="last_name"
                            width={"100%"}
                            value={contact.last_name}
                            onChange={handleContactChange}
                            required
                        />

                    </Flex>
                    <Text className="h5 mt-2">Phone:</Text>
                    <Flex>
                        <Input
                            placeholder="write here your phone number"
                            name="phone_number"
                            width={"100%"}
                            value={contact.phone_number}
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
    </>);
}
export default EditContact