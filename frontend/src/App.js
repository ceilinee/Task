import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import serverURL from './serverURL';
import { Tabs, TabLink, TabContent } from '../node_modules/react-tabs-redux';
import TextField from '../node_modules/material-ui/TextField';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import './App.css';
import './tab.css';
import UserID from './UserID';

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      email: '',
      password: ''}

    this.handleSignUp= this.handleSignUp.bind(this);
    this.handleLogIn= this.handleLogIn.bind(this);
  }
  componentDidMount() {
  }

  setEmail = (event) => {
      this.setState({
          email: event.target.value
      });
      console.log(this.state.email);
  }
  setPassword = (event) => {
      this.setState({
          password: event.target.value
      });
      console.log(this.state.password);
  }
  login(data){
    console.log(data);
    if(data!="Failed Login" && data!="No Email or Password"){
      console.log(data.Activated.idUsers);
      UserID.setID(data.Activated.idUsers);
      console.log(UserID.getID());
      this.handleOnClick()
    }
    else{
      alert("login failed");
    }
  }
  handleSignUp () {
    return axios.post('/users', { email: this.state.email, password: this.state.password })
    .then(response => console.log(response)).then(this.setState({email: '', password: ''}));
  }
  handleLogIn () {
    return axios.get('/users/'+this.state.email+'/'+this.state.password)
    .then(response => this.login(response.data));
  }
  handleOnClick = () => {
  this.setState({redirect: true});
  }
  render() {
    const styles = {
      errorStyle: {
        color: '#FF847C',
      },
      underlineFocusStyle: {
        borderColor: '#99B898',
      },
      floatingLabelStyle: {
        color: '#2A363B',
      },
      floatingLabelFocusStyle: {
        color: '#FF847C',
      },
    };
    if (this.state.redirect) {
    return <Redirect push to="/home" />;
    }
    return (
      <div className="App">
        <div className = "Post">
        <Tabs className="tabs tabs-1">
          <div className="tab-links">
            <TabLink to="tab1">Sign Up</TabLink>
            <TabLink to="tab2">Login</TabLink>
          </div>
          <TabContent for="tab1">
            <h1 className = "title">Sign Up</h1>
            <div className = 'text'>
              <MuiThemeProvider>
                <TextField
                floatingLabelText="Email"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                value={this.state.email}
                onChange={this.setEmail}/>
              </MuiThemeProvider>
            </div>
            <div className = 'text'>
              <MuiThemeProvider>
                <TextField floatingLabelText="Password"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                value={this.state.password}
                onChange={this.setPassword}/>
              </MuiThemeProvider>
            </div>
            <button className= "load" onClick={() => {
                this.handleSignUp().then(alert("Thanks for signing up, you can sign in now!"))}}>
              Sign Up
            </button>
          </TabContent>
          <TabContent for="tab2">
            <h1 className = "title">Login</h1>
            <div className = 'text'>
              <MuiThemeProvider>
                <TextField
                floatingLabelText="Email"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                value={this.state.email}
                onChange={this.setEmail}/>
              </MuiThemeProvider>
            </div>
            <div className = 'text'>
              <MuiThemeProvider>
                <TextField floatingLabelText="Password"
                floatingLabelStyle={styles.floatingLabelStyle}
                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                underlineFocusStyle={styles.underlineFocusStyle}
                value={this.state.password}
                onChange={this.setPassword}/>
              </MuiThemeProvider>
            </div>
            <button className= "load" onClick={this.handleLogIn}>
              Login
            </button>
          </TabContent>
        </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
