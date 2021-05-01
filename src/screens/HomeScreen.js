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
import TimeAgo from "react-timeago";

const HomeScreen = ({history}) => {

    const [loading, setLoading] = useState(true)
    const [api_token, setApitoken] = useState('')
    const [userDetails, setUserDetails] = useState(Object)
    const [dropdownBoxTitle,setDropdownBoxTitle] = useState('last month')
    const [dropdownActivityTitle,setDropdownActivityTitle] = useState('All activities')
    const [dropdownChartTitle,setDropdownChartTitle] = useState('last month')

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
                let lastMonth = moment().startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
                const userCount = await apiClient.get(`/users/count`, config)
                const likeCount = await apiClient.get(`/actions/count?action=liked&createdAt_gt=${lastMonth}`, config)
                const matchCount = await apiClient.get(`/actions/count?action=matched&createdAt_gt=${lastMonth}`, config)

                setUserDetails({
                    userCount: userCount.data,
                    likeCount: likeCount.data,
                    matchCount : matchCount.data
                })
                setLoading(false)

            } catch (error) {
                // console.log(error)
                // error.response && setMessage(error.response.data.errors)
            }
        }

        getUsersDetail()


    }, [setUserDetails, api_token, setLoading, setApitoken, history])


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


                const UserActivity = await apiClient.get(`/actions?action_ne=viewedNearMe&_limit=50`, config)
                setUserActivityAction(UserActivity.data)
            } catch (error) {
                // console.log(error)
                // error.response && setMessage(error.response.data.errors)
            }
        }

        getUsersActivity()

    }, [api_token, setUserActivityAction])

    const filterActivity = async (filter) => {
        try {

            const config = {
                headers: {
                    Authorization: `Bearer ${api_token}`
                }
            }
            let UserActivity;
            switch (filter) {
                case 'all' :
                    UserActivity = await apiClient.get(`/actions?action_ne=viewedNearMe&_limit=50&_sort=createdAt:DESC`, config)
                    setDropdownActivityTitle('All activities')
                    break;
                case  'like' :
                    UserActivity = await apiClient.get(`/actions?action_eq=liked&_limit=50&_sort=createdAt:DESC `, config);
                    setDropdownActivityTitle('like')
                    break;
                case 'block' :
                    UserActivity = await apiClient.get(`/actions?action_eq=blocked&_limit=50&_sort=createdAt:DESC`, config)
                    setDropdownActivityTitle('block')
                    break;
                case 'match' :
                    UserActivity = await apiClient.get(`/actions?action_eq=matched&_limit=50&_sort=createdAt:DESC`, config)
                    setDropdownActivityTitle('match')
                    break;
                default :
                    await apiClient.get(`/actions?action_ne=viewedNearMe&_limit=50&_sort=createdAt:DESC`, config);

            }
             setUserActivityAction(UserActivity.data)
        } catch (error) {
            // console.log(error)
            // error.response && setMessage(error.response.data.errors)
        }
    }

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
                                        <Dropdown.Toggle variant="default" id="dropdown-box">
                                            {dropdownBoxTitle}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={(e)=>setDropdownBoxTitle(e.target.textContent)} href="#">last month</Dropdown.Item>
                                            <Dropdown.Item onClick={(e)=>setDropdownBoxTitle(e.target.textContent)} href="#">this week</Dropdown.Item>
                                            <Dropdown.Item onClick={(e)=>setDropdownBoxTitle(e.target.textContent)} href="#">today</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                                {/*----dashboard boxes----*/}
                                <HomeDashboardBoxes ActivityFilter={dropdownBoxTitle} api_token={api_token}  />

                                <div className="dashboard-chart">
                                    <div className="d-flex header-section justify-content-between my-3 ">
                                        <h2 className='font-weight-bold'>Subscription Income</h2>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                                {dropdownChartTitle}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={(e)=>setDropdownChartTitle(e.target.textContent)} href="#">last month</Dropdown.Item>
                                                <Dropdown.Item onClick={(e)=>setDropdownChartTitle(e.target.textContent)} href="#">this week</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <DashBoardChart api_token={api_token} dropdownChartFilter={dropdownChartTitle}/>
                                </div>
                            </div>
                        </Col>

                        {/*----right-side------*/}
                        <Col className='bg-white' md={3}>
                            <div className=' right-side p-3'>
                                <DashBoardProgress api_token={api_token} />

                                <div className='d-flex flex-wrap flex-xxl-nowrap matching mt-5'>
                                    <div className='mt-3 mb-3 mb-xxl-0'>
                                        <b>Matching</b>
                                        <p className='sub-title'>
                                            see the percentage of the total matches between the users
                                        </p>
                                    </div>
                                    <div className='box'>
                                        <img className='crown-icon' src="./img/sidebar/fr-following.svg" alt=""/>
                                        <p className='total'>{userDetails.matchCount}</p>
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
                                            <Dropdown.Toggle variant="default" id="dropdown-basic2">
                                                {dropdownActivityTitle}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => filterActivity('all')} href="#">
                                                    All activities
                                                    </Dropdown.Item>
                                                <Dropdown.Item onClick={() => filterActivity('like')}
                                                               href="#">like</Dropdown.Item>
                                                <Dropdown.Item onClick={() => filterActivity('match')}
                                                               href="#">match</Dropdown.Item>
                                                <Dropdown.Item onClick={() => filterActivity('block')}
                                                               href="#">block</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <div className="userActivityList mt-4">
                                        {userActivityAction.map((el) => {
                                                const CallTime = moment().format('X') - moment(el.createdAt).format('X')
                                                const diffTime = moment().format('X') - CallTime
                                                const actionTime = moment.unix(diffTime).format('YYYY-MM-DD')
                                                const durationAction =  <TimeAgo date={actionTime} />
                                                return (
                                                    <div key={el._id}
                                                         className="d-flex justify-content-between mb-4 align-items-center">
                                                        <div className="userActivityItem">
                                                            <img src="./img/sidebar/user.png" alt=""/>
                                                            <p className='ml-2'>
                                                                <span> { el.user1.username} </span> {el.action}
                                                                <span> {el.user2.username} </span> </p>
                                                        </div>
                                                        <p className='times'>{durationAction} </p>
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
