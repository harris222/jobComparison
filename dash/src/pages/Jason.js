import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    height: "auto",
    textAlign: "left",
    width: "75%",
  },
  title: {
    padding: theme.spacing(2),
    height: "100",
    textAlign: "center",
    width: "75%",
  },
  list: {
    listStyleType: "none",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
    <div className={classes.root}> 
      <div>
        <h4 className={classes.overlap}>OVERLAP 50%</h4>
      </div>
      <Grid container spacing={1} className={classes.container}>
        <Grid container item xs={12} spacing={3} className={classes.container}>
          <Grid item xs={4}>
              <Paper className={classes.title} elevation={0}>
                <Typography variant="h5">Skills of Job A</Typography>
              </Paper>
          </Grid>
          <Grid item xs={4}>
              <Paper className={classes.title} elevation={0}>
                <Typography variant="h5">Overlapping Skills</Typography>
              </Paper>
          </Grid>
          <Grid item xs={4}>
              <Paper className={classes.title} elevation={0}>
                <Typography variant="h5">Skills of Job B</Typography>
              </Paper>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3} className={classes.container}>
          <Grid item xs={4}>
                <Paper className={classes.paper} elevation={10}>
                  <ul className={classes.list}>
                    {(listA) ? listA.map(item => <li>{item}</li>) : <li>empty</li>}
                  </ul>
                </Paper>
          </Grid>
          <Grid item xs={4}>
                <Paper className={classes.paper} elevation={10}>
                  <ul className={classes.list}>
                    {(listOverlap) ? listOverlap.map(item => <li>{item}</li>) : <li>No overlapping skills</li>}
                  </ul>
                </Paper>
          </Grid>
          <Grid item xs={4}>
                <Paper className={classes.paper} elevation={10}>
                  <ul className={classes.list}>
                    {(listB) ? listB.map(item => <li>{item}</li>) : <li>empty</li>}
                  </ul>
                </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default SpacingGrid;