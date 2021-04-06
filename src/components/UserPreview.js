import React, {useState} from 'react';
import DeleteModal from "./DeleteModal";

const UserPreview = ({userDetail}) => {
    const [show, setShow] = useState(false);

     const DeleteBoxShow = () => setShow(true);
    return (
        <>
            {userDetail ?
                <div>
                    <div className=' profile-preview p-3'>
                        <h5 className='font-weight-bold'>Profile Preview</h5>
                        <div className='preview-detail flex-column mt-5 align-items-center d-flex'>
                            <div className='mt-3 text-center'>
                                <img src="./img/user.jpg" alt=""/>
                                <p className='username mt-3'>
                                    Isabella Clark
                                </p>
                                <p className='userEmail mb-3 mt-2'>
                                    isabella789ck@gmail.com
                                </p>
                            </div>
                            <div className='d-flex flex-column flex-xl-row preview-detail-box'>
                                <div className='box border-right'>
                                     <p className='sex font-weight-bold '>Male</p>
                                    <p className='font-weight-light text-secondary'>sex</p>
                                </div>
                                <div className='box border-right'>
                                     <p className='year font-weight-bold'>21</p>
                                    <p className='font-weight-light text-secondary'>Years old</p>
                                </div>
                                <div className='box'>
                                     <p className='like font-weight-bold'>87</p>
                                    <p className='font-weight-light text-secondary'>Likes given</p>
                                </div>
                            </div>
                        </div>
                        <div className='userActivity'>
                            <div className="header-section d-flex   justify-content-between">
                                <h4 className='font-weight-bold'>Recent activities</h4>

                            </div>
                            <div className="userActivityList mt-4">
                                <div className="d-flex justify-content-between mb-4 align-items-center">
                                    <div className="userActivityItem">
                                        <img src="./img/sidebar/user.png" alt=""/>
                                        <p className='ml-2'><span>Daniel</span> visited <span>Sophia’s</span> profile</p>
                                    </div>
                                    <p className='times'>2 mins</p>
                                </div>

                                <div className="d-flex justify-content-between mb-4 align-items-center">
                                    <div className="userActivityItem  ">
                                        <img src="./img/sidebar/user.png" alt=""/>
                                        <p className='ml-2'><span>Camila359</span>  liked Justin1995</p>
                                    </div>
                                    <p className='times'>2 mins</p>
                                </div>

                                <div className="d-flex justify-content-between mb-4 align-items-center">
                                    <div className="userActivityItem  ">
                                        <img src="./img/sidebar/user.png" alt=""/>
                                        <p className='ml-2'><span>Gerald7</span> matched with Susan01</p>
                                    </div>
                                    <p className='times'>2 mins</p>
                                </div>

                                <div className="d-flex justify-content-between mb-4 align-items-center">
                                    <div className="userActivityItem  ">
                                        <img src="./img/sidebar/user.png" alt=""/>
                                        <p className='ml-2'><span>Daniel</span> visited <span>Sophia’s</span> profile</p>
                                    </div>
                                    <p className='times'>2 mins</p>
                                </div>

                                <div className="d-flex justify-content-between mb-4 align-items-center">
                                    <div className="userActivityItem  ">
                                        <img src="./img/sidebar/user.png" alt=""/>
                                        <p className='ml-2'><span>Frank300</span> liked _Elizabeth_</p>
                                    </div>
                                    <p className='times'>2 mins</p>
                                </div>
                                <div className='d-flex flex-column flex-xxl-row justify-content-between'>
                                    <button  className='btn btn-userBlock mb-3 mb-xxl-0'>Block</button>
                                    <button onClick={DeleteBoxShow} className='btn btn-userDelete'>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className='empty-profile-preview position-relative'>
                    <h3 className='font-weight-bold mt-5'>Profile Preview</h3>
                    <div>
                        <p>by clicking on each user its specific information shows up here</p>
                    </div>
                </div>}

            <DeleteModal
                show={show}
                setShow={setShow}
                headerTitle={'Delete account'}
                subTitle={'Are you sure to permanently delete the account? you can’t undo this action'}
            />
        </>
    );
};

export default UserPreview;