import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateBook extends Component {
	constructor(props) {
		super(props);

		// Setting up functions
		this.onChangeBookName = this.onChangeBookName.bind(this);
		this.onChangeBookAuther = this.onChangeBookAuther.bind(this);
		this.onChangeBookPrice = this.onChangeBookPrice.bind(this);
		this.onChangeBookQuantity = this.onChangeBookQuantity.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		// Setting up state
		this.state = {
			name: "",
			auther: "",
			price: "",
			quantity:"",
		};
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

	onChangeBookQuantity(e){
		this.setState({quantity: e.target.value});
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
			.post(
				"http://localhost:3000/books/create-book",
				bookObject
			)
			.then((res) => console.log(res.data));

		this.setState({ name: "", auther: "", price: "",quantity: "" });
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
						<Form.Label>quantity</Form.Label>
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
						className="mt-4"
					>
						Create Book
					</Button>
				</Form>
			</div>
		);
	}
}
