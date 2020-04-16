import React, { Component } from "react";

import "./sign-in.styles.scss";
import FormInput from '../form-input/form-input.component'
import CustomButton from "../custom-button/custom-button.component";

import {signInWithGoogle, auth} from "../../firebase/firebase.utils";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state

    try{
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({ email: "", password: "" });
    } catch(error){
      console.log(error)
    }

    // console.log(event)
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    // console.log(value,name)
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required={true}
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required={true}
          />
          <div className="buttons">
          <CustomButton type="submit" value="Subit Form"> Sign In </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn >
            {''}
             Sign In With Google {''} </CustomButton>
             </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
