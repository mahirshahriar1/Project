import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import Navbar from './Navbar'
import { Modal, Button, Form } from 'react-bootstrap';


export default function Main() {
  var id = window.location.href.split('/').reverse()[0]
  // console.log(id);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');



  const [userType, setUserType] = useState('');
  const [userID, setUserID] = useState();

  useEffect(() => {
    const getUserType = () => {
      Axios.get('http://localhost:3001/login').then((response) => {
        if (response.data.loggedIn === true) {
          setUserID(response.data.user[0].ID);
          setUserType(response.data.user[0].Type);
        }
      });
    };
    

    const getData = () => {


      Axios.post('http://localhost:3001/specific', { id: id }).then((response) => {

        console.log(response.data);
        setName(response.data[0].Name);
        setPrice(response.data[0].Price);
        setType(response.data[0].product_type);
        setImage(response.data[0].Image);


      });
    };
    getData();
    getUserType();

  }, [id,userType])


  const [show, setShow] = useState(false);
  const [comment, setComment] = useState('');


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  
  return (
    <div >
      <Navbar />
      <div className='container' style={{ paddingLeft: '100px' }}>
        <div className='row'>
          <div className='col-md-6'>
            <img src={`http://localhost:3001/uploads/${image}`} style={{ height: '240px', width: '50%' }} alt="..." />

            <div>
              <h1>{name}</h1>
            </div>
            <div>
              <h3>{price}</h3>
            </div>
            <div>
              <h3>{type}</h3>
            </div>
            { userType==='Customer' &&  <div>
              <button className='btn btn-primary'
                onClick={() => {
                  handleShow();
                }
                }
              >
                Report
              </button>
            </div>}

          </div>
        </div>


      </div>

      <Modal show={show} onHide={handleClose}
        centered

      // backdrop="static" 
      //backdrop might remove the close button                            
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Write your Report Comment : </Form.Label>
              <Form.Control
                type="text"
                // placeholder="name@example.com"
                autoFocus
                onChange={(e) => {
                  setComment(e.target.value);
                }
                }
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={
            () => {
              Axios.post('http://localhost:3001/postReport', { CustomerID: userID, ProductID: id,comment: comment }).then((response) => {
               if(response.status===200)
                {
                  alert('Reported Successfully');
                }
                 
              });
              handleClose();
            }
          }
          >
            Send Report
          </Button>
        </Modal.Footer>
      </Modal>



    </div>
  )
}
