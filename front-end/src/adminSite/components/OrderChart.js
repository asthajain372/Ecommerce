import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chart.js/auto';

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const OrderChart = () => {

    const SITE_URL = process.env.REACT_APP_SITE_URL;
    const [custom_range, setcustom_range] = useState('month');
    const [orderLabel, setOrderLabel] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [range, setrange] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [customRangeVisible, setCustomRangeVisible] = useState(false);
    
    const handlecharts = (para) => {

        order_chart(para);
        total_Sales(para);
        total_Users(para);
        setrange(para);
      }
        useEffect(() => {
            // Fetch data here and set states for orderLabel, orderData, revenueData, userData, totalOrders, totalRevenue, totalUsers
            total_Sales(custom_range);
            total_Users(custom_range);
            order_chart(custom_range);
            setrange(custom_range);
        }, []);
    
    async function total_Sales(para) {
        const orders_count = await fetch(`${SITE_URL}/calculateTotalPrice/${para}`);
        const data = await orders_count.json();
        // console.log("data", data);
        setRevenueData(data.data);
    };


    async function total_Users(para) {
        const orders_count = await fetch(`${SITE_URL}/calculateUserCount/${para}`);
        const data = await orders_count.json();
        console.log("data", data);
        setUserData(data.data);
    };

    async function order_chart(para) {
        const orders_count = await fetch(`${SITE_URL}/orderchart/${para}`);
        const data = await orders_count.json();
        console.log("data", data);
        setOrderData(data.data);
        setOrderLabel(data.labels);
    };




    const handleCustomcharts = () => {
        handle_order_chart();
        handle_Sales_total();
        handle_User_total();
        setrange('custom');
        
        // console.log()
      }



      async function handle_order_chart() {
        const orders_count = await fetch(`${SITE_URL}/customOrderchart/${startDate}/${endDate}`);
        const data = await orders_count.json();
       
        setOrderData(data.data);
        setOrderLabel(data.labels);
      };
    
    
      async function handle_Sales_total() {
        const orders_count = await fetch(`${SITE_URL}/calculateTotalPrice/${startDate}/${endDate}`);
        const data = await orders_count.json();
        setRevenueData(data.data);
      };
    
      async function handle_User_total() {
        const orders_count = await fetch(`${SITE_URL}/calculateUserCount/${startDate}/${endDate}`);
        const data = await orders_count.json();
        setUserData(data.data);
      };




    // const data = {
    //     labels: orderLabel, // Assuming these are your date labels
    //     datasets: [
    //         {
    //             label: 'Orders',
    //             data: orderData,
    //             backgroundColor: [
    //                 'rgba(75, 192, 192, 0.8)',
    //                 'rgba(75, 192, 192, 0.6)',
    //                 'rgba(75, 192, 192, 0.4)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(75, 192, 192, 0.1)',
    //             ],
    //             hoverBackgroundColor: [
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //             ],
    //             borderWidth: 1,
    //             borderColor: '#ffffff',
    //         },
    //         {
    //             label: 'Customers',
    //             data: userData,
    //             backgroundColor: [
    //                 'rgba(255, 205, 86, 0.8)',
    //                 'rgba(255, 205, 86, 0.6)',
    //                 'rgba(255, 205, 86, 0.4)',
    //                 'rgba(255, 205, 86, 0.2)',
    //                 'rgba(255, 205, 86, 0.1)',
    //             ],
    //             hoverBackgroundColor: [
    //                 'rgba(255, 205, 86, 1)',
    //                 'rgba(255, 205, 86, 1)',
    //                 'rgba(255, 205, 86, 1)',
    //                 'rgba(255, 205, 86, 1)',
    //                 'rgba(255, 205, 86, 1)',
    //             ],
    //             borderWidth: 1,
    //             borderColor: '#ffffff',
    //         },
    //         {
    //             label: 'Revenue',
    //             data: revenueData,
    //             backgroundColor: [
    //                 'rgba(153, 102, 255, 0.8)',
    //                 'rgba(153, 102, 255, 0.6)',
    //                 'rgba(153, 102, 255, 0.4)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(153, 102, 255, 0.1)',
    //             ],
    //             hoverBackgroundColor: [
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //             ],
    //             borderWidth: 1,
    //             borderColor: '#ffffff',
    //         },
    //     ],
    // };



        const data = {
        labels: orderLabel, // Assuming these are your date labels
        datasets: [
          {
            label: 'Orders',
            data: orderData,
            backgroundColor: 'rgb(75, 192, 192)',
            hoverBackgroundColor: 'rgba(75, 192, 192, 0.7)',
          },
          {
            label: 'Customers',
            data: userData,
            backgroundColor: 'rgb(255, 205, 86)',
            hoverBackgroundColor: 'rgba(255, 205, 86, 0.7)',
          },
          {
            label: 'Revenue',
            data: revenueData,
            backgroundColor: 'rgb(153, 102, 255)',
            hoverBackgroundColor: 'rgba(153, 102, 255, 0.7)',
          },
        ],
      };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let label = tooltipItem.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        label += tooltipItem.raw.toLocaleString(); // Format the number as needed
                        return label;
                    },
                },
            },
        },
    };



    return (
        <div>




            {/* Recent Activity */}
            <div className="card">
                <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={() => handlecharts('day')} >Last 12 days</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handlecharts('week')} > last 12 Weeks</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handlecharts('month')}>This Year</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => setCustomRangeVisible(true)}>Custom Range</a></li>
                    </ul>
                </div>
                <div className="card-body">
                    <h5 className="card-title"> Pie chart Report <span>| {range}</span></h5>




                    {customRangeVisible && (
              <div className="mb-3 ">
                <div className="d-flex align-items-center ">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      if (date > endDate) {
                        setEndDate(date);
                      }
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="form-control me-2 ms-2"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    maxDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    className="form-control me-2 ms-4"
                  />
                  <button className="btn btn-primary ms-5" onClick={handleCustomcharts}  >Apply</button>
                </div>
              </div>
            )}





                    {/* <div className="activity"> */}
                    <Pie data={data} options={options} />
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}
