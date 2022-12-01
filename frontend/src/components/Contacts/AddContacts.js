import {Button, Box, Text, Input, Flex, Link} from '@chakra-ui/react';
import {RiContactsBookFill} from "react-icons/ri";
import React, {useState} from "react";
import axios from "axios";

export const AddContact = () => {
    const [formValues, setFormValues] = useState({first_name: '', last_name: '', phone_number: ''})
    const onSubmit = () => {
        if (formValues.first_name && formValues.last_name && formValues.phone_number) {
            // TODO: use env variable for domain
            axios.post(
                'http://localhost:9000/api/contacts/create',
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
        const {target} = e;
        setFormValues(prevState => ({...prevState, [target.name]: target.value}));
    };

    return (<>
        <Box className='bg-light vh-100'>
            <Box className="container">
                <Box className='d-flex justify-content-center pt-2'>
                    <RiContactsBookFill style={{marginRight: "30px"}} size={50}/>
                    <Text className="fw-bold h1">Phone Book App</Text>
                </Box>
                <Text className="h3 d-flex justify-content-left fw-bold mt-3">Add Contact</Text>
                <Box className="mt-4">
                    <Text className="h5">
                        First Name:
                    </Text>
                    <Flex>
                        <Input
                            placeholder="write here your first name"
                            name="first_name"
                            width={"100%"}
                            value={formValues.first_name}
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
                            value={formValues.last_name}
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
                            value={formValues.phone_number}
                            onChange={handleContactChange}
                            required
                        />

                    </Flex>
                    <Button
                        className="btn btn-success mt-4"
                        onClick={onSubmit}
                    >Save</Button>
                </Box>
            </Box>
        </Box>
    </>);
}
export default AddContact