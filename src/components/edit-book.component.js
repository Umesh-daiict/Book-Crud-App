import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditBook extends Component {
	constructor(props) {
		super(props);

		this.onChangeBookName = this.onChangeBookName.bind(this);
		this.onChangeBookAuther = this.onChangeBookAuther.bind(this);
		this.onChangeBookPrice = this.onChangeBookPrice.bind(this);
		this.onChangeBookQuantity = this.onChangeBookQuantity.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		// State
		this.state = {
			name: "",
			auther: "",
			price: "",
			quantity: "",
		};
	}

	componentDidMount() {
		axios
			.get(
				"http://localhost:3000/books/edit-book/" +
					this.props.match.params.id
			)
			.then((res) => {
				this.setState({
					name: res.data.name,
					auther: res.data.auther,
					price: res.data.price,
					quantity: res.data.quantity,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onChangeBookName(e) {
		this.setState({ name: e.target.value });
	}

	onChangeBookAuther(e) {
		this.setState({ auther: e.target.value });
	}

	onChangeBookPrice(e) {
		this.setState({ price: e.target.value });
	}
	onChangeBookQuantity(e) {
		this.setState({ quantity: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const bookObject = {
			name: this.state.name,
			auther: this.state.auther,
			price: this.state.price,
			quantity: this.state.quantity,
		};

		axios
			.put(
				"http://localhost:3000/books/update-book/" +
					this.props.match.params.id,
				bookObject
			)
			.then((res) => {
				console.log(res.data);
				console.log("Book successfully updated");
			})
			.catch((error) => {
				console.log(error);
			});

		// Redirect to Book List
		this.props.history.push("/book-list");
	}

	render() {
		return (
			<div className="form-wrapper">
				<Form onSubmit={this.onSubmit}>
					<Form.Group controlId="Name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={this.state.name}
							onChange={this.onChangeBookName}
						/>
					</Form.Group>

					<Form.Group controlId="Auther">
						<Form.Label>Auther</Form.Label>
						<Form.Control
							type="text"
							value={this.state.auther}
							onChange={this.onChangeBookAuther}
						/>
					</Form.Group>

					<Form.Group controlId="Name">
						<Form.Label>Price</Form.Label>
						<Form.Control
							type="text"
							value={this.state.price}
							onChange={this.onChangeBookPrice}
						/>
					</Form.Group>

					<Form.Group controlId="Quantity">
						<Form.Label>Quantity</Form.Label>
						<Form.Control
							type="text"
							value={this.state.quantity}
							onChange={this.onChangeBookQuantity}
						/>
					</Form.Group>

					<Button
						variant="danger"
						size="lg"
						block="block"
						type="submit"
					>
						Update Book
					</Button>
				</Form>
			</div>
		);
	}
}
