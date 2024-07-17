import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { deleteDishById, getAllDishes } from '../../../shared/services/DishService'

function DishList() {
  let navigate = useNavigate()
  let {id} = useParams()
  let [dishes,setDish] = useState([])
  let [currentPage , setCurrentPage] = useState(1)
  let [foodcategoryState , setFoodcategoryState] = useState('breakfast')


    // useEffect(() => {
    //   getDishes()
    // },[])

    useEffect(() =>{
      getDishes()
    },[currentPage,foodcategoryState])

    function navigateTo(value,dishid){
      if(value == 'addDish'){
          navigate(`/restaurant/${id}/dishes/add`)
       }else if(value == 'updateDish'){
          navigate(`/restaurant/${id}/dishes/update/${dishid}`)
       }
    }

    let getDishes = async () =>{
      let foodcategory = foodcategoryState == 'breakfast' ? 1 : (foodcategoryState == 'lunch' ? 2 : 3)
      let data = await getAllDishes(currentPage,foodcategory,id)
      if(data){
        setDish(data)
      }
    }

    const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handlePreviousPage = () => {
      setCurrentPage(currentPage - 1);
    };

    let handleFoodCategoryState = (value) =>{
      setCurrentPage(1)
      setFoodcategoryState(value)
    }

    let deleteDish = async (id) =>{
     let data = await deleteDishById(id)
     if(data){
      getDishes()     
     }
    }

  return (
    <div>
      <h3 style={{color:'red',textAlign:'center'}}>Dish List</h3>
      <Link to="/restaurant">Go To Restaurants</Link>

      <div className="form-row col-2">
      <Button variant="warning" type="button" className="submit-btn" onClick={() => navigateTo('addDish','')}>+ Add Dish</Button>
      </div>

      <div className="form-row">
      <Button variant={ foodcategoryState === 'breakfast' ? "warning" : "primary"} type="button" className="submit-btn" onClick={() => handleFoodCategoryState('breakfast')}>Breakfast</Button>&nbsp;
      <Button variant={ foodcategoryState === 'lunch' ? "warning" : "primary"} className="submit-btn" onClick={() => handleFoodCategoryState('lunch')}>Lunch</Button>&nbsp;
      <Button variant={ foodcategoryState === 'dinner' ? "warning" : "primary"} className="submit-btn" onClick={() => handleFoodCategoryState('dinner')}>Dinner</Button>
      </div>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          dishes?.map((x,index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{x.dishName}</td>
                <td>{x.dishDescription}</td>
                <td>{x.price} Discount { x.discount}</td>
                <td>
                  <div className="form-row">
                  <Button variant="warning" type="button" className="submit-btn" onClick={() =>navigateTo('updateDish',x.dishId)}>Edit</Button>&nbsp;
                  <Button variant="warning" type="button" className="submit-btn" onClick={() =>deleteDish(x.dishId)}>Delete</Button>
                  </div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
    {
      dishes?.length > 0 ?  <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <span style={{color:'white'}}>Page {currentPage}</span>
      <button onClick={handleNextPage} disabled={dishes?.length < 10}>Next Page</button>
    </div>: <><p style={{textAlign:'center'}}>No Records Available ..</p></>
    }
   
    </div>
  )
}

export default DishList
