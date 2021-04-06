import React from 'react';
import {Col, FormControl, InputGroup} from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import '../css/Subscription-dashboard.scss'
import UserSubscription from "../components/UserSubscription";
const SubscriptionScreen = () => {
    return (
        <div className='dashboard '>
            <div className='d-flex dashboard-subscription'>

                <Col className='pl-0' md={2}>
                    <Sidebar UserSubscriptionScreen/>
                </Col>
                <Col className='w3-animate-opacity' md={10}>
                    <div className=" pr-3 pl-3 pt-5 pb-5">
                        <div className="header-section d-flex justify-content-between">
                            <h2 className='font-weight-bold'>Subscription</h2>
                            <InputGroup className='search-box'>
                                <InputGroup.Prepend className='search-icon'>
                                    <i className="fal fa-search"> </i>
                                </InputGroup.Prepend>
                                <FormControl placeholder='search...'/>
                            </InputGroup>
                        </div>
                    </div>
                <UserSubscription/>
                </Col>
            </div>

        </div>
    );
};

export default SubscriptionScreen;