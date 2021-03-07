import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3),
    textAlign: "center",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  description: {
    textAlign: 'left',
  }
}));

function getData(profession) {
  return fetch('/data', {
    method: "POST",
    headers: { "Content-Type" : "application/json" },
    body: profession
  })
}

export default function App() {
  const [list, setList] = useState({});

  const classes = useStyles();
  const [profession1, setProfession1] = useState("Profession 1");
  const [profession2, setProfession2] = useState("Profession 2");
  const [prof1, setProf1] = useState("");
  const [prof2, setProf2] = useState("");
  const [description1, setDescription1] = useState("...");
  const [description2, setDescription2] = useState("...");
  const [overlap, setOverlap] = useState("0%");

  const handleProfChange1 = (e) => {
    setProf1(e.target.value);
  }

  const handleProfChange2 = (e) => {
    setProf2(e.target.value);
  }

  const submitButton = (e) => {
    e.preventDefault();
    setProfession1(prof1);
    setProfession2(prof2);
    setDescription1("...");
    setDescription2("...");
    setOverlap("0%");
  }

  var listA = ["hello", "yololo", "boiiiii"];
  var listOverlap = ["osahsvsv", "LISTOVERLAAAAP", "bromo"];
  var listB = ["Ethan", "Harris", "Jason"];

  useEffect(() => {
    getData()
      .then(items => {
        setList(items)
      })
  }, [])

  console.log(list.length)

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography variant="h4" align="center">
          Compare Required Skills
        </Typography>

        <form className={classes.form} noValidate onSubmit={submitButton}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="input-left"
                label="Profession 1"
                required
                name="input-left"
                value={prof1}
                onChange={handleProfChange1}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="input-right"
                label="Profession 2"
                required
                name="input-right"
                value={prof2}
                onChange={handleProfChange2}
              />
            </Grid>
          </Grid>
          <Button
            size="large"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Compare
          </Button>
        </form>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{profession1}</Typography>
              <Typography className={classes.description}>Description: {description1}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{profession2}</Typography>
              <Typography className={classes.description}>Description: {description2}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Skills of {profession1}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Overlapping Skills ({overlap})</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">Skills of {profession2}</Typography>
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
