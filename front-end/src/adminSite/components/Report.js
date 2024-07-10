import React from 'react'
import ApexCharts from 'react-apexcharts';
import { Line, Pie } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const Report = () => {
  const SITE_URL = process.env.REACT_APP_SITE_URL;


  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [customRangeVisible, setCustomRangeVisible] = useState(false);
  const [order_data, setorder_data] = useState([]);
  const [order_label, setorder_label] = useState([]);
  const [revenue_data, setrevenue_data] = useState([]);
  const [revenue_label, setrevenue_label] = useState([]);
  const [user_data, setuser_data] = useState([]);
  const [user_label, setuser_label] = useState([]);
  const [range, setrange] = useState();

  const data = {
    labels: order_label,
    datasets: [
      {
        label: 'Orders',
        data: order_data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      },
      {
        label: 'Revenue',
        data: revenue_data,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1
      },
      {
        label: 'Customers',
        data: user_data,
        fill: false,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time Period',
          font: {
            size: 16
          }
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count / Revenue',
          font: {
            size: 16
          }
        }
      }
    }
  };



  const [custom_range, setcustom_range] = useState('month');

  const handleCustomRange = () => {
    setCustomRangeVisible(false);
  };

  const handleCustomcharts = () => {
    handle_order_chart();
    handle_Sales_total();
    handle_User_total();
    setrange('custom');
  }

  const handlecharts = (para) => {

    order_chart(para);
    total_Sales(para);
    total_Users(para);
    setrange(para);
  }

  useEffect(() => {
    order_chart(custom_range);
    total_Sales(custom_range);
    total_Users(custom_range);
    setrange(custom_range);
  }, [])

  async function total_Sales(para) {
    const orders_count = await fetch(`${SITE_URL}/calculateTotalPrice/${para}`);
    const data = await orders_count.json();
    setrevenue_data(data.data);
    setrevenue_label(data.labels);
  };


  async function total_Users(para) {
    const orders_count = await fetch(`${SITE_URL}/calculateUserCount/${para}`);
    const data = await orders_count.json();
    setuser_data(data.data);
    setuser_label(data.labels);
  };

  async function order_chart(para) {
    const orders_count = await fetch(`${SITE_URL}/orderchart/${para}`);
    const data = await orders_count.json();
    setorder_data(data.data);
    setorder_label(data.labels);
  };


  async function handle_order_chart() {
    const orders_count = await fetch(`${SITE_URL}/customOrderchart/${startDate}/${endDate}`);
    const data = await orders_count.json();
    setorder_data(data.data);
    setorder_label(data.labels);
  };


  async function handle_Sales_total() {
    const orders_count = await fetch(`${SITE_URL}/calculateTotalPrice/${startDate}/${endDate}`);
    const data = await orders_count.json();
    setrevenue_data(data.data);
    setrevenue_label(data.labels);
  };

  async function handle_User_total() {
    const orders_count = await fetch(`${SITE_URL}/calculateUserCount/${startDate}/${endDate}`);
    const data = await orders_count.json();
    setuser_data(data.data);
    setuser_label(data.labels);
  };

  return (
    <>
      <div className="col-12">
        <div className="card">

          <div className="filter">
            <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
              <li className="dropdown-header text-start">
                <h6>Filter</h6>
              </li>
              <div className="dropdown-item" href="#" onClick={() => handlecharts('day')} >Last 12 days</div>
              <div className="dropdown-item" href="#" onClick={() => handlecharts('week')} > last 12 Weeks</div>
              <div className="dropdown-item" href="#" onClick={() => handlecharts('month')} >This Year</div>
              <div className="dropdown-item" href="#" onClick={() => setCustomRangeVisible(true)} >Custom Range</div>
              {/* <li><a className="dropdown-item" href="#" onClick={() => handlecharts('day')} >Last 12 days</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handlecharts('week')} > last 12 Weeks</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handlecharts('month')}>This Year</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setCustomRangeVisible(true)}>Custom Range</a></li> */}
              {/* <li><a className="dropdown-item" href="#" onClick={() => handlecharts('day')} >Last 12 days</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handlecharts('week')} > last 12 Weeks</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handlecharts('month')}>This Year</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => setCustomRangeVisible(true)}>Custom Range</a></li> */}

            </ul>
          </div>
          <div className="card-body">
            <h5 className="card-title">Reports <span>/{range}</span></h5>
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
            {/* Line Chart */}
            <div style={{ height: '400px', width: '730px' }}>
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>

    </>


  )
}




