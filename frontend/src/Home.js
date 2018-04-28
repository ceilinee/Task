import React, { Component } from 'react';
import UserID from './UserID';
import { Tabs, TabLink, TabContent } from '../node_modules/react-tabs-redux';
import TextField from '../node_modules/material-ui/TextField';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import getMuiTheme from '../node_modules/material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { yellow500, deepPurpleA100, deepPurpleA200, deepPurpleA400 } from 'material-ui/styles/colors';
import Add from '../node_modules/material-ui-icons/Add.js';
import Modal from 'react-modal';
import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import Task from './task.png';
import Error from './error.png';
import Project from './Project';
import './home.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      open: false,
      projectName : '',
      date: '',
      project: [],
      width: 0,
      height: 0,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentWillMount() {
    this.fetchProject();
  }
  fetchProject = () => {
    fetch('/project/' + UserID.getID(), {
			accept: 'application/json',
		}).then((response) => response.json()).then(response => {
			this.setProject(response);
		});
  }
  setProject = (data) => {
    console.log(data);
    this.setState({
      project: data,
    })
  }
  openModal() {
    this.setState({
      open: true,
    })
  }
  closeModal() {
    this.setState({
      open: false,
    })
  }
  setProjectName = (event) => {
    this.setState({
      projectName : event.target.value,
    })
    console.log(this.state.projectName);
  }
  handleAddProject = () => {
    return axios.post('/users/project', { name: this.state.projectName, date: this.state.date , idUsers: UserID.getID()})
    .then(response => console.log(response)).then(this.setState({name: '', date: ''}));
  }
  setDate = (event) => {
    this.setState({
      date : event,
    })
    console.log(this.state.date);
  }
  modalAddProject() {
    const styles = {
      errorStyle: {
        color: '#FF847C',
      },
      underlineFocusStyle: {
        borderColor: 'rgb(0, 188, 212)',
      },
      floatingLabelStyle: {
        color: '#2A363B',
      },
      floatingLabelFocusStyle: {
        color: '#FF847C',
      },
    };
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    console.log("hi");
    return(
      <Modal ariaHideApp={false} isOpen={this.state.open} onRequestClose={this.closeModal} style={customStyles}>
        <div className = 'text'>
          <h2 className = 'head'> New Task </h2>
          <MuiThemeProvider>
            <TextField
              floatingLabelText="Name"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
              value={this.state.projectName}
              onChange={this.setProjectName}/>
          </MuiThemeProvider>
        </div>
        <MuiThemeProvider>
          <TextField
            floatingLabelText="Time Due"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            value={this.state.date}
            onChange={this.setDate}/>
        </MuiThemeProvider>
        <button className= "addButton" onClick={() => {
            this.handleAddProject().then(alert("New Project Added!"))}}>
            Add Project
        </button>
      </Modal>
    )
  }
  render() {
    if(this.state.width > 560){
      return (
        <div>
          <img src={Error} className="Error"/>
          <div className="Message">
          This webapp is only optimized for mobile devices, sorry for the inconvenience!
          </div>
        </div>
      )
    }
    else{
    return (
      <div>
      <div className = "block">
        <div className = "project">
          <img src={Task} className="task"/>
          <div className = "add">
              <div className = "plus" onClick={this.openModal}>
              +
              </div>
          </div>
          {this.modalAddProject()}
          {this.state.project.map(projects =>
              <Project
              key={projects.idProject}
              projects={projects}
            />
          )}
        </div>
      </div>
      </div>
    );
  }
  }
}

export default Home;
