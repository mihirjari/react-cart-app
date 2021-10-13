import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from "react-bootstrap"
import { Link, useLocation } from "react-router-dom"
import {FaShoppingCart} from "react-icons/fa";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {

    const {state: {cart}, dispatch, productDispatch} = CartState();

    return (
        <Navbar bg="dark" variant="dark" style={{height: 80}}>
            <Container>

                <Navbar.Brand>
                    <Link className="link" to="/">React Cart Application</Link>
                </Navbar.Brand>

                {useLocation().pathname.split("/")[1] !== "cart" && (<Navbar.Text className="search">
                    <FormControl type="search" aria-label="Search" style={{width: 500}} placeholder="search for any product..." className="m-auto" onChange={(e)=>productDispatch({type: 'SORT_BY_SEARCH', payload: e.target.value})} />
                </Navbar.Text>)}
                

                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant="primary">
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{minWidth: 350}}>

                            {cart.length>0 ? (
                            <>
                                {
                                    cart.map((product)=>(
                                        <span className="cartItem" key={product.id}>
                                            <img src={product.image} className="cartItemImg" alt={product.name} />
                                            <div className="cartItemDetail">
                                                <span>{product.name}</span>
                                                <span>${product.price.split(".")[0]}</span>
                                            </div>
                                            <AiFillDelete fontSize="20px" style={{cursor: "pointer"}} onClick={()=>dispatch({
                                                type: 'REMOVE_FROM_CART',
                                                payload: product
                                            })} />
                                        </span>
                                    ))
                                }
                                <Link to="/cart"><Button style={{width: "95%", margin: "0 10px"}}>Go To Cart</Button></Link>
                            </>
                            ) : (<span style={{padding: 10}}>Cart is empty!</span>)}
                            
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default Header
