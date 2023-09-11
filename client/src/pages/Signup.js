import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { CREATE_USER } from '../utils/mutations';
import { Row, Col } from 'antd';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await createUser({
        variables: { ...userFormData },
      });
      if (!data.createUser) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await data.createUser;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', marginTop: '-115px' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <div style={styles.loginSignupBox}>
          <Link to="/login">← Go to Login</Link>
          <h2 style={styles.loginSignupHeading}>Signup</h2>
          <form onSubmit={handleFormSubmit}>
            <div style={styles.formRow}>
              <label htmlFor="firstName">First Name:</label>
              <input
                placeholder="First"
                name="firstName"
                type="text"
                id="firstName"
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <label htmlFor="lastName">Last Name:</label>
              <input
                placeholder="Last"
                name="lastName"
                type="text"
                id="lastName"
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <label htmlFor="email">Email:</label>
              <input
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <label htmlFor="pwd">Password:</label>
              <input
                placeholder="******"
                name="password"
                type="password"
                id="pwd"
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formRow}>
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </Col>
    </Row>
  );
};

const styles = {
  loginSignupBox: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '8px', // Add border radius for rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
  },
  loginSignupHeading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  formRow: {
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
  },
  submitButton: {
    backgroundColor: '#e67e22',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default SignupForm;
