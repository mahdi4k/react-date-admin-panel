import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import moment from "moment";
import apiClient from "../services/EventService";

const DashBoardChart = ({api_token, dropdownChartFilter}) => {

    const [payment, setPayment] = useState([])

    useEffect(() => {
        async function dashboardChart() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${api_token}`
                    }
                }
                switch (dropdownChartFilter) {
                    case 'last month':

                        let lastMonth = moment().startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
                        const payment = await apiClient.get(`/payments?createdAt_gt=${lastMonth}`, config)
                        setPayment(payment.data)
                        break;
                    case 'this week':
                        let lastWeek = moment().startOf('day').subtract(1, 'week').format('YYYY-MM-DD');
                        const paymentWeek = await apiClient.get(`/payments?createdAt_gt=${lastWeek}`, config)
                        setPayment(paymentWeek.data)
                        break;
                    default :

                        let defaultTime = moment().startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
                        const DefaultPayment = await apiClient.get(`/payments?createdAt_gt=${defaultTime}`, config)
                        setPayment(DefaultPayment.data)
                }
            } catch (e) {
                console.log(e)
            }
        }

        dashboardChart()
    }, [api_token, dropdownChartFilter])


    const data = payment.map((el) => ({
        name: moment(el.createdAt).format('YYYY-MM-DD'),
        uv: el.paid,
    }));

    const formatter = (value) => `$${value}`;
    return (
        <>

            <ResponsiveContainer width="100%" height={330}>
                <LineChart
                    width="100%"
                    height={350}
                    data={data}

                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis tickFormatter={formatter}/>
                    <Tooltip/>

                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>

        </>
    );
};

export default DashBoardChart;