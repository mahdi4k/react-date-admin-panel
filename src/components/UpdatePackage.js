import React, {useState} from 'react';
import apiClient from "../services/EventService";
import {toast, ToastContainer} from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UpdatePackage = ({api_token, show, setShow, packageID, price, title, days, setPackageUpdated, checkboxOff, planId}) => {

    const [packageName, setPackageName] = useState(title)
    const [packageDays, setPackageDays] = useState(days)
    const [PackagePrice, setPackagePrice] = useState(price)
    const [planID, setPlanID] = useState(planId)
    const [checkbox, setChecked] = React.useState(checkboxOff);

    const updateModalState = () => {
        setShow(false)
    }
    /*    const deleteUser = () => {

            setShow(false)
        }*/

    const UpdatePackageHandler = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            const updatePackaged = await apiClient.put(`/packages/${packageID}`, {
                days: packageDays,
                title: packageName,
                price: checkbox ? (PackagePrice) - PackagePrice * 30 / 100 : PackagePrice,
                offPackage: checkbox,
                planId: planID
            }, config)
            setPackageUpdated(updatePackaged.data)
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
                <h3 className='text-center font-weight-bold mt-3'>update Package</h3>

                <Modal.Body className='mt-4'>
                    <Form>
                        <Form.Group className='package-form mt-4'>
                            <Form.Control value={packageName || ''} onChange={e => setPackageName(e.target.value)}
                                          type="text"
                                          placeholder="Package name..."/>
                        </Form.Group>
                        <Form.Group className='package-form mt-4'>
                            <Form.Control value={planID || ''} onChange={e => setPlanID(e.target.value)} type="text"
                                          placeholder="Plan ID..."/>
                        </Form.Group>
                        <Form.Group className='package-form mt-4'>
                            <Form.Control value={packageDays} onChange={e => setPackageDays(e.target.value)}
                                          as="select">
                                <option value="31">1 months</option>
                                <option value="93">3 months</option>
                                <option value="186">6 months</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='package-form mt-4'>
                            <Form.Control value={PackagePrice} onChange={e => setPackagePrice(e.target.value)}
                                          type="text"
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
                    <button onClick={UpdatePackageHandler} className='btn package-btn'>update package</button>
                </div>
            </Modal>

            <ToastContainer/>
        </>
    );
};

export default UpdatePackage;
