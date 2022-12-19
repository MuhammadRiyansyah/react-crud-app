import React, { useState } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');

    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                name,
                email,
                gender,
            });
            navigate('/');
        } catch (error) {
            console.log(error);
        }
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
                    Add User <AddIcon />
                </Typography>
                <form onSubmit={saveUser}>
                    <Box display='flex' flexDirection='column' gap={3}>
                        <FormControl>
                            <TextField
                                fullWidth
                                id='outlined-basic'
                                label='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                variant='outlined'
                                required
                                autoComplete='off'
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                fullWidth
                                id='outlined-basic'
                                label='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant='outlined'
                                required
                                autoComplete='off'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel id='demo-simple-select-label'>
                                Gender
                            </InputLabel>
                            <Select
                                labelId='demo-simple-select-standard-label'
                                id='demo-simple-select-standard'
                                label='Gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}>
                                <MenuItem value='Male'>Male</MenuItem>
                                <MenuItem value='Female'>Female</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{ width: '20%' }}
                            startIcon={<AddIcon />}>
                            Add
                        </Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default AddUser;
