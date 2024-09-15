import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ViewTaskDialog({open, setOpen, viewTask}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Task Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom sx={{padding: '10px'}}>
            <b>Title</b> : {viewTask.title}
          </Typography>
          <Typography gutterBottom sx={{padding: '10px'}}>
            <b>Description</b> : {viewTask.description}
          </Typography>
          <Typography gutterBottom sx={{padding: '10px'}}>
            {viewTask.created}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
