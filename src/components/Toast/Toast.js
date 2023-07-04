import React from "react";
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = ({
    severity,
    message,
    open,
    onClose,
}) => {
    return(
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={onClose}
          anchorOrigin={{
            vertical: 'top', // Set to 'top' to display at the top of the screen
            horizontal: 'center', // Set to 'center' to display at the center horizontally
          }}
        >
          <div>
            <Alert onClose={onClose} severity={severity}>
              { message }
            </Alert>
          </div>
        </Snackbar>
    );
}

Toast.defaultProps = {
    severity: 'success',
    open: false,
    onClose: () => {},
};

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    severity: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Toast;