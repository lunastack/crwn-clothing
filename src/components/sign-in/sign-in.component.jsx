import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignStart, emailSignInStart } from '../../redux/user/user.actions';


import './sign-in.styles.scss';


const SignIn = ({ emailSignInStart, googleSignStart }) => {

    const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
    const { email, password } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();


        // dispatch
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    }


    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    name='email'
                    type='email'
                    value={email}
                    handleChange={handleChange}
                    label='email'
                    required />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
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

const mapDispatchToProps = dispatch => ({
    googleSignStart: () => dispatch(googleSignStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);