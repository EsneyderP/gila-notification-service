import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const PageHeader = ({
  title,
  leftIcon: LeftIcon,
  onClickIcon,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={onClickIcon} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            { LeftIcon ? <LeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

PageHeader.defaultProps = {
  leftIcon: null,
  onClickIcon: () => {},
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.elementType,
  onClickIcon: PropTypes.func,
};

export default PageHeader;
