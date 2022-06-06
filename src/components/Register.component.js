import React, { Component } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
class Create extends Component {

  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      message: ''
    };
  }
  onChangeUserName = (e) => {
    //const state = this.state
    //state[e.target.name] = e.target.value;
    this.setState({username: e.target.value});
  }

  onChangePassword = (e) => {
    //const state = this.state
    //state[e.target.name] = e.target.value;
    this.setState({password: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    //const { username, password } = this.state;
    const userObject = {
        username: this.state.username,
        password: this.state.password,
    }
    axios.post("http://localhost:3000/auth/register", userObject)
      .then((result) => {
        localStorage.setItem('jwtToken', result.data.token);
        this.setState({ message: '' });
        this.props.history.push('/')
      });
      
  }

  render() {
  //  const { username, password, message } = this.state;
    return (
      <div className="container">
        <Form onSubmit={this.onSubmit}>

          <h2 >Register</h2>
            <Form.Group controlId="Name">
						<Form.Label>User Name</Form.Label>
						<Form.Control
							type="text"
							value={this.state.username}
							onChange={this.onChangeUserName}
						/>
			</Form.Group>
            <Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							value={this.state.password}
              autoComplete="on"
							onChange={this.onChangePassword}
						/>
			</Form.Group>
            <Button
						variant="primary"
						size="lg"
						block="block"
						type="submit"
						className="mt-4"
					>
						Register
		    </Button>
        

        </Form>
      </div>
    );
  }
}

export default Create;