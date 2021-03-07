import React, {useEffect, useState, useCallback} from 'react';
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

function getData(link, profession, requestType, MIMEType) {
  return fetch(link, {
    method: requestType,
    headers: { "Content-Type" : MIMEType},
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
  const [skillOverlap, setSkillOverlap] = useState([]);
  const [skillProf1, setSkillProf1] = useState([]);
  const [skillProf2, setSkillProf2] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleProfChange1 = (e) => {
    setProf1(e.target.value);
  }

  const handleProfChange2 = (e) => {
    setProf2(e.target.value);
  }

  const setOverlaps = (skillProf1, skillProf2) => {
    let arr = []
    function strip(string) { 
      return string.replace(/^\s+|\s+$/g, ''); 
    } 
    skillProf1.forEach(skill1 => {
      skillProf2.forEach(skill2 => {
        if (strip(skill1) === strip(skill2)){
          arr.push(skill1);     
          let index = skillProf1.indexOf(skill1);
          if (index > -1) {
            skillProf1.splice(index, 1);
          }

          index = skillProf2.indexOf(skill1);
          if (index > -1){
            skillProf2.splice(index, 1)
          }
        }
      })
    })

    if (skillProf1.length + skillProf2.length == 0)
      setOverlap("0%")
    else 
      setOverlap((arr.length / (skillProf1.length + skillProf2.length + arr.length) * 100).toFixed(2) + "%");
    
    setSkillOverlap(arr);
    
    /* Remove overlapped elements from prof1 and prof2 */
    if (skillProf1.length != 0)
      setSkillProf1(skillProf1);

    if (skillProf2.length != 0)
      setSkillProf2(skillProf2);
  }
  const submitButton = async (e) => {
    e.preventDefault();
    setProfession1(prof1);
    setProfession2(prof2);
    setDescription1("...");
    setDescription2("...");
    setOverlap("0%");
    setSubmitted(true);

    function Counter(array){
      let counter = {}
      array.forEach(x => counter[x] = (counter[x] || 0) + 1);
      return counter;
    }
    /* Resolve */
    await Promise.all([
      getData("/data", prof1, "POST", "application/json")
      .then(response => response.json())
      .then(items => {
        /* Update everything here */
        setList({...list, "prof1" : items["0"]})
        
        let prof1_array = items["0"]
        /* Set short desc */
        let short_desc_array = prof1_array.slice(0, 2).map(x => x["short_desc"])
        console.log(short_desc_array);
        setDescription1(short_desc_array.join("\n").slice(0, 500)) // We should slice punctuation
        
        /* Set skills */
        let skills_objects_array = prof1_array.map(x => x["skills"])
        let skills_array = []

        skills_objects_array.forEach(skills_object => 
          skills_object.split(',').forEach(skill => 
            skills_array.push(skill)
          )
        );
        
        let counter = Counter(skills_array);
        let sortedCounter = Object.entries(counter).sort((a,b) => (b[1] - a[1]));
        skills_array = sortedCounter.map(x => x[0]);
        setSkillProf1(skills_array.slice(0, 30));
      })
      .catch(err => console.log(err)),
      getData("/data", prof2, "POST", "application/json")
      .then(response => response.json())
      .then(items => {
        /* Update everything here */
        setList({...list, "prof2" : items["0"]})
        
        /* Set short desc */
        let prof2_array = items["0"];
        let short_desc_array = prof2_array.slice(0,2).map(x => x["short_desc"]);
        setDescription2(short_desc_array.join("\n").slice(0, 500)) // We should slice punctuation

        /* Set skills */
        let skills_objects_array = prof2_array.map(x => x["skills"])
        let skills_array = []

        skills_objects_array.forEach(skills_object => 
          skills_object.split(',').forEach(skill => 
            skills_array.push(skill)
          )
        );
        
        let counter = Counter(skills_array);
        let sortedCounter = Object.entries(counter).sort((a,b) => (b[1] - a[1]));
        skills_array = sortedCounter.map(x => x[0]);
        setSkillProf2(skills_array.slice(0, 30));
    

      })
      .catch(err => console.log(err))
    ]);
    

    
  
  }

  useEffect(() => {
    setOverlaps(skillProf1, skillProf2)
  }, [skillProf1, skillProf2]);

  // var skillProf1 = ["hello", "yololo", "boiiiii"];
  // var skillOverlap = ["osahsvsv", "LISTOVERLAAAAP", "bromo"];
  // var listB = ["Ethan", "Harris", "Jason"];
  // var skillProf2 = null;

  // useEffect(() => {
  //   getData("./data", prof1)
  //     .then(data => data.json())
  //     .then(items => {
  //       setList(items)
  //     })
  // }, [])

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        
        <Typography variant="h4" align="center">
          Job Skill Comparator
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
                {(skillProf1 !== []) ? skillProf1.map(item => <p>{item}</p>) : <p>No skills for this profession</p>}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {(skillOverlap !== []) ? skillOverlap.map(item => <p>{item}</p>) : <p>No overlapping skills</p>}
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              {(skillProf2 !== []) ? skillProf2.map(item => <p>{item}</p>) : <p>No skills for this profession</p>}
            </Paper>
          </Grid>
        </Grid>

      </div>
    </Container>
  );
}
