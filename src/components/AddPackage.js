import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import apiClient from "../services/EventService";
import {ToastContainer, toast} from 'react-toastify';

const AddPackage = ({show , setShow , api_token}) => {

    const [packageName,setPackageName] = useState('')
    const [packageDays,setPackageDays] = useState('')
    const [PackagePrice,setPackagePrice] = useState('')

    const updateModalState = () => {
        setShow(false)
    }

    const AddPackageHandler = async ()=>{
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

              await apiClient.post(`/packages`,{
                  days : packageDays,
                  title :  packageName,
                  price : PackagePrice
              },config)
              toast.success("package added successfully");
            setShow(false)
        } catch (error) {
              console.log(error)
            toast.error("something wrong please try again");
            // error.response && setMessage(error.response.data.errors)
        }
    }

    return (
        <>
            <Modal className='custom-modal' centered show={show} onHide={updateModalState}>
                <h3 className='text-center font-weight-bold mt-3'>Add Package</h3>

                <Modal.Body className='mt-4'>
                    <Form>
                        <Form.Group className='package-form mt-4'>
                            <Form.Control onChange={e => setPackageName(e.target.value)} type="text" placeholder="Package name..."/>
                        </Form.Group>
                        <Form.Group className='package-form mt-4'>
                            <Form.Control onChange={e => setPackageDays(e.target.value)} as="select">
                                <option value="31">1 months</option>
                                <option value="93">3 months</option>
                                <option value="186">6 months</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='package-form mt-4'>
                            <Form.Control onChange={e => setPackagePrice(e.target.value)} type="text" placeholder="Price"/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <div className='d-flex justify-content-center mt-4 mb-4'>
                    <button onClick={AddPackageHandler} className='btn package-btn'>Add new package</button>
                </div>
            </Modal>

            <ToastContainer/>
        </>
    );
};

export default AddPackage;
