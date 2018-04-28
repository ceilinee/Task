import React from 'react';
import moment from 'moment';
import axios from 'axios';
import UserID from './UserID';

export default class Project extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            projectName: [],
						project: false,
        }
  }
  componentWillMount() {
		if(this.props.projects.checked){
		this.setState({
			project: true,
		})
	  }
		else{
			this.setState({
				project: false,
			})
		}
	}
	handleChange = () => {
		if(!this.state.project){
			this.setState({
				project: true,
			})
			this.setTrue();
	  }
		else{
			this.setState({
				project: false,
			})
			this.setTrue();
		}
	}
	setTrue = () => {
		console.log(this.props.projects.Name);
    axios.put('/project/true', { name: this.props.projects.Name, idUsers: UserID.getID() })
    .then(response => console.log(response));
	}
  render(){
		console.log(this.props.projects.idProject);
    return(
				<div className = "box">
						<div>
								<div>
								<label>
									<input
										name="isGoing"
										type="checkbox"
										checked={this.state.project}
										onChange={this.handleChange} />
										{this.props.projects.Name}
								</label>
								</div>
						</div>
				</div>
        );
    }
  }
