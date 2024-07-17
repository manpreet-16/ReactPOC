import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react'
import ErrorCompenet from '../../../shared/components/ErrorCompenet';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { addDish, getDishByID, updateDish } from '../../../shared/services/DishService';

function AddDish() {
  let navigate = useNavigate()
  let location = useLocation()
  let {id , dishId} = useParams()
  let newDish = {
    foodCategoryId: 1,
    dishname: "",
    dishdescription: "",
    price: 0,
    discount: 0,
    image: null
  }
  let [ initialValues , setFormState ] = useState({
    dishes : [newDish]
  })

  let FoodCategory = [{
    id: 1,
    value: 'Breakfast'
  }, {
    id: 2,
    value: 'Lunch'
  }, {
    id: 3,
    value: 'Dinner'
  }]

  let validationSchema = Yup.object({
    dishes : Yup.array().of(
      Yup.object({
        foodCategoryId: Yup.string().required('Food category is Required !!'),
        dishname: Yup.string().required('Name is Required !!').min(6,"Name must not be less than 6 characters").max(20,"Name must not be greater than 20 characters"),
        dishdescription: Yup.string().required('Description is Required !!').min(20,"Description must not be less than 20 characters").max(50,"Description must not be greater than 50 characters"),
        price: Yup.number().required('Price is Required !!').min(1,"Price must not be less than 1")
      })
    )
  })
  

  let onSubmit = async (values) => {
    let payload = {}

    if(+dishId){
      payload = {
        dishId:+dishId,
        restaurantId:+id,
        foodCategoryId:+values.dishes[0].foodCategoryId,
        name:values.dishes[0].dishname,
        description:values.dishes[0].dishdescription,
        price:+values.dishes[0].price,
        discount:+values.dishes[0].discount,
        image : null
    }
    }else{
      payload = {
        restaurantId: +id,
        dishes: values?.dishes.map(x => {
          x.foodCategoryId = +x.foodCategoryId
          return x
        })
      }
    }

    let data = dishId ? await updateDish(payload): await addDish(payload)
      if(data){
        navigate(`/restaurant/${id}/dishes`)
    }
    
  }

  useEffect(() =>{
   if(dishId){
    getDish()
   }
  },[])

  let getDish = async () =>{
    let data = await getDishByID(dishId)
    if(data){
      setFormState({
        dishes: [{
          foodCategoryId: data.foodCategoryId,
          dishname: data.dishName,
          dishdescription: data.dishDescription,
          price: data.price,
          discount: data.discount,
          image: null
        }]
      });
    }
  }

  return (
    <div>
      <Link to={`/restaurant/${id}/dishes`}>Go Back</Link>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}  enableReinitialize>
      <Form className="form-container">
        <FieldArray name="dishes">
          {
            (props) => {
              let { form , push , remove} = props
              let { values } = form
           
              return (
                values?.dishes?.map((x,index) =>{
                  return (
                    <div key={index}>
                      <div className="form-row">
                        <label htmlFor="foodcat">Food Category</label>
                        <Field as="select" name={`dishes[${index}].foodCategoryId`} id="foodcat">
                          {
                            FoodCategory?.map((x, i) => {
                              return (
                                <option key={x.id} value={x.id}>
                                  {x.value}
                                </option>
                              )
                            })
                          }
                        </Field>
                        <ErrorMessage name={`dishes[${index}].foodCategoryId`} component={ErrorCompenet}></ErrorMessage>
                      </div>

                      <div className="form-row">
                        <label htmlFor="name">Dish Name</label>
                        <Field id="name" name={`dishes[${index}].dishname`} placeholder="Enter Name" type="text" className="form-input"/>
                        <ErrorMessage name={`dishes[${index}].dishname`} component={ErrorCompenet}></ErrorMessage>
                      </div>

                      <div className="form-row">
                        <label htmlFor="des">Dish Description</label>
                        <Field as="textarea" id="des" name={`dishes[${index}].dishdescription`} placeholder="Enter Description" type="text" className="form-input" />
                        <ErrorMessage name={`dishes[${index}].dishdescription`} component={ErrorCompenet}></ErrorMessage>
                      </div>

                      <div className="form-row">
                        <label htmlFor="price">Price</label>
                        <Field id="price" name={`dishes[${index}].price`} placeholder="Enter Price" type="number" className="form-input" />
                        <ErrorMessage name={`dishes[${index}].price`} component={ErrorCompenet}></ErrorMessage>
                      </div>

                      <div className="form-row">
                        <label htmlFor="discount">Discount Price</label>
                        <Field id="discount" name={`dishes[${index}].discount`} placeholder="Enter Discount Price" type="number" className="form-input" />
                        <ErrorMessage  name={`dishes[${index}].discount`} component={ErrorCompenet}></ErrorMessage>
                      </div>

                      <div className="form-row">
                        <label htmlFor="discount">Add Image</label>
                        <Field id="discount" name={`dishes[${index}].image`} type="file" className="form-input" />
                        {/* <ErrorMessage  name={`dishes[${index}].discount`} component={ErrorCompenet}></ErrorMessage> */}
                      </div>

                      {
                        
                        !dishId ? <>
                        <div className="form-row">
                            <Button variant="warning" type="button" onClick={() => push(newDish)}>+Add More</Button>&nbsp;
                              {
                                values?.dishes?.length > 1 ? <Button variant="secondary" type="button" onClick={() => remove(index)}>Remove</Button>  : <></>
                              }
                        </div>
                      </> : <></>
                      }
                    </div>
                  )
                })
              )
            }
          }
        </FieldArray>
        <button type="submit" className="submit-btn">Submit</button>
      </Form>
    </Formik>
    </div>
  )
}

export default AddDish
