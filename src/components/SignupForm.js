import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authenticateUser } from "../redux/actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../logo.png";
import { pink } from '@material-ui/core/colors';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
        Convo
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(10),
    width: theme.spacing(45),
    height: theme.spacing(45),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  input: {
    color: "#ffffff",
  },
}));

const SignupForm = (props) => {
  const classes = useStyles();
  let history = useHistory();
  //console.log(useHistory())
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userData;

  const handleChange = (event) => {
    console.log("name", event.target.name);
    console.log("value", event.target.value);
    return setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submited");
    props.signup(userData, history);
  };

  if (props.user) return <Redirect to="/" />;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="logo" src={logo} className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" className={classes.input}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (userData, history) =>
      dispatch(authenticateUser(userData, history, "signup")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
