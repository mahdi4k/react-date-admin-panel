import React, {useState} from 'react';
import Sidebar from "../components/Sidebar";
import {Col, FormControl, InputGroup} from "react-bootstrap";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../css/user-dashboard.scss'
import UserList from "../components/UserList";
import UserPreview from "../components/UserPreview";

const UsersScreen = () => {
    const [userDetail , setUserDetail] = useState(false)
     return (
        <div className='dashboard '>
            <div className='d-flex'>
                <Col className='pl-0' md={2}>
                    <Sidebar UserScreen/>
                </Col>
                <Col md={7}>
                    <div className="dashboard-users w3-animate-opacity pr-5 pl-5 pt-5 pb-2">

                        <Tabs>
                            <TabList>
                                <div className='align-items-center d-flex justify-content-between'>
                                    <div>
                                        <Tab>Users</Tab>
                                        <Tab>Blocked Users</Tab>
                                    </div>
                                    <li className='list-unstyled search-box'>
                                        <InputGroup>
                                            <InputGroup.Prepend className='search-icon'>
                                                <i className="fal fa-search"> </i>
                                            </InputGroup.Prepend>
                                            <FormControl placeholder='search...'/>
                                        </InputGroup>
                                    </li>
                                </div>
                            </TabList>

                            <TabPanel>
                                <UserList premium setUserDetail={setUserDetail} />
                                <UserList setUserDetail={setUserDetail}/>
                                <UserList setUserDetail={setUserDetail} />
                                <UserList premium setUserDetail={setUserDetail}/>
                            </TabPanel>
                            <TabPanel>
                                <UserList blocked  setUserDetail={setUserDetail}/>
                                <UserList blocked setUserDetail={setUserDetail}/>
                                <UserList blocked setUserDetail={setUserDetail}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </Col>
                <Col className='bg-white'  md={3}>
                    <div className=' right-side h-100 user-preview p-3'>

                        <UserPreview userDetail={userDetail} />

                    </div>
                </Col>
            </div>

        </div>

    );
};

export default UsersScreen;