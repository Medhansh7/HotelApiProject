import React, { Component } from "react";
// import items from "./data";
// import Client from "./Contentful.js";

const RoomContext = React.createContext();

export default class RoomProvider extends Component {
	state = {
		rooms: [],
		sortedRooms: [],
		featuredRooms: [],
		loading: true,
		//
		type: "all",
		capacity: 1,
		price: 0,
		minPrice: 0,
		maxPrice: 0,
		minSize: 0,
		maxSize: 0,
		breakfast: false,
		pets: false
	};

	getHotelData = () => {
		console.log(localStorage.getItem("place"));
		console.log(localStorage.getItem("Start"));
		console.log(localStorage.getItem("End"));
		let rooms = [];

		let that = this;

		let temprooms = [];

		let place = localStorage.getItem("place");
		// place = "Delhi";

		console.log("Context Js Page", place);

		fetch(
			`https://nexus.prod-env.vervotech.com/api/locations/locationcontent/autosuggest?term=${place}&countries=IN`,
			{
				method: "GET"
			}
		).then(res => {
			res.json().then(place => {
				console.log(place.locationSuggestions[0].id);
				fetch(
					`https://nexus.prod-env.vervotech.com/api/locations/locationcontent/location/${place.locationSuggestions[0].id}?getSublocations=true`,
					{
						method: "GET"
					}
				).then(function(response) {
					response.json().then(function(coordinates) {
						// console.log(coordinates.boundaries);
						var opts = {
							channelId: "demoChannel",
							culture: "en-US",
							checkIn: localStorage.getItem("Start"),
							checkOut: localStorage.getItem("End"),
							multiPolygonalRegion: {
								polygons: [
									{
										coordinates: coordinates.boundaries[0],
										id: null
									}
								]
							},
							polygonalRegion: null,
							hotelIds: null
						};
						fetch(
							"https://nexus.dev-env.vervotech.com/api/content/hotelcontent/getHotelContent",
							{
								method: "POST",
								body: JSON.stringify(opts),
								headers: {
									"Content-Type":
										"application/json; charset=utf-8",
									"Accept-Encoding": " gzip, deflate",
									"customer-ip": "",
									correlationId:
										"764388c8-123d-1279-1f3e-587d9250f95c",
									accountId: "demoAccount"
								}
							}
						).then(function(response) {
							response.json().then(function(data) {
								var roomid = data.hotels.map(elem => {
									return elem.id;
								});
								fetch(
									"https://nexus.dev-env.vervotech.com/api/content/hotelcontent/getHotelContent",
									{
										method: "POST",
										body: JSON.stringify({
											channelId: "demoChannel",
											culture: "en-US",
											hotelIds: roomid,
											contentFields: ["All"],
											providerPrefs: []
										}),
										headers: {
											"Content-Type":
												"application/json; charset=utf-8",
											"Accept-Encoding": " gzip, deflate",
											"customer-ip": "",
											correlationId:
												"764388c8-123d-1279-1f3e-587d9250f95c",
											accountId: "demoAccount"
										}
									}
								).then(function(response) {
									response.json().then(function(hoteldata) {
										temprooms = hoteldata.hotels.map(
											elem => {
												let room = {
													id: elem.id,
													name: elem.name,
													slug: elem.id,
													type: "single",
													price: 150,
													size: 250,
													capacity: 1,
													pets: false,
													breakfast: false,
													fearured: false,
													images: elem.images.map(
														elem => {
															return elem.links[0]
																.url;
														}
													),
													description: elem.descriptions
														.map(elem => {
															return elem.text;
														})
														.join(""),
													extras: elem.facilities.map(
														elem => {
															return elem.name;
														}
													)
												};
												return room;
											}
										);
										console.log(temprooms);
										rooms = temprooms;
										let featuredRooms = rooms.filter(
											room => room.featured === true
										);
										//
										let maxPrice = Math.max(
											...rooms.map(item => item.price)
										);
										let maxSize = Math.max(
											...rooms.map(item => item.size)
										);
										that.setState({
											rooms,
											featuredRooms,
											sortedRooms: rooms,
											loading: false,
											//
											price: maxPrice,
											maxPrice,
											maxSize
										});
									});
								});
							});
						});
					});
				});
			});
		});
	};

	getRoom = slug => {
		let tempRooms = [...this.state.rooms];
		const room = tempRooms.find(room => room.slug === slug);
		return room;
	};
	handleChange = event => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;
		console.log(name, value);

		this.setState(
			{
				[name]: value
			},
			this.filterRooms
		);
	};
	filterRooms = () => {
		let {
			rooms,
			type,
			capacity,
			price,
			minSize,
			maxSize,
			breakfast,
			pets
		} = this.state;

		let tempRooms = [...rooms];
		// transform values
		// get capacity
		capacity = parseInt(capacity);
		price = parseInt(price);
		// filter by type
		if (type !== "all") {
			tempRooms = tempRooms.filter(room => room.type === type);
		}
		// filter by capacity
		if (capacity !== 1) {
			tempRooms = tempRooms.filter(room => room.capacity >= capacity);
		}
		// filter by price
		tempRooms = tempRooms.filter(room => room.price <= price);
		//filter by size
		tempRooms = tempRooms.filter(
			room => room.size >= minSize && room.size <= maxSize
		);
		//filter by breakfast
		if (breakfast) {
			tempRooms = tempRooms.filter(room => room.breakfast === true);
		}
		//filter by pets
		if (pets) {
			tempRooms = tempRooms.filter(room => room.pets === true);
		}
		this.setState({
			sortedRooms: tempRooms
		});
	};
	render() {
		if (localStorage.getItem("place") !== null) {
			this.getHotelData();
			localStorage.removeItem("place");
		}
		return (
			<RoomContext.Provider
				value={{
					...this.state,
					getRoom: this.getRoom,
					handleChange: this.handleChange
				}}
			>
				{this.props.children}
			</RoomContext.Provider>
		);
	}
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };

export function withRoomConsumer(Component) {
	return function ConsumerWrapper(props) {
		return (
			<RoomConsumer>
				{value => <Component {...props} context={value} />}
			</RoomConsumer>
		);
	};
}
