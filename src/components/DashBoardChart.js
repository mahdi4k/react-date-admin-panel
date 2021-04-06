import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const DashBoardChart = () => {

    const data = [
        {
            name: "MON",
            uv: 2,

        },
        {
            name: "TUE",
            uv: 3.5,

        },
        {
            name: "WED",
            uv: 1.7,

        },
        {
            name: "THU",
            uv: 1.1,

        },
        {
            name: "FRI",
            uv: 2.1,

        },
        {
            name: "SAT",
            uv: 3.3,

        },
        {
            name: "SUN",
            uv: 1.9,

        },


    ];
    const formatter = (value) => `$${value}k`;
    return (
        <>

            <ResponsiveContainer width="100%" height={330}>
                <LineChart
                    width="100%"
                    height={350}
                    data={data}

                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={formatter} />
                    <Tooltip />

                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </>
    );
};

export default DashBoardChart;