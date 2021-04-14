import React from 'react';
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({show,setShow,headerTitle,subTitle,setDeleteConfirm}) => {

        const updateModalState = ()=>{
            setShow(false)
        }
        const deleteUser = ()=>{
            setDeleteConfirm(true)
            setShow(false)
        }
    return (
        <>
            <Modal className='custom-modal' centered show={show} onHide={updateModalState}>
                <p className='text-center font-weight-bold'>{headerTitle}</p>
                <Modal.Body>{subTitle}</Modal.Body>
                <div className='d-flex justify-content-between mt-4 mb-2'>
                    <button onClick={updateModalState} className='btn btn-userBlock mb-3 mb-xxl-0'>Cancel</button>

                    <button onClick={deleteUser} className='btn btn-userDelete'>Delete</button>
                </div>
            </Modal>
        </>
    );
};

export default DeleteModal;
