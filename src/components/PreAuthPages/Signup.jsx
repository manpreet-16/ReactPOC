import { ErrorMessage, Field, Form, Formik } from 'formik'
import Toast from 'react-bootstrap/Toast';
import React, { useState } from 'react'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import ErrorCompenet from '../../shared/components/ErrorCompenet';
import axios from 'axios';
import { SIGNUP } from '../../shared/routes/ApiRoutes';

function Signup() {
  const [message,setMessage] = useState('')
  let navigate = useNavigate()

  let initialValues = {
    firstName: '',
    lastName:'',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: ''
  }

  let validationSchema = Yup.object({
    firstName: Yup.string().required('First Name Is Required !!'),
    lastName: Yup.string().required('Last Name Is Required !!'),
    email: Yup.string().required('Email Is Required !!').email('Email must be valid !!'),
    password: Yup.string().required('Password Is Required !!').max(10, 'Password cannot be more then 10 digits').min(5, 'Password must contains 5 digits'),
    confirmPassword: Yup.string().required('Confirm Password Is Required !!').max(10, 'Password cannot be more then 10 digits').min(5, 'Password must contains 5 digits'),
    mobileNumber: Yup.string().required('Mobile Number Is Required !!').matches('^[0-9]*$').min(10, 'Mobile Number cannot be less then 10 digits'),
  })

  let onSubmit = (values, submitForm) => {
    console.log("values ", values, submitForm)
    if(values?.password != values.confirmPassword){
      setMessage('Password does not Matched !!')
      return;
    }
    
    let payload = {
      emailId: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      firstName: values.lastName,
      lastName: values.lastName,
      roleId: 1,
      gender: 2
    }
    axios.post(SIGNUP,payload).then(response => {
        console.log(response,response.data)
        setMessage('Submit Form Successfully!!')
        navigate('/login')
      })
      .catch(error => {
        console.error(error);
      });
  }

  function comparePassword(event,setFieldValue){
    let { name , value } = event.target
    setFieldValue(name,value)
  }

  return (
    <>
    {
      message ? <>
      {['Warning'].map((variant, idx) => (
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
          console.log("props",props)
          return (
           <Form className="form-container">
          <h2 className="form-title">Sign Up</h2>

          <div className="form-row">
            <label htmlFor="firstName">First Name</label>
            <Field id='firstName' placeholder="Enter First Name" type="text" className="form-input" name="firstName"></Field>
            <ErrorMessage name="firstName" component={ErrorCompenet}></ErrorMessage>
          </div>

          <div className="form-row">
            <label htmlFor="lastName">Last Name</label>
            <Field id='lastName' placeholder="Enter Last Name" name="lastName" type="text" className="form-input"></Field>
            <ErrorMessage name="lastName" component={ErrorCompenet}></ErrorMessage>
          </div>

           <div className="form-row">
            <label htmlFor="email">E-mail</label>
            <Field id='email' placeholder="Enter Email" name="email" type="text" className="form-input"></Field>
            <ErrorMessage name="email" component={ErrorCompenet}></ErrorMessage>
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <Field id='password' placeholder="Enter password" name="password" type="password" className="form-input"></Field>
            <ErrorMessage name="password" component={ErrorCompenet}></ErrorMessage>
          </div>

          <div className="form-row">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field id='confirmPassword' placeholder="Enter confirm password" name="confirmPassword" type="password" className="form-input"></Field>
            <ErrorMessage name="confirmPassword" component={ErrorCompenet}></ErrorMessage>
          </div>

          <div className="form-row">
            <label htmlFor="mobileNumber">Mobile No:</label>
            <Field id='mobileNumber' placeholder="Enter mobileNo" name="mobileNumber" type="number" className="form-input"></Field>
            <ErrorMessage name="mobileNumber" component={ErrorCompenet}></ErrorMessage>
          </div>

          <div className="form-row">
            <Link to="/login" className="form-link">
              Already have an account? Log in here.
            </Link>
          </div>

          <button type="submit" className="submit-btn">Signup</button>
          </Form>
          )
        }
      }
    </Formik>
    </>
  )
}

export default Signup
