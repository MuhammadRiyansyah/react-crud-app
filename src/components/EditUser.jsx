import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById();
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/users/${id}`, {
                name,
                email,
                gender,
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
    };
    return (
        <Box
            width={'100%'}
            height={'100vh'}
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'>
            <Box
                p={2}
                minWidth={'40%'}
                display='flex'
                flexDirection='column'
                gap={3}
                mt={3}
                mb={3}
                component={Card}
                sx={{ border: '1px solid gray' }}>
                <Typography
                    variant='subtitle1'
                    sx={{ fontWeight: 'bold', fontSize: '40px' }}>
                    Edit User <EditIcon />
                </Typography>
                <form onSubmit={updateUser}>
                    <Box display='flex' flexDirection='column' gap={3}>
                        <TextField
                            fullWidth
                            id='outlined-basic'
                            label='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant='outlined'
                        />
                        <TextField
                            fullWidth
                            id='outlined-basic'
                            label='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant='outlined'
                        />
                        <FormControl>
                            <InputLabel id='demo-simple-select-label'>
                                Gender
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-standard-label'
                                id='demo-simple-select-standard'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                label='Gender'>
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{ width: '20%' }}
                            startIcon={<EditIcon />}>
                            Update
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default EditUser;
