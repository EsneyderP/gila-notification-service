import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';

// redux
import { fetchLogHistoriesAsync } from "../../store/slices/logHistories";
import LogHistoryItem from "../../components/LogHistoryItem/LogHistoryItem";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  noLogs: {
    textAlign: 'center',
  },
  tableWrapper: {
    maxHeight: '70vh',
  },
  loadMoreButton: {
    marginTop: theme.spacing(2),
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '145px',
  },
}));

const LogHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logHistories.list);
  const totalLogs = useSelector((state) => state.logHistories.total);
  const loadingLogs = useSelector((state) => state.logHistories.loading);
  const resetLogs = useSelector((state) => state.logHistories.reset);
  const disableLoadButton = totalLogs <= logs.length;

  // State to track the number of logs to display initially and on each load more
  const [currentPage, setCurrentPage] = useState(1);

  // State to keep track of whether logs needs to be fetched
  const [logsFetched, setLogsFetched] = useState(false);

  useEffect(() => {
    // Fetch logs only if they haven't been fetched yet
    if (!logsFetched) {
      setLogsFetched(true);
    }
  }, [logsFetched]);

  useEffect(() => {
    if (logsFetched || resetLogs) {
      dispatch(fetchLogHistoriesAsync({ page: 1 }));
    }
  }, [dispatch, logsFetched, resetLogs]);

  // Function to load more logs when theoffset bottom of the page is reached
  const handleLoadMore = useCallback(() => {
    // Increment the current page and fetch more logs
    setCurrentPage((prevPage) => prevPage + 1);
    dispatch(fetchLogHistoriesAsync({ page: currentPage + 1 }));
  }, [dispatch, currentPage]);

  return(
    <>
      <TableContainer className={classes.tableWrapper}>
        {/* Show the loader if data is loading */}
        {loadingLogs && logs.length === 0 ? (
          <div className={classes.loaderContainer}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <>
            {/* Show the table if logs are available */}
            {logs.length > 0 && (
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeader}>User Name</TableCell>
                    <TableCell className={classes.tableHeader}>Message</TableCell>
                    <TableCell className={classes.tableHeader}>Category</TableCell>
                    <TableCell className={classes.tableHeader}>Channel</TableCell>
                    <TableCell className={classes.tableHeader}>Status</TableCell>
                    <TableCell className={classes.tableHeader}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {logs.map((log) => (
                    <LogHistoryItem
                      key={log._id}
                      log={log}
                      onClick={console.log}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
            {!logs.length && (
              <div className={classes.noLogs}>
                <Typography>No Activity Logs Found</Typography>
              </div>
            )}
          </>
        )}
      </TableContainer>
      {/* Load More button */}
      <div className={classes.loadMoreButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLoadMore}
            disabled={disableLoadButton}
          >
            {disableLoadButton ? 'No more data to load': 'Load More'}
          </Button>
      </div>
    </>
  );
}

export default LogHistory;