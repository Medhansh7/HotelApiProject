import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Context from "../../Context";
import "./Navbar1.css";
import {
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem
} from "mdbreact";
// import { FaBlackTie } from "react-icons/fa";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
// import Autocomplete from "react-google-autocomplete";

import PlacesAutocomplete from "react-places-autocomplete";
import {
	geocodeByAddress,
	geocodeByPlaceId,
	getLatLng
} from "react-places-autocomplete";

export default class Navbar1 extends Component {
	state = {
		StartDate: "",
		EndDate: "",
		address: "",

		lat: null,
		long: null,
		toDashboard: false
	};

	onStartChange = (date, dateString) => {
		this.setState({ StartDate: dateString });
	};

	onEndChange = (date, dateString) => {
		this.setState({ EndDate: dateString });
	};

	sendData = () => {
		localStorage.setItem("place", this.state.address);
		localStorage.setItem("Start", this.state.StartDate);
		localStorage.setItem("End", this.state.EndDate);
		// this.props.getHotelData;
		console.log("Saved");
		this.setState({ toDashboard: true });
	};

	page = () => {
		console.log("send Data");
		this.setState({ toDashboard: true });
		// return <Redirect exact to="/Rooms/" />;
	};

	handleChange = address => {
		this.setState({ address });
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => console.log("Success", latLng))
			.catch(error => console.error("Error", error));
	};

	render() {
		console.log(this.state.address);
		if (this.state.toDashboard === true) {
			return <Redirect to="/Rooms" />;
		}
		return (
			<div>
				<div>
					<link href="./Navbar1.css" rel="stylesheet" />
					<div className="s002">
						<form>
							<fieldset>
								<legend>SEARCH HOTEL</legend>
							</fieldset>
							<div className="inner-form">
								<div className="input-field first-wrap">
									<div className="icon-wrap">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											viewBox="0 0 24 24"
										>
											<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
										</svg>
									</div>

									<PlacesAutocomplete
										value={this.state.address}
										onChange={this.handleChange}
									>
										{({
											getInputProps,
											suggestions,
											getSuggestionItemProps,
											loading
										}) => (
												<div>
													<input
														{...getInputProps({
															placeholder:
																"Search Places",
															className:
																"location-search-input"
														})}
													/>
													<div className="autocomplete-dropdown-container">
														{loading && (
															<div>Loading...</div>
														)}
														{suggestions.map(
															suggestion => {
																const className = suggestion.active
																	? "suggestion-item--active"
																	: "suggestion-item";
																// inline style for demonstration purpose
																const style = suggestion.active
																	? {
																		backgroundColor:
																			"#fafafa",
																		cursor:
																			"pointer"
																	}
																	: {
																		backgroundColor:
																			"#ffffff",
																		cursor:
																			"pointer"
																	};
															}
														)}
													</div>
												</div>
											)}
									</PlacesAutocomplete>
								</div>
								<div className="input-field second-wrap">
									<div className="icon-wrap">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											viewBox="0 0 24 24"
										>
											<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
										</svg>
									</div>

									<DatePicker
										onChange={this.onStartChange}
										placeholder="Checkin"
									/>
								</div>
								<div className="input-field second-wrap">
									<div className="icon-wrap">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={24}
											height={24}
											viewBox="0 0 24 24"
										>
											<path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
										</svg>
									</div>
									<DatePicker
										onChange={this.onEndChange}
										placeholder="Checkout"
									/>
								</div>

								<div className="input-field fifth-wrap">
									<button
										className="btn-search"
										onClick={this.sendData}
									>
										SEARCH
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
