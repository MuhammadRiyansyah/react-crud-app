import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import AlertDialog from './confirmBox';

const UserList = () => {
    const [users, setUser] = useState([]);
    const [open, setOpen] = useState(false);
    const [deleteData, setDeleteData] = useState({});

    const openDelete = (data) => {
        setOpen(true);
        setDeleteData(data);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
    };

    const deleteUser = async () => {
        try {
            await axios.delete(`http://localhost:5000/users/${deleteData?.id}`);
            getUsers();
            setOpen(false);
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
            alignItems='center'>
            <Box
                minWidth={400}
                width={'70%'}
                display='flex'
                flexDirection='column'
                height={'100%'}
                gap={3}
                mt={3}
                mb={3}>
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'>
                    <Typography
                        variant='subtitle1'
                        sx={{ fontWeight: 'bold', fontSize: '40px' }}>
                        CRUD APP
                    </Typography>
                    <Link to={'/add'} style={{ textDecoration: 'none' }}>
                        <Button variant='contained' startIcon={<AddIcon />}>
                            ADD
                        </Button>
                    </Link>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'darkslateblue' }}>
                                <TableCell>
                                    <Typography
                                        color='white'
                                        variant='subtitle1'
                                        sx={{
                                            fontWeight: 'bold',
                                        }}>
                                        No.
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color='white'
                                        variant='subtitle1'
                                        sx={{
                                            fontWeight: 'bold',
                                        }}>
                                        Name
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color='white'
                                        variant='subtitle1'
                                        sx={{
                                            fontWeight: 'bold',
                                        }}>
                                        Email
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color='white'
                                        variant='subtitle1'
                                        sx={{
                                            fontWeight: 'bold',
                                        }}>
                                        Gender
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        color='white'
                                        variant='subtitle1'
                                        sx={{
                                            fontWeight: 'bold',
                                        }}>
                                        Actions
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}>
                                    <TableCell component='th' scope='row'>
                                        <Typography
                                            variant='subtitle2'
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                            }}>
                                            {index + 1}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant='subtitle2'
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '18px',
                                            }}>
                                            {user.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant='subtitle2'
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '18px',
                                            }}>
                                            {user.email}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant='subtitle2'
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: '18px',
                                            }}>
                                            {user.gender}
                                        </Typography>
                                    </TableCell>
                                    <TableCell width={10}>
                                        <Stack
                                            display='flex'
                                            direction='row'
                                            gap={4}>
                                            <Link
                                                to={`/edit/${user.id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                }}>
                                                <Button
                                                    variant='contained'
                                                    color='success'
                                                    startIcon={<EditIcon />}>
                                                    Update
                                                </Button>
                                            </Link>
                                            <Button
                                                variant='contained'
                                                color='error'
                                                onClick={() => {
                                                    openDelete(user);
                                                }}
                                                startIcon={<DeleteIcon />}>
                                                Delete
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <AlertDialog
                open={open}
                handleClose={() => setOpen(false)}
                deleteFunction={deleteUser}
            />
        </Box>
    );
};

export default UserList;
