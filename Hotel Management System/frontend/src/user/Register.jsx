import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    uname: Yup.string()
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Phone number must be digits')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be at most 15 digits'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    axios.post('http://localhost:8080/user/register', {
      uname: values.uname,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
      role: 'USER' // Default to USER
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('User registered:', response);
      alert("Sign up successful");
      navigate('/login');
    })
    .catch(error => {
      console.error('Error during signup:', error);
    })
    .finally(() => {
      setSubmitting(false);
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="card rounded shadow" style={{ width: '400px' }}>
        <div className="card-body">
          <h2 className="text-center">Sign Up</h2>
          <Formik
            initialValues={{ uname: '', email: '', phoneNumber: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4">
                <div className="mb-3">
                  <label htmlFor="uname" className="form-label">Username:</label>
                  <Field type="text" className="form-control" id="uname" name="uname" />
                  <ErrorMessage name="uname" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <Field type="email" className="form-control" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                  <Field type="tel" className="form-control" id="phoneNumber" name="phoneNumber" />
                  <ErrorMessage name="phoneNumber" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <Field type="password" className="form-control" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  Register
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Register;