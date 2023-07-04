import React, { useState } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  MenuItem,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    textAlign: 'left',
  },
}));

const ListSelector = ({
  items,
  disabled,
  label,
  onChange,
}) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      if (onChange) {
        onChange(items.find((item) => item._id === event.target.value));
      }
    };
    return(
        <Grid
          container
          className={classes.root}
        >
            <TextField
              select
              required
              variant="outlined"
              size="medium"
              className={classes.textField}
              label={label}
              fullWidth
              value={selectedValue}
              onChange={handleChange}
              autoComplete="off"
              disabled={disabled}
            >
              {
                items.map(({ _id, name }) => (
                  <MenuItem key={_id} value={_id}>
                  {name}
                  </MenuItem>
                ))
              }
            </TextField>
        </Grid>
    );
}

ListSelector.defaultProps = {
  items: [],
  disabled: false,
  label: '',
};

ListSelector.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string
  })),
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ListSelector;
