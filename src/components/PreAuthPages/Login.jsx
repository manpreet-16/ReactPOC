import { ErrorMessage, Field, Form, Formik } from 'formik'
import Toast from 'react-bootstrap/Toast';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ErrorCompenet from '../../shared/components/ErrorCompenet';
import axios from 'axios';
import { useAuth } from '../../shared/providers/AuthProvider';
import { LOGIN } from '../../shared/routes/ApiRoutes';

function Login() {
  let { userState, setUserState } = useAuth()
  const [message, setMessage] = useState('')
  let navigate = useNavigate()

  let initialValues = {
    email: '',
    password: '',
  }

  let validationSchema = Yup.object({
    email: Yup.string().required('Email Is Required !!').email('Email must be valid !!'),
    password: Yup.string().required('Password Is Required !!').max(10, 'Password cannot be more then 10 digits').min(5, 'Password must contains 5 digits'),
  })

  let onSubmit = (values, submitForm) => {
    console.log("values ", values, submitForm)
    let payload = {
      emailId: values.email,
      password: values.password
    }

    axios.post(LOGIN, payload).then(response => {
      let data = response.data
      if (data && data?.data?.accessToken) {
        setUserState(data.data.accessToken)
        localStorage.setItem('token', JSON.stringify(data.data.accessToken))
        navigate('/dashboard')
      }
    })
      .catch(error => {
        console.error(error);
      });

  }

  return (
    <>
      {
        message ? <>
          {['Info'].map((variant, idx) => (
            <Toast
              className="d-inline-block m-1"
              bg={variant.toLowerCase()}
              key={idx}
            >
              <Toast.Body className={variant === 'Dark' && 'text-white'}>
                {message}
              </Toast.Body>
            </Toast>
          ))}
        </> : ''
      }
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {
          props => {
            console.log("props", props)
            return (
              <Form className="form-container">
              <h2 className="form-title">Log In</h2>
    
              <div className="form-row">
                <label htmlFor="email">E-mail</label>
                <Field id='email' placeholder="Enter email" type="text" className="form-input" name="email"></Field>
                <ErrorMessage name="email" component={ErrorCompenet}></ErrorMessage>
              </div>
    
              <div className="form-row">
                <label htmlFor="password">Password</label>
                <Field id='password' placeholder="Enter password" name="password" type="password" className="form-input"></Field>
                <ErrorMessage name="password" component={ErrorCompenet}></ErrorMessage>
              </div>
    
              <div className="form-row">
                <Link to="/signup" className="form-link">
                Do not have account? Signup
                </Link>
              </div>
    
              <button type="submit" className="submit-btn">Log In</button>
              </Form>
            )
          }
        }
      </Formik>
    </>
  )
}

export default Login
