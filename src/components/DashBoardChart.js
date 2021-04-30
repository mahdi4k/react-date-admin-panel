import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import moment from "moment";
import apiClient from "../services/EventService";

const DashBoardChart = ({api_token, dropdownChartFilter}) => {

    const [paymentDate, setPaymentDate] = useState([])
    const [paymentPrice, setPaymentPrice] = useState([])
    const [NumberOfDayChart, setNumberOfDayChart] = useState([])
    const [chartLoading, setChartLoading] = useState(true)

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
                        setChartLoading(true)
                        let paymentCreated = [];
                        let paymentPaid = [];
                        let lastMonth = moment().startOf('day').subtract(1, 'month').format('YYYY-MM-DD');

                        const payment = await apiClient.get(`/payments?createdAt_gt=${lastMonth}`, config)
                        let paymentValue = payment.data

                        paymentValue.map(el => {
                            paymentCreated.push(moment(el.createdAt).format('YYYY-MM-DD'))
                            paymentPaid.push(el.paid)
                        })
                        setPaymentDate(paymentCreated)
                        setPaymentPrice(paymentPaid)
                        setNumberOfDayChart(Array.from({length: moment().daysInMonth()}, (x, i) => moment().startOf('month').add(i, 'days').format('YYYY-MM-DD')))
                        setChartLoading(false)
                        break;

                    case 'this week':
                        setChartLoading(true)
                        let paymentWeekCreated = [];
                        let paymentWeekPaid = [];
                        let lastWeek = moment().startOf('day').subtract(1, 'week').format('YYYY-MM-DD');

                        const paymentWeek = await apiClient.get(`/payments?createdAt_gt=${lastWeek}`, config)
                        let paymentWeekValue = paymentWeek.data

                        paymentWeekValue.map(el => {
                            paymentWeekCreated.push(moment(el.createdAt).format('YYYY-MM-DD'))
                            paymentWeekPaid.push(el.paid)
                        })
                         
                        setPaymentDate(paymentWeekCreated)
                        setPaymentPrice(paymentWeekPaid)

                        // getting days of week
                        let startOfWeek = moment().startOf('isoWeek');
                        let endOfWeek = moment().endOf('isoWeek');
                        let days = [];
                        let day = startOfWeek;

                        while (day <= endOfWeek) {
                            days.push(day.format('YYYY-MM-DD'));
                            day = day.clone().add(1, 'd');
                        }
                        setNumberOfDayChart(days)
                        setChartLoading(false)
                        break;
                    default :

                        let defaultTime = moment().startOf('day').subtract(1, 'month').format('YYYY-MM-DD');
                        const DefaultPayment = await apiClient.get(`/payments?createdAt_gt=${defaultTime}`, config)
                        setPaymentDate(DefaultPayment.data.createdAt)
                        setPaymentPrice(DefaultPayment.data.paid)
                }
            } catch (e) {
                console.log(e)
            }
        }

        dashboardChart()
    }, [api_token, dropdownChartFilter])


     let paymentObj = []
    console.log(paymentDate)
      if (paymentDate !== undefined && paymentDate.length !== 0 && chartLoading === false) {
        paymentObj = paymentDate.reduce(function (a, b, i) {
            if (!a.hasOwnProperty(b)) {
                a[b] = 0;
            }

            a[b] += Number(paymentPrice[i]);
            return a;
        }, {});
    }


    let name = Object.keys(paymentObj);
    let uv = Object.values(paymentObj);

    //console.log(name)


    const data = NumberOfDayChart.map(el => {
        //console.log(name[0])
        const payedValue = name.map((payedDay, key) => {
            return payedDay == el ? uv[key] : 0
        })

        if (payedValue.length !== 0) {
            return {
                name: el,
                uv: payedValue.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue;
                })

            }
        } else {
            return {
                name: el,
                uv: 0
            }
        }

    })

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