import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignStart, emailSignInStart } from '../../redux/user/user.actions';


import './sign-in.styles.scss';


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        // dispatch
        emailSignInStart(email, password);
    }

    handleChange = event => {
        const { value, name } = event.target;

        // name puede ser email o password, por entre [], para hacerlo dinamicamente
        this.setState({ [name]: value })
    }

    render() {
        const { googleSignStart } = this.props;

        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit} >
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='email'
                        required />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='password'
                        required />
                    <div className="buttons">
                        <CustomButton type='submit'>Sign in</CustomButton>
                        <CustomButton
                            type='button'
                            onClick={googleSignStart}
                            isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>

            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    googleSignStart: () => dispatch(googleSignStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);