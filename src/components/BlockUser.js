import React from 'react';
import Modal from "react-bootstrap/Modal";

const BlockUser = ({blockShow, setBlockShow, setBlockConfirm}) => {
    const updateModalState = () => {
        setBlockShow(false)
    }
    const blockUser = () => {
        setBlockConfirm(true)
        setBlockShow(false)
    }
    return (
        <>
            <Modal className='custom-modal' centered show={blockShow} onHide={updateModalState}>
                <p className='text-center font-weight-bold'>Block User</p>
                <Modal.Body>Are you sure to block this user?</Modal.Body>
                <div className='d-flex justify-content-between mt-4 mb-2'>
                    <button onClick={updateModalState} className='btn btn-userBlock mb-3 mb-xxl-0'>Cancel</button>

                    <button onClick={blockUser} className='btn bg-warning btn-userDelete'>block</button>
                </div>
            </Modal>
        </>
    );
};

export default BlockUser;