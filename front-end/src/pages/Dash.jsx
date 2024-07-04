import React from 'react'
// import Header from '/adminSite/components/Header'
// import Sidebar from '/adminSite/components/Sidebar'
// import Footer from '/adminSite/components/Footer'
import Header from '../adminSite/components/Header'
import Footer from '../adminSite/components/Footer'
import Sidebar from '../adminSite/components/Sidebar'
const Dash = () => {
  return (
    <div>
        <Sidebar />
        <Header />
        <main id="main" className="main">
          <div className="pagetitle">
            {/* <h1>Profile</h1> */}
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item">Users</li>
                <li className="breadcrumb-item active">Profile</li>
              </ol>
            </nav>
          </div>{/* End Page Title */}
          <section className="section profile">
            <div>
              <h4 className="py-3 mb-4">
                <span className="text-muted fw-light">eCommerce /</span> Product List
              </h4>
              {/* Product List Widget */}
              <div className="card mb-4">
                <div className="card-widget-separator-wrapper">
                  <div className="card-body card-widget-separator">
                    <div className="row gy-4 gy-sm-1">
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-3 pb-sm-0">
                          <div>
                            <h6 className="mb-2">In-store Sales</h6>
                            <h4 className="mb-2">$5,345.43</h4>
                            <p className="mb-0"><span className="text-muted me-2">5k orders</span><span className="badge bg-label-success">+5.7%</span></p>
                          </div>
                          <div className="avatar me-sm-4">
                            <span className="avatar-initial rounded bg-label-secondary">
                              <i className="bx bx-store-alt bx-sm" />
                            </span>
                          </div>
                        </div>
                        <hr className="d-none d-sm-block d-lg-none me-4" />
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-3 pb-sm-0">
                          <div>
                            <h6 className="mb-2">Website Sales</h6>
                            <h4 className="mb-2">$674,347.12</h4>
                            <p className="mb-0"><span className="text-muted me-2">21k orders</span><span className="badge bg-label-success">+12.4%</span></p>
                          </div>
                          <div className="avatar me-lg-4">
                            <span className="avatar-initial rounded bg-label-secondary">
                              <i className="bx bx-laptop bx-sm" />
                            </span>
                          </div>
                        </div>
                        <hr className="d-none d-sm-block d-lg-none" />
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start border-end pb-3 pb-sm-0 card-widget-3">
                          <div>
                            <h6 className="mb-2">Discount</h6>
                            <h4 className="mb-2">$14,235.12</h4>
                            <p className="mb-0 text-muted">6k orders</p>
                          </div>
                          <div className="avatar me-sm-4">
                            <span className="avatar-initial rounded bg-label-secondary">
                              <i className="bx bx-gift bx-sm" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-2">Affiliate</h6>
                            <h4 className="mb-2">$8,345.23</h4>
                            <p className="mb-0"><span className="text-muted me-2">150 orders</span><span className="badge bg-label-danger">-3.5%</span></p>
                          </div>
                          <div className="avatar">
                            <span className="avatar-initial rounded bg-label-secondary">
                              <i className="bx bx-wallet bx-sm" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product List Table */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Filter</h5>
                  <div className="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
                    <div className="col-md-4 product_status" />
                    <div className="col-md-4 product_category" />
                    <div className="col-md-4 product_stock" />
                  </div>
                </div>
                <div className="card-datatable table-responsive">
                  <table className="datatables-products table border-top">
                    <thead>
                      <tr>
                        <th />
                        <th />
                        <th>product</th>
                        <th>category</th>
                        <th>stock</th>
                        <th>sku</th>
                        <th>price</th>
                        <th>qty</th>
                        <th>status</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>


















          </section>
        </main>
        <Footer />
    </div>
  )
}

export default Dash
