import React, { useEffect, useState } from 'react'
import { Col, FormControl, ListGroup, Row, Image } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { CartState } from '../context/Context'
import Rating from './Rating';


const Cart = () => {

    const {state: {cart}, dispatch} = CartState();

    const [total, setTotal] = useState();

    useEffect(()=>{
        setTotal(cart.reduce((acc, currentElement) => acc+Number(currentElement.price)*currentElement.qty, 0))
    }, [cart])


    return (
        <div className="home">    
            <div className="productContainer">
                <ListGroup>
                    {
                        cart.map(product=>(
                            <ListGroup.Item key={product.id}>
                                
                                <Row>
                                    
                                    <Col md={2}>
                                       <Image src={product.image} fluid rounded alt={product.name} />
                                    </Col>
                                    <Col md={2}>
                                        <span>{product.name}</span>
                                    </Col>
                                    <Col md={2}>
                                        <span>${product.price}</span>
                                    </Col>
                                    <Col md={2}>
                                        <Rating rating={product.ratings} />
                                    </Col>
                                    <Col md={2}>
                                        <FormControl as="select" value={product.qty} onChange={(e)=>dispatch({type: 'CHANGE_CART_QTY', payload: {id: product.id, qty: e.target.value}})}>
                                            {
                                                [...Array(product.inStock).keys()].map((item)=>(
                                                    <option key={item+1}>{item+1}</option>
                                                ))
                                            }

                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <AiFillDelete fontSize="20px" style={{cursor: "pointer"}} onClick={()=>dispatch({
                                                    type: 'REMOVE_FROM_CART',
                                                    payload: product
                                                })} />
                                    </Col>

                                </Row>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            <div className="filters summary">
                <span className="title">Subtotal {cart.length} items</span>
                <span style={{fontWeight: 700, fontSize: 20}}>Total: ${total}</span>
            </div>
        </div>
    )
}

export default Cart
