import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import axios from 'axios';

import ListSelector from "../../components/ListSelector/ListSelector";
import Toast from "../../components/Toast/Toast";
import { fetchCategoriesAsync } from "../../store/slices/categories";
import { resetLogHistories } from "../../store/slices/logHistories";
import { API_URL } from "../../constants";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const SubmissionForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.list);
  
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState({ _id: ''});
    const [isDirty, setIsDirty] = useState(false);
    const [openToast, setOpenToast] = React.useState(false);
    const [disableSubmit, setDisableSubmit] = React.useState(false);
    const [severity, setSeverity] = React.useState('success');
    const [toastMesage, setToastMessage] = React.useState('');

    const isValidForm = category?._id && message.trim().length;
  
    useEffect(() => {
      dispatch(fetchCategoriesAsync());
    }, [dispatch]);

    useEffect(() => {
      // enable the submit button if the form has changed
      setDisableSubmit(false);
    }, [category._id, message]);

    const handleSendNotification = async () => {
      setDisableSubmit(true);
      try {
        const response = await axios.post(`${API_URL}/campaigns`, {
          categoryId: category._id,
          message: message.trim(),
        });
  
        if (response.status === 200) {
          // Notification sent successfully
          setOpenToast(true);
          setToastMessage('Notification successfully queued. Reloading Log History...');

          // reset logs to get the latest ones
          /**
           * Too ugly! but it's an alternative to use socket.io...
           */
          setTimeout(() => {
            dispatch(resetLogHistories());            
          }, 1000);
        } else {
          // Handle error case here
          setOpenToast(true);
          setToastMessage('Failed to queue the notification.');
          setSeverity('error');
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setOpenToast(true);
        setToastMessage(`An error has occurred: ${JSON.stringify(error, null, 2)}`);
        setSeverity('error');
      }
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenToast(false);
    };

    return(
      <>
        <Grid container spacing={2}>
          <Grid container item>
            <ListSelector
              items={categories}
              label="Category"
              onChange={(event) => setCategory(event)}
            />
          </Grid>
          <Grid container item>
            <TextField
              label="Message"
              variant="outlined"
              size="medium"
              fullWidth
              required
              multiline
              maxRows={10}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onBlur={() => setIsDirty(true)}
              error={!message && isDirty}
            />
          </Grid>
          <Grid container item direction="column"
            justifyContent="flex-start"
            alignItems="center">
            <Button
              variant="contained"
              className={classes.button}
              startIcon={<SendIcon />}
              onClick={handleSendNotification}
              disabled={!isValidForm || disableSubmit}
            >
              { 'Send ' }
              {category?.name}
              {' Notification'}
            </Button>
          </Grid>
        </Grid>
        <Toast
          open={openToast}
          onClose={handleClose}
          message={toastMesage}
          severity={severity}
        />
      </>
    );
}

export default SubmissionForm;