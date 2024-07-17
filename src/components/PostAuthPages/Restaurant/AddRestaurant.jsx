import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';
import ErrorCompenet from '../../../shared/components/ErrorCompenet';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addRestaurant } from '../../../shared/services/RestaurantService';


function AddRestaurant(props) {
  let {setRestaurantState,getRestaurantList} = props

  let initialValues = {
    name: '',
    description: ''
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('Restaurant Name is Required !!').min(3),
    description: Yup.string().required('Description is Required !!').min(10).max(50)
  })

  let onSubmit = async (values) => {
    let payload = {
      name : values.name,
      description : values.description
    }

    let data = await addRestaurant(payload)
    if(data){
      handleClose()
      getRestaurantList()
    }
    
  }

  let handleClose = ()=>{
    setRestaurantState('')
  }

  return (
      <>
      <Modal show="true" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h2 className="form-title">Add Restaurant !!</h2></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {
              props => {
                return (
                  <Form className="form-container">

                    <div className="form-row">
                      <label htmlFor="name">Name</label>
                      <Field id='name' placeholder="Enter Name" type="text" className="form-input" name="name"></Field>
                      <ErrorMessage name="name" component={ErrorCompenet}></ErrorMessage>
                    </div>

                    <div className="form-row">
                      <label htmlFor="description">Description</label>
                      <Field id='description' placeholder="Enter Description" name="description" type="text" className="form-input"></Field>
                      <ErrorMessage name="description" component={ErrorCompenet}></ErrorMessage>
                    </div>

                    <div className="form-row">
                      <Button variant="secondary" type="button" onClick={handleClose}>Close</Button>&nbsp;
                      <Button variant="warning" type="submit">Save changes</Button>
                    </div>

                  </Form>
                )
              }
            }
          </Formik>
        </Modal.Body>
      </Modal>
      </>
  );
}

export default AddRestaurant
