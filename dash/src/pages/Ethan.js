import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const description1 = '';
const description2 = '';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Compare() {
  const classes = useStyles();
  const [profession1, setProfession1] = useState("");
  const [profession2, setProfession2] = useState("");
  const [prof1, setProf1] = useState("");
  const [prof2, setProf2] = useState("");

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
  }

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography variant="h4" align="center">
          Compare Required Skills
        </Typography>

        <form className={classes.form} noValidate onSubmit={submitButton}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="input-left"
                label="Profession 1"
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
              <Typography>{description1}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{profession2}</Typography>
              <Typography>{description2}</Typography>
            </Paper>
          </Grid>
        </Grid>

      </div>
    </Container>
  );
}
