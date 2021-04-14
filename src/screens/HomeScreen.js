import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import {Col, Dropdown} from "react-bootstrap";
import DashBoardChart from "../components/DashBoardChart";
import DashBoardProgress from "../components/DashBoardProgress";
import apiClient from "../services/EventService";
import "../css/home-dashboard.scss"
import moment from "moment";
import Loader from "../components/Loader";
import HomeDashboardBoxes from "../components/HomeDashboardBoxes";

const HomeScreen = ({history}) => {

    const [loading, setLoading] = useState(true)
    const [api_token, setApitoken] = useState('')
    const [userDetails, setUserDetails] = useState(Object)


    useEffect(() => {

        if (localStorage.getItem('user_api') === null) {
            history.push('/login')
        }

        const api_token = JSON.parse(localStorage.getItem('user_api'))
        setApitoken(api_token)

        async function getUsersDetail() {

            try {

                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const userCount = await apiClient.get(`/users/count`, config)
                const matchCount = await apiClient.get(`/actions/count?action=matched`, config)
                const likeCount = await apiClient.get(`/actions/count?action=liked`, config)
                const premiumUser = await apiClient.get(`/users/count?premiumUntil_gte=${moment().format('YYYY-MM-DD')}`, config)
                setUserDetails({
                    userCount: userCount.data,
                    matchCount: matchCount.data,
                    likeCount: likeCount.data,
                    premiumUserCount: premiumUser.data
                })
                setLoading(false)

            } catch (error) {
                // console.log(error)
                // error.response && setMessage(error.response.data.errors)
            }
        }

        getUsersDetail()


    }, [setUserDetails, api_token, setLoading, setApitoken])


    //users activity
    const [userActivityAction, setUserActivityAction] = useState(Array)
    useEffect(() => {

        async function getUsersActivity() {
            try {

                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }


                const UserActivity = await apiClient.get(`/actions?action_ne=viewedNearMe&_limit=5`, config)
                setUserActivityAction(UserActivity.data)
            } catch (error) {
                // console.log(error)
                // error.response && setMessage(error.response.data.errors)
            }
        }

        getUsersActivity()

    }, [api_token, setUserActivityAction])

    return (
        <>
            {loading ? <Loader/> :
                <div className='dashboard'>
                    <div className='d-flex '>
                        <Col className='pl-0' md={2}>
                            <Sidebar homeScreen/>
                        </Col>
                        <Col md={7}>
                            <div className="dashboard-home w3-animate-opacity pr-5 pl-5 pt-5 pb-2">
                                <div className="header-section d-flex justify-content-between">
                                    <h2 className='font-weight-bold'>DASHBOARD</h2>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="default" id="dropdown-basic">
                                            This month
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                                {/*----dashboard boxes----*/}
                                <HomeDashboardBoxes userDetails={userDetails}/>

                                <div className="dashboard-chart">
                                    <div className="d-flex header-section justify-content-between my-3 ">
                                        <h2 className='font-weight-bold'>Subscription Income</h2>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                                Weekly
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <DashBoardChart/>
                                </div>
                            </div>
                        </Col>

                        {/*----right-side------*/}
                        <Col className='bg-white' md={3}>
                            <div className=' right-side p-3'>
                                <DashBoardProgress/>

                                <div className='d-flex flex-wrap flex-xxl-nowrap matching mt-5'>
                                    <div className='mt-3 mb-3 mb-xxl-0'>
                                        <b>Matching</b>
                                        <p className='sub-title'>
                                            see the percentage of the total matches between the users
                                        </p>
                                    </div>
                                    <div className='box'>
                                        <img className='crown-icon' src="./img/sidebar/fr-following.svg" alt=""/>
                                        <p className='total'>155</p>
                                        <p>Matches</p>
                                    </div>
                                    <div className='box'>
                                        <i className='far fa-heart'> </i>
                                        <p className='total'>{userDetails.likeCount}</p>
                                        <p>Likes</p>
                                    </div>
                                </div>
                                <div className='userActivity'>
                                    <div className="header-section d-flex   justify-content-between">
                                        <h2 className='font-weight-bold'>User Activity</h2>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                                All activities
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="userActivityList mt-4">
                                        {userActivityAction.map((el) => {
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
                                                                <span>{el.user1.username}</span> {el.action}
                                                                <span>{el.user2.username}</span></p>
                                                        </div>
                                                        <p className='times'>{durationAction} min </p>
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>

                        </Col>
                    </div>
                </div>
            }
        </>
    );
};

export default HomeScreen;
