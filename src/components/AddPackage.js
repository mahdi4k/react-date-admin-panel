import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import apiClient from "../services/EventService";
import {ToastContainer, toast} from 'react-toastify';

const AddPackage = ({show, setShow, api_token}) => {

    const [packageName, setPackageName] = useState('')
    const [packageDays, setPackageDays] = useState(30)
    const [PackagePrice, setPackagePrice] = useState('')
    const [planID, setPlanID] = useState('')
    const [checkbox, setChecked] = React.useState(false);

    const updateModalState = () => {
        setShow(false)
    }
    const AddPackageHandler = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }


            await apiClient.post(`/packages`, {
                days: packageDays,
                title: packageName,
                price: checkbox ? (PackagePrice) - PackagePrice * 30 / 100 : PackagePrice,
                offPackage: checkbox,
                planId: planID
            }, config)
            toast.success("package added successfully");
            setShow(false)
            window.location.reload()
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
                            <Form.Control required onChange={e => setPackageName(e.target.value)} type="text"
                                          placeholder="Package name..."/>
                        </Form.Group>
                        <Form.Group className='package-form mt-4'>
                            <Form.Control required onChange={e => setPlanID(e.target.value)} type="text"
                                          placeholder="Plan ID..."/>
                        </Form.Group>
                        <Form.Group className='package-form mt-4'>
                            <Form.Control required onChange={e => setPackageDays(e.target.value)} as="select">
                                <option value="31">1 months</option>
                                <option value="93">3 months</option>
                                <option value="1024">1 years</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='package-form mt-4'>
                            <Form.Control required onChange={e => setPackagePrice(e.target.value)} type="text"
                                          placeholder="Price"/>
                        </Form.Group>
                        <Form.Group controlId="rememberCheckBox">
                            <label className='w-100 mt-3 cursor text-left d-flex align-items-center'>
                                <input className='mr-2 custom-checkbox' type="checkbox"
                                       defaultChecked={checkbox}
                                       onChange={() => setChecked(!checkbox)}
                                />
                                off package
                            </label>
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
