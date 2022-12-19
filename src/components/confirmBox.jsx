import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, DialogContentText } from '@mui/material';

export default function AlertDialog({ open, handleClose, deleteFunction }) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'>
                <DialogTitle id='alert-dialog-title'>{'Delete'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure want to delete this user
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant={'outlined'}>
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteFunction}
                        variant={'contained'}
                        color={'error'}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
