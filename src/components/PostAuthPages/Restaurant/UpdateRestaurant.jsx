import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import ErrorCompenet from '../../../shared/components/ErrorCompenet';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getRestaurantByid, updateRestaurant } from '../../../shared/services/RestaurantService';


function UpdateRestaurant(props) {
    let { setRestaurantState, getRestaurantList, restaurantId } = props
    let [formUpdateState,setFormUpdatedState] = useState({})

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
            id : restaurantId,
            name: values.name,
            description: values.description
        }

        let data = await updateRestaurant(payload)
        if(data){
            handleClose()
            getRestaurantList()
        }
    }

    let handleClose = () => {
        setRestaurantState('')
    }

    let getRestaurantById = async () => {
        let data = await getRestaurantByid(restaurantId)
        if(data){
            setFormUpdatedState({
                ...formUpdateState,
                name : data.name,
                description : data.description
            })
        }
    }

    useEffect(() => {
        getRestaurantById()
    }, [])

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><h2 className="form-title">Update Restaurant !!</h2></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Formik initialValues={formUpdateState ? formUpdateState : initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize>
                        {
                            props => {
                                console.log("props", props.values)
                                return (
                                    <Form className="form-container">

                                        <div className="form-row">
                                            <label htmlFor="name">name</label>
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

export default UpdateRestaurant
