import React, {useEffect, useState} from 'react';
import moment from "moment";
import {ToastContainer, toast} from 'react-toastify';
import apiClient from "../services/EventService";
import DeleteModal from "./DeleteModal";
import BlockUser from "./BlockUser";

const UserList = ({premium, blocked, setUserDetail, username, email, createdAt, userID, api_token, userImage}) => {

    const [hideUSer, setHideUser] = useState(false)
    const premiumDate = moment(premium).format('YYYY-MM-DD')
    const currentTime = moment().format("X")
    const [show, setShow] = useState(false);
    const [blockShow, setBlockShow] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [blockConfirm, setBlockConfirm] = useState(false)
    const timestampPremuimData = moment(premiumDate).format("X")
    const userClicked = (userID, email) => {
        setUserDetail({id: userID, email})
    }


    useEffect(() => {
        if (deleteConfirm) {
            const DeleteUser = async () => {
                try {

                    const config = {
                        headers: {
                            Authorization: `Bearer ${api_token}`
                        }
                    }

                    await apiClient.put(`/users/${userID}`, {'deleted': true}, config)
                    toast.success("user deleted successfully");
                    setHideUser(true)

                } catch (error) {
                    toast.success("something wrong please try again");

                }

            }
            DeleteUser()
        }

        if (blockConfirm){
            const BlockUser = async () => {

                try {

                    const config = {
                        headers: {
                            Authorization: `Bearer ${api_token}`
                        }
                    }

                    await apiClient.put(`/users/${userID}`, {'blocked': true}, config)
                    toast.success("user blocked successfully");
                    setHideUser(true)
                } catch (error) {
                    toast.error("something wrong please try again");

                }

            }
            BlockUser()
        }


    }, [deleteConfirm,blockConfirm,api_token,userID])


    const UnblockUser = async (userID) => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }

            await apiClient.put(`/users/${userID}`, {'blocked': false}, config)
            toast.success("user unblocked successfully");
            setHideUser(true)
        } catch (error) {
            toast.success("something wrong please try again");

        }
    }

    const DeleteBoxShow = () => setShow(true);
    const banBoxShow = () => setBlockShow(true);

    return (
        <div className={hideUSer ? 'd-none' : ''}>
            <div className=' users-list d-flex mt-4 flex-wrap flex-column flex-xl-row'>
                <div onClick={() => userClicked(userID, email)} className='pl-3 col-12 col-xxl-4 flex-column flex-xl-row
                    pr-md-3 pr-lg-5 py-md-4 user-detail text-center text-xl-left'>
                    <img src={`${process.env.REACT_APP_BASE_URL}${userImage}`} alt=""/>
                    <div className='ml-3'>
                        <p className='name'>{username}</p>
                        <p className='email'>{email.length > 24 ? email.substring(0, 24) + '...' : email}</p>
                    </div>
                </div>
                {timestampPremuimData > currentTime ?
                    <div onClick={() => userClicked(userID, email)}
                         className='Account-status col-12 col-xxl-3 justify-content-xxl-center
                        justify-content-center justify-content-lg-end premium '>
                        <svg viewBox="0 0 100 100" className="icon mr-3 shape-codepen">
                            <use xlinkHref="/img/sidebar/sprite.svg#fr-crown"/>
                        </svg>
                        <p>premium</p>
                    </div>
                    :
                    <div onClick={() => userClicked(userID, email)}
                         className='Account-status col-12 col-xxl-3 justify-content-xxl-center
                        justify-content-center justify-content-lg-end premium '>
                        <svg viewBox="0 0 100 100" className="icon mr-3 commonUser shape-codepen">
                            <use xlinkHref="/img/sidebar/sprite.svg#fr-crown"/>
                        </svg>
                        <p className='text-secondary'>premium</p>
                    </div>
                }

                <div className='user-setting col-xxl-5 col-12 flex-column flex-lg-row'>
                    <div className='d-flex align-items-center'>
                        <i className="fal fa-clock"></i>
                        <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
                    </div>
                    {blocked ?
                        <div className='d-flex align-items-center'>
                        <span onClick={() => UnblockUser(userID)} className='block'>
                             <i className="far fa-unlock"></i>
                            <p>Unlock</p>
                        </span>

                        </div>
                        :
                        <div className='d-flex align-items-center'>
                        <span onClick={banBoxShow} className='ban'>
                             <i className="fal fa-ban"> </i>
                        </span>
                            <span onClick={DeleteBoxShow} className='delete ml-2'>
                                    <i className="fal fa-times"> </i>
                            </span>
                        </div>
                    }

                </div>
            </div>
            <ToastContainer/>
            <DeleteModal
                show={show}
                setDeleteConfirm={setDeleteConfirm}
                setShow={setShow}
                headerTitle={'Delete account'}
                subTitle={'Are you sure to permanently delete the account? you can’t undo this action'}
            />
            <BlockUser
                blockShow={blockShow}
                setBlockShow={setBlockShow}
                setBlockConfirm={setBlockConfirm}
            />
        </div>
    );
};

export default UserList;
