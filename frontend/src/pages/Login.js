import React, { Component } from 'react'
import "./Signup.css"
import { Link } from 'react-router-dom'

export default class Login extends Component {
    render() {
        return (
            <div>
                <div className="container">

                    <div className="card bg-light" >
                        <article className="card-body mx-auto" style={{ width: 400 }}>
                            <h4 className="card-title mt-3 text-center">Login</h4>
                            <p className="text-center">With you existing account</p>
                            <p>
                                <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i>   Login via Twitter</a>
                                <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>   Login via facebook</a>
                            </p>
                            <p className="divider-text">
                                <span className="bg-light">OR</span>
                            </p>
                            <form>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Email address" type="email" />
                                </div>


                                {/* </div> */}
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                    </div>
                                    <input className="form-control" placeholder="Password" type="password" />
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"> Login  </button>
                                </div>
                                <Link className="text-center">Create New Account ? <Link to="/signup">SignUp</Link> </Link>
                            </form>
                        </article>
                    </div>
                </div >
            </div>
        )
    }
}
