import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BookTableRow from "./BookTableRow";

export default class BookList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
		};
	}

	componentDidMount() {
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		axios
			.get("http://localhost:3000/books/")
			.then((res) => {
				this.setState({
					books: res.data,
				});
			})
			.catch((error) => {
				if(error.response.status === 401) {
					this.props.history.push("/login");
				}
				console.log(error);
			});
	}
	logout = () => {
		localStorage.removeItem('jwtToken');
		window.location.reload();
	 }
	DataTable() {
		return this.state.books.map((res, i) => {
			return <BookTableRow obj={res} key={i} />;
		});
	}

	render() {
		return (
			<>
			<div>
			  BOOK CATALOG &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button className="logout" onClick={this.logout}>Logout</button>
              }				
			</div>
			<div className="table-wrapper">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Auther</th>
							<th>Price</th>
							<th>quantity</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.DataTable()}</tbody>
				</Table>
			</div>

			</>
		);
	}
}
