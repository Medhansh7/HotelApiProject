import React, { Component } from "react";
import $ from "jquery";
import "./Navbar2.css";
import { Link, Redirect } from "react-router-dom";

export default class Navbar2 extends Component {
	constructor(props) {
		super(props);
		if (
			props.source === "login" ||
			props.source === "signup" ||
			props.source === "profile" ||
			props.source === "cart"
		) {
			this.state = {
				fixed: true
			};
		} else {
			this.state = {
				fixed: false
			};
		}
	}

	componentDidMount() {
		if (this.state.fixed === true) {
			$(".nav").addClass("affix");
		} else {
			$(window).scroll(function() {
				if ($(document).scrollTop() > 50) {
					$(".nav").addClass("affix");
					console.log("OK");
				} else {
					$(".nav").removeClass("affix");
				}
			});
		}
	}

	logOut = event => {
		// event.preventDefault()
		localStorage.removeItem("usertoken");
		// this.props.history.push(`/`)

		this.forceUpdate();
		return <Redirect to="/" />;
	};

	toggleNav = () => {
		$(this).toggleClass("active");
		console.log("Clicked menu");
		$("#mainListDiv").toggleClass("show_list");
		$("#mainListDiv").fadeIn();
	};

	render() {
		const loginreg = (
			<>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>
					<Link to="/signup">Signup</Link>
				</li>
			</>
		);

		const username = (
			<>
				<li>
					<Link to="/profile">User</Link>
				</li>
				<li>
					<Link to="/cart">Cart</Link>
				</li>
				<li>
					<Link to="/" onClick={this.logOut}>
						Logout
					</Link>
				</li>
			</>
		);

		return (
			<div>
				<nav class="nav">
					<div class="container">
						<div class="logo">
							<a href="#">Your Logo</a>
						</div>
						<div id="mainListDiv" class="main_list">
							<ul class="navlinks">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/Rooms">Rooms</Link>
								</li>
								{localStorage.usertoken ? username : loginreg}
							</ul>
						</div>
						<span class="navTrigger" onClick={this.toggleNav}>
							<i></i>
							<i></i>
							<i></i>
						</span>
					</div>
				</nav>
			</div>
		);
	}
}
