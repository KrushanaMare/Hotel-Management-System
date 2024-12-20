import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      // .min(6, 'Password must be at least 6 characters'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", values);
      alert("Sign in successful");
      const { uid, email, role } = response.data; // Assuming role is returned from the backend

      // Redirect based on role
      if (role === "ADMIN") {
        navigate('/admin-nav', { state: { uid, email } }); // Redirect to user management
      } else {
        navigate('/rooms', { state: { uid, email } }); // Redirect to available rooms
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="card rounded shadow" style={{ width: '400px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Sign In</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <Field type="email" className="form-control" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <Field type="password" className="form-control" id="password" name="password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;