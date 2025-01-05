import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { fetchTrips, fetchGroundTimes } from './api/flightsApi';
import moment from 'moment';

const column = [
    { type: 'string', id: 'plane' },
    { type: 'string', id: 'origin-destination' },
    { type: 'date', id: 'Start Date' },
    { type: 'date', id: 'End Date' },
];

const GanttChart = () => {
    const [trips, setTrips] = useState<any[]>([]);
    const [groundTime, setGroundTime] = useState<any[]>([]);

    const getTrips = async () => {
        const res = await fetchTrips();
        const data: unknown[] = [column]; // 确保第一行是列定义
        Object.entries(res).forEach(([plane, trips]) => {
            (trips as { id: string; origin: string; destination: string; departureTime: string; arrivalTime: string }[]).forEach((trip) => {
                const row = [
                    plane,
                    `${trip.origin}-${trip.destination}`,
                    moment(trip.departureTime).subtract(8, 'hours').toDate(),
                    moment(trip.arrivalTime).subtract(8, 'hours').toDate(),
                ];
                data.push(row);
            });
        });
        setTrips(data);
    };

    const getGroundTime = async () => {
        const res = await fetchGroundTimes();
        const data: unknown[] = [column];
        Object.entries(res).forEach(([plane, grounds]) => {
            (grounds as { id: string; destination: string; groundTime: string; duration: number }[]).forEach((ground) => {
                const row = [
                    plane,
                    `${ground.destination}`,
                    moment(ground.groundTime).subtract(8, 'hours').toDate(),
                    moment(ground.groundTime).subtract(8, 'hours').add(ground.duration, 'minutes').toDate(),
                ];
                data.push(row);
            });
        });
        setGroundTime(data);
    };

    useEffect(() => {
        getTrips();
        getGroundTime();
    }, []);

    return (
        <div>
            <h3>Chart 1</h3>
            <Chart
                chartType='Timeline'
                data={trips}
                width='100vh'
                height='400px'
                options={{
                    timeline: { showRowLabels: true },
                    colors: ['#76A7FA'],
                    hAxis: {
                        minValue: new Date(2024, 0, 1, 21),
                        maxValue: new Date(2024, 0, 2, 21),
                    },
                }}
            />
            <h3>Chart 2</h3>
            <Chart
                chartType='Timeline'
                data={groundTime}
                width='100vh'
                height='400px'
                options={{
                    timeline: { showRowLabels: true },
                    colors: ['#76A7FA'],
                    hAxis: {
                        minValue: new Date(2024, 0, 1, 21),
                        maxValue: new Date(2024, 0, 2, 21),
                    },
                }}
            />
        </div>
    );
};

export default GanttChart;
