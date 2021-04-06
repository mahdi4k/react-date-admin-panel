import React from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
const AddPackage = ({show,setShow}) => {
    const updateModalState = ()=>{
        setShow(false)
    }
    return (
        <>
            <Modal className='custom-modal' centered show={show} onHide={updateModalState}>
                <h3 className='text-center font-weight-bold mt-3'>Add Package</h3>

                <Modal.Body className='mt-4'>
                    <Form>
                        <Form.Group  className='package-form mt-4'>
                             <Form.Control  type="text" placeholder="Package name..." />
                        </Form.Group>
                        <Form.Group  className='package-form mt-4'>
                             <Form.Control as="select">
                                <option>3 months</option>
                                <option>4 months</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group  className='package-form mt-4' >
                            <Form.Control type="text" placeholder="Price" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <div className='d-flex justify-content-center mt-4 mb-4'>
                     <button onClick={updateModalState}  className='btn package-btn'>Add new package</button>
                 </div>
            </Modal>
        </>
    );
};

export default AddPackage;