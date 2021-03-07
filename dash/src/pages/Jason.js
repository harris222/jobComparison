import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3),
    textAlign: "center",
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  var listA = ["hello", "yololo", "boiiiii"];
  var listOverlap = ["osahsvsv", "LISTOVERLAAAAP", "bromo"];
  var listB = ["Ethan", "Harris", "Jason"];

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Skills of Job A</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Overlapping Skills (50%)</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Skills of Job B</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
                {(listA) ? listA.map(item => <p>{item}</p>) : <p>empty</p>}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {(listOverlap) ? listOverlap.map(item => <p>{item}</p>) : <p>empty</p>}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {(listB) ? listB.map(item => <p>{item}</p>) : <p>empty</p>}
            </Paper>
          </Grid>
        </Grid>

    </div>
    </Container>
  );
}
