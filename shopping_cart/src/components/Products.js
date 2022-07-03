import React from 'react';
import {Card,Button} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import axios from 'axios';
import Cart from './Cart';
export default function Products(props) {
    const {onAdd,products}=props;
    const[img,setImg]=useState()

 const convertImg=(buffer)=>{
    // const reader = new FileReader();
    //                reader.readAsDataURL(products.img);
    //                const base64data=reader.result;
    //                setImg(base64data);
    var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
 }
  return (
    <div className="block col-2">
        {
            products.map((product)=>(
            
              //   <Card style={{ width: '18rem' }} key={product.id}>
              //   <Card.Img variant="top" src={product.img} />
              //   <Card.Body>
              //     <Card.Title >{product.name}</Card.Title>
              //     <Card.Text>
              //       {product.price}

              //       Some quick example text to build on the card title and make up the bulk of
              //       the card's content.
              //     </Card.Text>
              //     <Button variant="primary" onClick={()=>{onAdd(product)}}>Add To cart</Button>
              //   </Card.Body>
              // </Card>  

              <div key={product.id}>
      <img className="small" src={product.img.default} alt={product.name} />
      <h3>{product.name}</h3>
      <div>${product.price}</div>
      <div>
        <Button onClick={() => onAdd(product)}>Add To Cart</Button>
      </div>
      </div>
            ))
        }
        {/* <div>{<Cart></Cart>}</div> */}
    </div>
  )
}
