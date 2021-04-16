import React, {useEffect, useState} from 'react';
import DeleteModal from "./DeleteModal";
import apiClient from "../services/EventService";
import moment from "moment";
import {toast, ToastContainer} from "react-toastify";
import Loader from "./Loader";

const UserPreview = ({userDetail, api_token}) => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState([])
    const [likeGiven, setLikeGiven] = useState('')
    const [userActivity, setUserActivity] = useState('')
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    useEffect(() => {
        if (userDetail) {
            setLoading(true)
            async function getuserDetails() {
                try {
                    const api_token = JSON.parse(localStorage.getItem('user_api'))
                    const config = {
                        headers: {
                            Authorization: `Bearer ${api_token}`
                        }
                    }

                    const {data} = await apiClient.get(`/users/${userDetail.id}`, config)
                    const LikeGiven = await apiClient.get(`/actions/count?action=liked&_id=${userDetail.id}`, config)
                    const UserActivity = await apiClient.get(`/actions?action_ne=viewedNearMe&_where[user1._id]=${userDetail.id}`, config)
                    setUserInfo(data)
                    setLikeGiven(LikeGiven.data)
                    setUserActivity(UserActivity.data)
                    setLoading(false)


                    //setUserActivityAction(UserActivity.data)
                } catch (error) {
                    // console.log(error)
                    // error.response && setMessage(error.response.data.errors)
                }

            }

            getuserDetails()

        }
    }, [userDetail])

    useEffect(() => {
        if (deleteConfirm) {
            const DeleteUser = async () => {
                try {

                    const config = {
                        headers: {
                            Authorization: `Bearer ${api_token}`
                        }
                    }

                    await apiClient.put(`/users/${userDetail.id}`, {'deleted': true}, config)
                    toast.success("user deleted successfully");

                } catch (error) {
                    toast.success("something wrong please try again");

                }

            }
            DeleteUser()
        }


    }, [deleteConfirm,api_token,userDetail])


    const blockUser = async () => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            await apiClient.put(`/users/${userDetail.id}`, {'blocked': true}, config)
            toast.success("user blocked successfully");

        } catch (error) {
            toast.success("something wrong please try again");

        }
    };
    const DeleteBoxShow = () => setShow(true);

    const checkUserDetail = (
        <>
            {(userDetail && loading)  ? <Loader/> : (userDetail && !loading) ?
                <div>

                    <div className=' profile-preview p-3'>
                        <h5 className='font-weight-bold'>Profile Preview</h5>
                        <div className='preview-detail flex-column mt-5 align-items-center d-flex'>
                            <div className='mt-3 text-center'>
                                <img src={`${process.env.REACT_APP_BASE_URL}${userInfo.image.url}`} alt=""/>
                                <p className='username mt-3'>
                                    {userInfo.username}
                                </p>
                                <p className='userEmail mb-3 mt-2'>
                                    {userDetail.email}
                                </p>
                            </div>
                            <div className='d-flex flex-column flex-xl-row preview-detail-box'>
                                <div className='box border-right'>
                                    <p className='sex font-weight-bold '>Male</p>
                                    <p className='font-weight-light text-secondary'> {userInfo.profile.gender}</p>
                                </div>
                                <div className='box border-right'>
                                    <p className='year font-weight-bold'>{userInfo.profile.age}</p>
                                    <p className='font-weight-light text-secondary'>Years old</p>
                                </div>
                                <div className='box'>
                                    <p className='like font-weight-bold'>{likeGiven}</p>
                                    <p className='font-weight-light text-secondary'>Likes given</p>
                                </div>
                            </div>
                        </div>
                        <div className='userActivity'>
                            <div className="header-section d-flex   justify-content-between">
                                <h4 className='font-weight-bold'>Recent activities</h4>

                            </div>
                            <div className="userActivityList mt-4">

                                {userActivity.length === 0 ? <p className='text-center mb-3'>no activity</p> :
                                    userActivity.map((el) => {
                                            const currentTime = moment()
                                            const CallTime = moment().format('X') - moment(el.createdAt).format('X')
                                            const diffTime = moment().format('X') - CallTime
                                            const actionTime = moment.unix(diffTime).format('YYYY-MM-DD')
                                            const durationAction = currentTime.diff(actionTime, "minute")
                                            return (
                                                <div key={el._id}
                                                     className="d-flex justify-content-between mb-4 align-items-center">
                                                    <div className="userActivityItem">
                                                        <img src="./img/sidebar/user.png" alt=""/>
                                                        <p className='ml-2'>
                                                            <span className='mr-2'>{el.user1.username}</span> {el.action}
                                                            <span className='ml-2'>{el.user2.username}</span></p>
                                                    </div>
                                                    <p className='times'>{durationAction} min </p>
                                                </div>
                                            )
                                        }
                                    )}


                                <div className='d-flex flex-column flex-xxl-row justify-content-between'>
                                    <button onClick={blockUser} className='btn btn-userBlock mb-3 mb-xxl-0'>Block</button>
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
                </div>
            }
        </>
    )


    return (
        <>
            {checkUserDetail}

            <ToastContainer/>
            <DeleteModal
                show={show}
                setDeleteConfirm={setDeleteConfirm}
                setShow={setShow}
                headerTitle={'Delete account'}
                subTitle={'Are you sure to permanently delete the account? you can’t undo this action'}
            />
        </>
    );
};

export default UserPreview;
