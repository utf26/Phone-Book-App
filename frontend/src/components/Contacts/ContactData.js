import React from "react";
import { Button, Box, Text } from '@chakra-ui/react';
import axios from "axios";
import { FiEdit2 } from 'react-icons/fi';
import { BsTelephoneFill } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { Link } from "react-router-dom";

const ContactData = (props) => {
    const { id, firstName, lastName, phoneNumber } = props.obj;
    const deleteContact = () => {
        axios
            .delete(`${process.env.API_URL}/contacts/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    };

    return (<>
        <Box className="d-flex border-bottom pb-4">
            <Box className='w-100'>
                <Text className='card-title h5 pt-3'>{firstName} {lastName}</Text>
                <Box className="d-flex pt-1">
                    <Box>
                        <BsTelephoneFill color='lightgray' size={15} />
                    </Box>
                    <Text className="card-text ms-1 ">{phoneNumber}</Text>
                </Box>
            </Box>
            <Link to={"/editContact/" + id} className="btn btn-primary  mt-3" style={{ marginRight: "10px", height: "33px" }}><FiEdit2 /></Link>
            <Button onClick={deleteContact} className="btn btn-danger h-50 pt-2 mt-3"><BsTrash /></Button>
        </Box>
    </>
    );
}

export default ContactData