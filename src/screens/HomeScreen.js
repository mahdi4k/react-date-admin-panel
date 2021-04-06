import React from 'react';
import Sidebar from "../components/Sidebar";
import {Col, Dropdown} from "react-bootstrap";
import DashBoardChart from "../components/DashBoardChart";
import DashBoardProgress from "../components/DashBoardProgress";
import "../css/home-dashboard.scss"
const HomeScreen = () => {
    return (
        <>
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
                            <div className='home-box flex-wrap flex-xxl-nowrap justify-content-between d-flex'>
                                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>
                                    <div className="header-box d-flex align-items-center">
                                        <span className='user-box p-3'>
                                          <img className='users-icon' src="./img/sidebar/fr-users.svg" alt=""/>
                                        </span>
                                        <p className='mb-0 font-weight-bold ml-3'>TOTAL USERS</p>
                                    </div>
                                    <div className="numberUser">
                                        <p>2580</p>
                                    </div>
                                    <div className="footer-box d-flex">
                                        <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/>
                                        <p className='percent upPercent'>8.5%</p>
                                        <p>more than last month</p>
                                    </div>
                                </div>

                                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>
                                    <div className="header-box d-flex align-items-center">
                                        <span className='match-box '>
                                           <i className='far fa-heart '></i>
                                        </span>
                                        <p className='mb-0 ml-3 font-weight-bold'>MATCH USERS</p>
                                    </div>
                                    <div className="numberUser">
                                        <p>890</p>
                                    </div>
                                    <div className="footer-box d-flex">
                                        <img className='users-icon mr-2' src="./img/arrow-dwon.svg" alt=""/>
                                        <p className='percent downPercent'>5.5%</p>
                                        <p>more than last month</p>
                                    </div>
                                </div>

                                <div className='box mb-3 mb-xxl-0 col-12 col-xxl-4 p-4'>
                                    <div className="header-box d-flex align-items-center">
                                        <span className='crown-box p-3'>
                                            <img className='crown-icon' src="./img/sidebar/fr-crown.svg" alt=""/>
                                        </span>
                                        <p className='mb-0 ml-3 font-weight-bold'>PREMIUM USERS</p>
                                    </div>
                                    <div className="numberUser">
                                        <p>1247</p>
                                    </div>
                                    <div className="footer-box d-flex">
                                        <img className='users-icon mr-2' src="./img/arrow-up.svg" alt=""/>
                                        <p className='percent upPercent'>13.5%</p>
                                        <p>more than last month</p>
                                    </div>
                                </div>
                            </div>
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
                    <Col className='bg-white'  md={3}>
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
                                   <p className='total'>155</p>
                                   <p>Matches</p>
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
                               </div>
                           </div>
                       </div>

                    </Col>
                </div>
            </div>
        </>
    );
};

export default HomeScreen;