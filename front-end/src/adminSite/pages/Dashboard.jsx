import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { Report } from '../components/Report';
import { OrderChart } from '../components/OrderChart';
const Dashboard = () => {
  const SITE_URL = process.env.REACT_APP_SITE_URL;

  const [day, set_day] = useState('month');
  const [order_count, setorder_count] = useState('');
  const [order_change, setorder_change] = useState('');
  const [changeType, setchangeType] = useState('');

  const [dayPrize, set_dayPrize] = useState('week');
  const [order_Prize, setorder_Prize] = useState('');
  const [order_changePrize, setorder_changePrize] = useState('');
  const [changeinPrize, setchangeinPrize] = useState('');

  const [userperiod, setuserperiod] = useState('today');
  const [usercount, set_usercount] = useState('');
  const [userChange_type, setuserChange_type] = useState('');
  const [changeinUser, setchangeinUser] = useState('');


  useEffect(() => {
    handleItemClick(day);
    handleorderPrize(dayPrize);
    handleCustomer(userperiod);
  }, [])

  async function handleItemClick(param) {
    // async function order_count(param){
    // Placeholder function for fetching data based on the selected period
    const orders_count = await fetch(`${SITE_URL}/ordercount/${param}`);
    const data = await orders_count.json();

    setorder_count(data.ordersCount);
    set_day(data.params);
    setorder_change(data.absoluteChange);
    setchangeType(data.changeType);
    // Implement your data fetching logic here
  };

  async function handleorderPrize(para) {
    const orders_count = await fetch(`${SITE_URL}/orderamount/${para}`);
    const data = await orders_count.json();

    setorder_Prize(data.totalAmount);
    set_dayPrize(data.params);
    setorder_changePrize(data.changeInAmount);
    setchangeinPrize(data.PrizechangeType);
  };

  async function handleCustomer(par) {
    const orders_count = await fetch(`${SITE_URL}/usercount/${par}`);
    const data = await orders_count.json();

    set_usercount(data.currentBuyerCount);
    setuserperiod(data.period);
    setuserChange_type(data.changeType);
    setchangeinUser(data.changeCount);
    // Implement your data fetching logic here
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <main id="main" className="main">
        <div className="pagetitle">
          {/* <h1>Dashboard</h1> */}
          <nav>
            <ol className="breadcrumb">
              <Link to='/admin/Dashboard' className="breadcrumb-item">Home</Link>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>{/* End Page Title */}
        <section className="section dashboard">
          <div className="row">
            {/* Left side columns */}
            <div className="col-lg-8">
              <div className="row">
                {/* Sales Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleItemClick('today')} >Today</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleItemClick('week')} >This week</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleItemClick('month')} > This Month</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleItemClick('year')}>This Year</a></li>



                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Orders <span>| {day}</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart" />
                        </div>
                        <div className="ps-3">
                          <h6>{order_count}</h6>
                          {/* <span className="text-success small pt-1 fw-bold">  {changeType}  {order_change}</span>  */}

                          <p>
                            {changeType === 'increase' && (
                              <span className='text-success small pt-1 fw-bold'>Orders increased by   {order_change}   📈</span>
                            )}
                            {changeType === 'decrease' && (
                              <span className="text-danger small pt-1 fw-bold">Orders decreased by {order_change} 📉</span>
                            )}
                            {changeType === 'nochange' && <span className="text-dark small pt-1 fw-bold">No changes in the order count 📊 </span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* End Sales Card */}
                {/* Revenue Card */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleorderPrize('today')} >Today</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleorderPrize('week')} >This week</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleorderPrize('month')} > This Month</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleorderPrize('year')}>This Year</a></li>

                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Revenue <span>| {dayPrize}</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar" />
                        </div>
                        <div className="ps-3">
                          <h6>₹{order_Prize}</h6>
                          {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}

                          <p>
                            {changeinPrize === 'increase' && (
                              <span className='text-success small pt-1 fw-bold'> Revenue increased by  ₹  {order_changePrize}   📈</span>
                            )}
                            {changeinPrize === 'decrease' && (
                              <span className="text-danger small pt-1 fw-bold"> Revenue decrease by -₹{order_changePrize} 📉</span>
                            )}
                            {changeinPrize === 'nochange' && <span className="text-dark small pt-1 fw-bold">No changes in the order revenue 📊 </span>}
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* End Revenue Card */}
                {/* Customers Card */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('today')} >Today</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('week')} >This week</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('month')} > This Month</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('year')}>This Year</a></li>

                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Customers <span>| {userperiod}</span></h5>
                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people" />
                        </div>
                        <div className="ps-3">
                          <h6>{usercount}</h6>
                          {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}
                          <p>
                            {userChange_type === 'increase' && (
                              <span className='text-success small pt-1 fw-bold'> Customers increased by   {changeinUser}   📈</span>
                            )}
                            {userChange_type === 'decrease' && (
                              <span className="text-danger small pt-1 fw-bold">Customers decreased by {changeinUser} 📉</span>
                            )}
                            {userChange_type === 'nochange' && <span className="text-dark small pt-1 fw-bold">No changes in the Customer count 📊 </span>}
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* End Customers Card */}
                <Report />
                {/* Recent Sales */}
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('today')} >Today</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('week')} >This week</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('month')} > This Month</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => handleCustomer('year')}>This Year</a></li>

                      </ul>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Recent Sales <span>| Today</span></h5>
                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"><a href="#">#2457</a></th>
                            <td>Brandon Jacob</td>
                            <td><a href="#" className="text-primary">At praesentium minu</a></td>
                            <td>$64</td>
                            <td><span className="badge bg-success">Approved</span></td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#">#2147</a></th>
                            <td>Bridie Kessler</td>
                            <td><a href="#" className="text-primary">Blanditiis dolor omnis similique</a></td>
                            <td>$47</td>
                            <td><span className="badge bg-warning">Pending</span></td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#">#2049</a></th>
                            <td>Ashleigh Langosh</td>
                            <td><a href="#" className="text-primary">At recusandae consectetur</a></td>
                            <td>$147</td>
                            <td><span className="badge bg-success">Approved</span></td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#">#2644</a></th>
                            <td>Angus Grady</td>
                            <td><a href="#" className="text-primar">Ut voluptatem id earum et</a></td>
                            <td>$67</td>
                            <td><span className="badge bg-danger">Rejected</span></td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#">#2644</a></th>
                            <td>Raheem Lehner</td>
                            <td><a href="#" className="text-primary">Sunt similique distinctio</a></td>
                            <td>$165</td>
                            <td><span className="badge bg-success">Approved</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>{/* End Recent Sales */}
                {/* Top Selling */}
                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>
                        <li><a className="dropdown-item" href="#">Today</a></li>
                        <li><a className="dropdown-item" href="#">This Month</a></li>
                        <li><a className="dropdown-item" href="#">This Year</a></li>
                      </ul>
                    </div>
                    <div className="card-body pb-0">
                      <h5 className="card-title">Top Selling <span>| Today</span></h5>
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-1.jpg" alt /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Ut inventore ipsa voluptas nulla</a></td>
                            <td>$64</td>
                            <td className="fw-bold">124</td>
                            <td>$5,828</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-2.jpg" alt /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Exercitationem similique doloremque</a></td>
                            <td>$46</td>
                            <td className="fw-bold">98</td>
                            <td>$4,508</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-3.jpg" alt /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Doloribus nisi exercitationem</a></td>
                            <td>$59</td>
                            <td className="fw-bold">74</td>
                            <td>$4,366</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-4.jpg" alt /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Officiis quaerat sint rerum error</a></td>
                            <td>$32</td>
                            <td className="fw-bold">63</td>
                            <td>$2,016</td>
                          </tr>
                          <tr>
                            <th scope="row"><a href="#"><img src="assets/img/product-5.jpg" alt /></a></th>
                            <td><a href="#" className="text-primary fw-bold">Sit unde debitis delectus repellendus</a></td>
                            <td>$79</td>
                            <td className="fw-bold">41</td>
                            <td>$3,239</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>{/* End Top Selling */}
              </div>
            </div>{/* End Left side columns */}
            {/* Right side columns */}
            <div className="col-lg-4">
              {/* <OrderChart/> */}
              <OrderChart />



              {/* Budget Report */}
              {/* <div className="card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>
                <div className="card-body pb-0">
                  <h5 className="card-title">Budget Report <span>| This Month</span></h5>
                  <div id="budgetChart" style={{ minHeight: 400 }} className="echart" />
                </div>
              </div> */}

              <div className="card">
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>
                <div className="card-body pb-0">
                  <h5 className="card-title">News &amp; Updates <span>| Today</span></h5>
                  <div className="news">
                    <div className="post-item clearfix">
                      <img src="assets/img/news-1.jpg" alt />
                      <h4><a href="#">Nihil blanditiis at in nihil autem</a></h4>
                      <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                    </div>
                    <div className="post-item clearfix">
                      <img src="assets/img/news-2.jpg" alt />
                      <h4><a href="#">Quidem autem et impedit</a></h4>
                      <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
                    </div>
                    <div className="post-item clearfix">
                      <img src="assets/img/news-3.jpg" alt />
                      <h4><a href="#">Id quia et et ut maxime similique occaecati ut</a></h4>
                      <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
                    </div>
                    <div className="post-item clearfix">
                      <img src="assets/img/news-4.jpg" alt />
                      <h4><a href="#">Laborum corporis quo dara net para</a></h4>
                      <p>Qui enim quia optio. Eligendi aut asperiores enim repellendusvel rerum cuder...</p>
                    </div>
                    <div className="post-item clearfix">
                      <img src="assets/img/news-5.jpg" alt />
                      <h4><a href="#">Et dolores corrupti quae illo quod dolor</a></h4>
                      <p>Odit ut eveniet modi reiciendis. Atque cupiditate libero beatae dignissimos eius...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* End News & Updates */}
            </div>{/* End Right side columns */}
          </div>
        </section>
      </main>{/* End #main */}
      <Footer />
    </div>
  )
}

export default Dashboard
