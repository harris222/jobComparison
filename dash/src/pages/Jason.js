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
  },
  title: {
    padding: theme.spacing(2),
    height: "100",
    textAlign: "center",
    width: "100%",
  },
  list: {
    listStyleType: "none",
  },
  overlap: {
    textAlign: "center",
  }

}));

function SpacingGrid() {
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
              <Paper className={classes.title}>
                <Typography variant="h5">Skills of Job A</Typography>
              </Paper>
          </Grid>
          <Grid item xs={4}>
              <Paper className={classes.title}>
                <Typography variant="h5">Overlapping Skills (50%)</Typography>
              </Paper>
          </Grid>
          <Grid item xs={4}>
              <Paper className={classes.title}>
                <Typography variant="h5">Skills of Job B</Typography>
              </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <ul className={classes.list}>
                    {(listA) ? listA.map(item => <li>{item}</li>) : <li>empty</li>}
                  </ul>
                </Paper>
          </Grid>
          <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <ul className={classes.list}>
                    {(listOverlap) ? listOverlap.map(item => <li>{item}</li>) : <li>No overlapping skills</li>}
                  </ul>
                </Paper>
          </Grid>
          <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <ul className={classes.list}>
                    {(listB) ? listB.map(item => <li>{item}</li>) : <li>empty</li>}
                  </ul>
                </Paper>
          </Grid>
        </Grid>

    </div>
    </Container>
  );
}

export default SpacingGrid;