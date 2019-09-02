import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { trySignUp } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withStyles } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class SignIn extends Component {
  state = {
    phone: "",
    otp: "",
    isOTPSent: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  componentWillUnmount() {
    this.props.trySignUp();
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.isOTPSent) {
      this.props.signIn(this.state.phone);
    } else {
      window.confirmationResult
        .confirm(this.state.otp)
        .then(console.log("login done"));
    }
    //console.log(this.state.isOTPSent);
    this.setState({ isOTPSent: !this.state.isOTPSent });
    //console.log(this.state.isOTPSent);
  };

  render() {
    const { authError, auth, classes } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            {!this.state.isOTPSent && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="tel"
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                autoFocus
                onChange={this.handleChange}
              />
            )}

            {this.state.isOTPSent && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="otp"
                label="OTP"
                name="otp"
                autoFocus
                onChange={this.handleChange}
              />
            )}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <div className="input-field">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                id="loginButtonId"
                onClick={this.state.isOTPSent ? this.handleSubmit : null}
                className={classes.submit}
              >
                {this.state.isOTPSent ? "Login" : "Get OTP"}
              </Button>

              <div className="red-text center">
                {authError ? <p>{authError}</p> : null}
              </div>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

const styles = theme => ({
  "@global": {
    body: {
      backgroundColor: "white"
    }
  },
  paper: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: 1,
    backgroundColor: "red"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 1
  },
  submit: {
    margin: (3, 0, 2)
  }
});

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: phoneNumber => dispatch(signIn(phoneNumber)),
    trySignUp: () => dispatch(trySignUp())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignIn));
