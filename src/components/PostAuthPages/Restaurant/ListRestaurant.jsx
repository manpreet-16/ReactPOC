import React, { useEffect, useState } from 'react'
import AddRestaurant from './AddRestaurant'
import UpdateRestaurant from './UpdateRestaurant'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteRestaurant, getAllRestaurants } from '../../../shared/services/RestaurantService';

function ListRestaurant() {
    let navigate = useNavigate()
    let [restaurantState, setRestaurantState] = useState('')
    let [restaurantList, setRestaurantList] = useState([])
    let [restaurantId,setRestaurantId] = useState(null)

    useEffect(() => {
        getRestaurantList()
    }, [])

    let getRestaurantList = async () => {
        let data = await getAllRestaurants(1,10)
        if(data){
            setRestaurantList(data)
        }
    }

    let onDeleteRestaurant = async (id) => {
      let data = await deleteRestaurant(id)
      if(data){
        getRestaurantList()
      }
    }

    let onEditRestaurant = (id) => {
        setRestaurantState('update')
        setRestaurantId(id)
    }

    let navigateTo = (value,id) => {
      if(value == 'dishlist'){
        console.log("id of restat ",id)
        navigate(`/restaurant/${id}/dishes`)
      }
    }

    return(
        <Container fluid className="p-0">
        <Row>
          <Col md={2} className="bg-orange text-white p-0">
            <div className="d-flex justify-content-end align-items-center p-2">
              <Button variant="warning" onClick={() => setRestaurantState('add')}>+ Add Restaurant</Button>
            </div>
            <div className="sidebar-sticky">
              {/* sidebar content goes here */}
            </div>
          </Col>
          <Col md={10}>
            <div className="p-4">
              <h1>Restaurants List</h1>
              {/* dashboard content goes here */}
              <Row>
                {restaurantList?.map((data, index) => {
                  return (
                    <Col md={4} key={index}>
                      <Card className="h-100">
                        <div className="card-header">
                          <div className="favorite-btn">
                            <i className="fas fa-heart"></i>
                          </div>
                        </div>
                        <div className="card-body">
                          <h1>{data.name}</h1>
                          <p>{data.description}</p>
                          <Button variant="warning" type="button" className="submit-btn" onClick={() => onEditRestaurant(data.id)}>Edit</Button>
                          <Button variant="warning" type="button" className="submit-btn" onClick={() => onDeleteRestaurant(data.id)}>Delete</Button>
                          <Button variant="warning" type="button" className="submit-btn" onClick={() => navigateTo('dishlist',data.id)}>Manage Dishes</Button>
                          {/* <Button variant="warning" type="button" className="submit-btn" onClick={() => navigateTo('addDish',data.id)}>+ Add Dish</Button> */}
                        </div>
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </Col>
        </Row>
           {
                restaurantState == 'add' ? <AddRestaurant setRestaurantState={setRestaurantState} getRestaurantList={getRestaurantList}/> : 
                restaurantState == 'update' ? <UpdateRestaurant  setRestaurantState={setRestaurantState} getRestaurantList={getRestaurantList} restaurantId={restaurantId}/> : <></>
            }
      </Container>
    )
}

export default ListRestaurant
