import React, {useState} from 'react';
import Sidebar from "../components/Sidebar";
import {Col} from "react-bootstrap";
import "../css/package-dashboard.scss"
import PackageList from "../components/PackageList";
import AddPackage from "../components/AddPackage";

const PackageScreen = () => {
    const [show, setShow] = useState(false);

    const AddBoxShow = () => setShow(true);
    return (
        <>
            <div className='dashboard '>
                <div className='d-flex '>
                    <Col className='pl-0' md={2}>
                        <Sidebar packageScreen/>
                    </Col>
                    <Col md={10}>
                        <div className="dashboard-packages w3-animate-opacity pr-5 pl-5 pt-5 pb-2">
                            <div className="header-section mb-5 d-flex justify-content-between">
                                <div>
                                    <h2 className='font-weight-bold'>Packages</h2>
                                    <p className='sub-title'>Manage your packages.add , remove and edit easily.</p>
                                </div>
                                <button onClick={AddBoxShow} className='btn package-btn'>Add new package</button>
                            </div>
                            <PackageList/>
                            <PackageList/>
                            <PackageList/>
                        </div>
                    </Col>
                </div>
                <AddPackage show={show} setShow={setShow}/>
            </div>
        </>
    );
};

export default PackageScreen;