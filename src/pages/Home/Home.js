import React, { useCallback } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '../../containers/PageContainer/PageContainer';
import SubmissionForm from '../SubmissionForm/SubmissionForm';
import LogHistory from '../LogHistory/LogHistory';
import { useDispatch } from 'react-redux';
import { resetLogHistories } from '../../store/slices/logHistories';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: theme.spacing(3),
    width: '100%',
  },
  card: {
    width: '100%',
  },
  title: {
    fontWeight: 600,
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleRefresh = useCallback(() => {
    dispatch(resetLogHistories());
  }, [dispatch]);

  return(
    <PageContainer>
      <Grid container className={classes.gridContainer} spacing={2}>
        <Grid
          container
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          sm={12}
          md={6}
        >
          <Card className={classes.card}>
            <CardHeader title="Submission Form" titleTypographyProps={{ variant: 'subtitle2' }} classes={{ title: classes.title }} />
            <Divider />
            <CardContent>
              <SubmissionForm></SubmissionForm>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          xs={12}
          sm={12}
          md={6}
        >
          <Card className={classes.card}>
            <CardHeader
              title="Log History"
              titleTypographyProps={{ variant: 'subtitle2' }}
              classes={{ title: classes.title }}
              action={
                <IconButton aria-label="refresh" onClick={handleRefresh}>
                  <RefreshIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent>
              <LogHistory></LogHistory>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Home;