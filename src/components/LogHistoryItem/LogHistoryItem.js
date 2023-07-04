import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { TableCell, Tooltip, TableRow, Chip } from '@material-ui/core';

const DATE_TIME = 'MMM DD, YYYY h:mmA';

const useStyles = makeStyles(() => ({
    errorChip: {
      color: 'red',
      backgroundColor: 'pink',
      border: '1px red solid',
    },
    pendingChip: {
        color: 'blue',
        backgroundColor: 'lightblue',
        border: '1px blue solid',
    },
    warningChip: {
        color: 'orange',
        backgroundColor: '#fff6de',
        border: '1px orange solid',
    },
    sentChip: {
        color: '#2fc134',
        backgroundColor: '#b4ffb4',
        border: '1px #2fc134 solid',
    },
}));

const LogHistoryItem = ({
  log,
}) => {
    const classes = useStyles();
    const categories = useSelector((state) => state.categories.list);

    const getCategoryName = useCallback((categoryId) => {
        const foundCategory = categories.find((category) => category._id === categoryId);
        return foundCategory ? foundCategory.name : 'Unknown';
    }, [categories]);
      
    const getClassByStatus = (status) => {
        switch (status) {
            case 'sent':
                return classes.sentChip;
            case 'pending':
                return classes.pendingChip;
            case 'failed':
                return classes.errorChip;
            case 'with-issues':
                return classes.warningChip;
            default:
                return classes.activeChip;
        }
    };

    return (
        <>
            <TableRow key={log._id}>
                <TableCell>
                    {log.user.name}
                </TableCell>
                <TableCell>
                    <Tooltip title={log.message}>
                        <span>{_.truncate(log.message, {length: 150 })}</span>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <p>{getCategoryName(log.categoryId)}</p>
                </TableCell>
                <TableCell>
                    <p>{_.startCase(log.channelProcessor)}</p>
                </TableCell>
                <TableCell>
                    <Chip 
                        size="small"
                        className={getClassByStatus(log.status)}
                        label={_.startCase(log.status)}
                    />
                </TableCell>
                <TableCell>{moment(log.updatedAt).format(DATE_TIME)}</TableCell>
            </TableRow>
        </>
    );
};

LogHistoryItem.propTypes = {
  log: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    channelProcessor: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
    })
  }),
};

export default LogHistoryItem;

