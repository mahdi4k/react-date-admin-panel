import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import {Col} from "react-bootstrap";
import "../css/package-dashboard.scss"
import PackageList from "../components/PackageList";
import AddPackage from "../components/AddPackage";
import apiClient from "../services/EventService";
import Loader from "../components/Loader";

const PackageScreen = ({history}) => {
    const [show, setShow] = useState(false);
    const [packageList, setPackageList] = useState([])
    const [loading, setLoading] = useState(true)
    const [api_token,setApiToken]=useState('')

    useEffect(() => {
        if (localStorage.getItem('user_api') === null) {
            history.push('/login')
        }

        async function packageList() {
            try {
                const api_token = JSON.parse(localStorage.getItem('user_api'))
                setApiToken(api_token)
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }

                const {data} = await apiClient.get(`/packages?_sort=createdAt:DESC`, config)
                setPackageList(data)
                setLoading(false)

                //setUserActivityAction(UserActivity.data)
            } catch (error) {
                // console.log(error)
                // error.response && setMessage(error.response.data.errors)
            }

        }

        packageList()


    }, [setPackageList, setLoading,history])

    const AddBoxShow = () => setShow(true);
    return (
        <>
            {loading ? <Loader/> :
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
                                {packageList.map(pack => (
                                    <PackageList  key={pack._id}
                                                  packageID={pack._id}
                                                  title={pack.title}
                                                  price={pack.price}
                                                  api_token={api_token}
                                                  days={pack.days}/>
                                ))}


                            </div>
                        </Col>
                    </div>
                    <AddPackage  show={show} api_token={api_token} setShow={setShow}/>
                </div>
            }
        </>
    );
};

export default PackageScreen;
