import React from "react";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  error: {
    textAlign: 'center',
  },
}));

const NotFound = () => {
    const classes = useStyles();
    return(
        <h1 className={classes.error}>I&apos;m getting lost 😅</h1>
    );
}

export default NotFound;