import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { Spacing, Container } from 'components/Layout';
import { H1, Error } from 'components/Text';
import { InputText, Button } from 'components/Form';
import Head from 'components/Head';

import { SIGN_UP } from 'graphql/user';

import * as Routes from 'routes';

const Root = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 60px;

  @media (min-width: ${p => p.theme.screen.md}) {
    justify-content: space-between;
    margin-top: 120px;
  }
`;

const Welcome = styled.div`
  display: none;
  flex-direction: column;
  color: ${p => p.theme.colors.white};
  max-width: ${p => p.theme.screen.xs};

  @media (min-width: ${p => p.theme.screen.md}) {
    display: flex;
  }
`;

const Heading = styled(H1)`
  margin-bottom: ${p => p.theme.spacing.sm};
`;

const Form = styled.div`
  padding: ${p => p.theme.spacing.md};
  border-radius: ${p => p.theme.radius.sm};
  background-color: rgb(240, 233, 146) ;
  width: 100%;

  @media (min-width: ${p => p.theme.screen.sm}) {
    width: 450px;
  }
`;

/**
 * 
 * Extra components 
 */
const InputTextarea = styled.textarea`
  outline: 0;
  height: ${p => ( '120px')};
  width: 100%;
  transition: border 0.1s;
  border-radius: ${p => p.theme.radius.sm};
  padding-left: ${p => p.theme.spacing.xs};
  border: 1px solid
    ${p =>
      p.borderColor
        ? p.theme.colors[p.borderColor]
        : p.theme.colors.border.main};
  color: ${p => p.theme.colors.text.secondary};

  &:focus {
    border-color: ${p => p.theme.colors.border.main};
  }
  
`;

 const TextMessage =styled.label`
 font-size: ${p => p.theme.font.size.xxs};
 color: ${p => p.theme.colors.text.secondary};
 padding-left: ${p => p.theme.spacing.xs};
 `;

/**
 * Sign Up page
 */
const SignUp = ({ history, refetch }) => {
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    linkedInUrl:'',
    headLine:'',
  });
  const [checked, setChecked]= useState({
    isPage:false,
  });
  const handleCheckboxChange =e => {
    const name = e.target.name;
    const value= e.target.checked;
    setChecked({ ...checked, [name]: value });
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const validate = () => {
    if (!fullName || !email || !username || !password || !linkedInUrl || !headLine) {
      return 'All fields are required';
    }

    if (fullName.length > 50) {
      return 'Full name no more than 50 characters';
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
      return 'Enter a valid email address.';
    }

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
    if (!usernameRegex.test(username)) {
      return 'Usernames can only use letters, numbers, underscores and periods';
    } else if (username.length > 20) {
      return 'Username no more than 50 characters';
    }

    if (password.length < 6) {
      return 'Password min 6 characters';
    }

    return false;
  };

  const handleSubmit = (e, signup) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      setError(error);
      return false;
    }

    signup().then(async ({ data }) => {
      localStorage.setItem('token', data.signup.token);
      await refetch();
      history.push(Routes.HOME);
    });
  };

  const renderErrors = apiError => {
    let errorMessage;

    if (error) {
      errorMessage = error;
    } else if (apiError) {
      errorMessage = apiError.graphQLErrors[0].message;
    }

    if (errorMessage) {
      return (
        <Spacing bottom="sm" top="sm">
          <Error>{errorMessage}</Error>
        </Spacing>
      );
    }

    return null;
  };

  const { fullName, email, password, username, linkedInUrl, headLine  } = values;
  const {isPage} = checked; 

  return (
    <Mutation
      mutation={SIGN_UP}
      variables={{ input: { fullName, email, password, username, linkedInUrl, headLine, isPage } }}
    >
      {(signup, { loading, error: apiError }) => {
        return (
          <Root maxWidth="lg">
            <Head />

            <Welcome>
              <div>
                <Heading color="white">
                  Connect with friends and the world around you.
                </Heading>
              </div>

              <p>See photos and updates from your friends.</p>
              <p>Follow your interests.</p>
              <p>Hear what people are talking about.</p>
            </Welcome>

            <Form>
              <Spacing bottom="md">
                <H1>Create Account</H1>
              </Spacing>

              <form onSubmit={e => handleSubmit(e, signup)}>
                <InputText
                  type="text"
                  name="fullName"
                  values={fullName}
                  onChange={handleChange}
                  placeholder="Full name"
                  borderColor="white"
                />
                <Spacing top="xs" bottom="xs">
                  <InputText
                    type="text"
                    name="email"
                    values={email}
                    onChange={handleChange}
                    placeholder="Email"
                    borderColor="white"
                  />
                </Spacing>
                <InputText
                  type="text"
                  name="username"
                  values={username}
                  onChange={handleChange}
                  placeholder="Username"
                  borderColor="white"
                />
                <Spacing top="xs" bottom="xs">
                  <InputText
                    type="password"
                    name="password"
                    values={password}
                    onChange={handleChange}
                    placeholder="Password"
                    borderColor="white"
                  />
                </Spacing>
                
                <InputText
                  type="text"
                  name="linkedInUrl"
                  values={linkedInUrl}
                  onChange={handleChange}
                  placeholder="LinkedIn Profile Url"
                  borderColor="white"
                />
                <Spacing top="xs" bottom="xs">
                <InputTextarea
                    type="textarea"
                    name="headLine"
                    values={headLine}
                    onChange={handleChange}
                    placeholder="Profile headLine/description"
                    borderColor="white"
                  />
                </Spacing>

                <Spacing top="xs" bottom="xs">
                
                <input 
                  type="checkbox" 
                  name="isPage"
                  onChange={handleCheckboxChange} 
                  defaultChecked={isPage}
                  />
		             <TextMessage>
                    Are you creating a page ? {checked.isPage}
                 </TextMessage>
                </Spacing>

                {renderErrors(apiError)}

                <Spacing top="sm" />
                <Button size="large" disabled={loading}>
                  Sign up
                </Button>
              </form>
            </Form>
          </Root>
        );
      }}
    </Mutation>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default withRouter(SignUp);
