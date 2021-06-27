import React, { useState, useEffect } from "react";
import axios from "axios";
import Paginate from "../Components/Paginate";
import { config, URL } from '../utils/config';
import { LinkContainer } from "react-router-bootstrap";
import { Button, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Fuse from 'fuse.js';
import { CSVLink } from 'react-csv';
import Dashboard from "./Dashboard";

function Show({ location, history }) {
    const [loading, setLoading] = useState(false);
    const [promoMsg, setPromoMsg] = useState('');
    const [replied, setReplied] = useState('');
    const [reply, setReply] = useState('');
    const [status, setStatus] = useState('');
    const [interest, setInterest] = useState('');
    const [followup, setFollowup] = useState('');
    const [pager, setPager] = useState({});
    const [pageOfItems, setPageOfItems] = useState([]);
    const [checkData, setCheckData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const userData = JSON.parse(localStorage.getItem('user'));

    //filter by date
    const submitDate = async (e) => {
        e.preventDefault();
        let result = checkData?.filter(
          (item) => item.createdDate >= startDate && item.createdDate <= endDate
        );
        setPageOfItems(result);
      };

      //auto search by domain
      useEffect(() => {
        const fuse = new Fuse(pageOfItems, {
          keys: ['domain'],
        });
        const results = fuse.search(searchTerm).map(({ item }) => item);
    
        if (
          pageOfItems.length > 0 &&
          searchTerm.length >= 0 &&
          results.length > 0
        ) {
          setPageOfItems(results);
        } else {
          setPageOfItems(pageOfItems);
        }
      }, [searchTerm]);
    //filter by data
    const filterApplied = () => {
        let filteredItems = pageOfItems?.filter(
          (item) =>
            item.promoMsg === promoMsg ||
            item.replaid === replied ||
            item.reply === reply ||
            item.interest === interest ||
            item.followup === followup ||
            item.status === status
        );
        setPageOfItems(filteredItems);
      };
      //delete a data
      const deleteHandler = async (id) => {
        if (window.confirm('Delete the item?')) {
          await axios.delete(`${URL}api/v1/data/${id}`, config);
          window.location.reload();
        }
      };
    useEffect(() => {
        try {
          async function fetchMedicalData() {
            setUser(JSON.parse(localStorage.getItem("user")));
            const params = new URLSearchParams(location.search);
            const page = parseInt(params.get("page")) || 1;
            setLoading(true);
            if (page !== pager.currentPage) {
              let users = JSON.parse(localStorage.getItem("user"));
              let id = users._id;
              console.log(users.name);
              let {
                data: { pager, pageOfItems },
              } =
                users.role === "admin"
                  ? await axios.get(`${URL}api/v1/data?page=${page}`, config)
                  : await axios.get(`${URL}api/v1/data/user/${id}?page=${page}`,config);
              setPager(pager);
              setPageOfItems(pageOfItems);
              console.log(pager);
              console.log(pageOfItems);
              setLoading(false);
            }
          }
          fetchMedicalData();
        } catch (error) {
          console.log(error);
        }
      }, [location.search, pager.currentPage]);
    return (
        <div>
           <>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                 <Dashboard/>
                 <div className="container-fluid pt-5">
                    <div className="row mt-3">
                    <div className="col-sm-6">
                        <h1>All Data</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item active">All Data</li>
                        </ol>
                    </div>
                    </div>
                </div>
                {/* /.container-fluid */}
                </section>

                <div className="card">
                {loading ? (
                <p>Loading...</p>
                ) : (
                    <div className="card-body">
                    <div className="row mb-2">
                      <div className="col">
                        {userData.role !== 'restricted' && (
                            <div className="ml-3">
                            <LinkContainer to={'/dashboard/addData'}>
                                <Button variant="primary" className="btn mr-4">
                                Add Data
                                </Button>
                            </LinkContainer>
                            <CSVLink
                                data={pageOfItems}
                                filename={'data-file.csv'}
                                className="btn btn-outline-primary"
                            >
                                <i className="fas fa-file-download"></i> Export to CSV
                            </CSVLink>
                            </div>
                           )}
                            <div className="col mt-2">
                                <Form inline>
                                <Form.Control
                                    type="text"
                                    // name="q"
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search..."
                                    className="mr-sm-2"
                                ></Form.Control>{' '}
                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="sm"
                                    className="p-2"
                                >
                                    Search
                                </Button>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    className="p-2 ml-1"
                                    onClick={() => window.location.reload()}
                                >
                                    Reset
                                </Button>
                                </Form>
                            </div>
                            <div className="container">
                                <form onSubmit={submitDate}>
                                <div className="row">
                                    <div className="col-md-4">
                                    To:
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="dateOfBirth"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                    </div>
                                    <div className="col-md-4">
                                    Form:
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="dateOfBirth"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                    </div>
                                </div>
                                <div className="card-footer bg-gray">
                                    <button type="submit" className="btn btn-primary">
                                    Apply
                                    </button>
                                </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-auto">
                            <>
                                <strong>Filter By</strong>
                                <br />
                                <div className="col-md-12 form-inline">
                                <div className="form-group mr-1">
                                    <label htmlFor="Desired Country">Promo Message</label>
                                    <select
                                    className="form-control select2"
                                    style={{ width: '100%' }}
                                    value={promoMsg}
                                    onChange={(e) => setPromoMsg(e.target.value)}
                                    >
                                    <option selected="selected">-</option>
                                    <option>None</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    </select>
                                </div>
                                <div className="form-group mr-1">
                                    <label htmlFor="District">Replied</label>
                                    <select
                                    className="form-control select2"
                                    style={{ width: '100%' }}
                                    value={replied}
                                    onChange={(e) => setReplied(e.target.value)}
                                    >
                                    <option selected="selected">-</option>
                                    <option>None</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                    <option>None</option>
                                    </select>
                                </div>
                                <div className="form-group mr-1">
                                    <label htmlFor="Desired Country">Reply</label>
                                    <select
                                    className="form-control select2"
                                    style={{ width: '100%' }}
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    >
                                    <option selected="selected">-</option>
                                    <option>None</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    </select>
                                </div>
                                <div className="form-group mr-1">
                                    <label htmlFor="District">Status</label>
                                    <select
                                    className="form-control select2"
                                    style={{ width: '100%' }}
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    >
                                    <option selected="selected">-</option>
                                    <option>None</option>
                                    <option>Banned</option>
                                    <option>Sold</option>
                                    <option>Active</option>
                                    <option>None</option>
                                    </select>
                                </div>
                                <div className="form-group mr-1">
                                    <label htmlFor="District">Interest</label>
                                    <select
                                    className="form-control select2"
                                    style={{ width: '100%' }}
                                    value={interest}
                                    onChange={(e) => setInterest(e.target.value)}
                                    >
                                    <option selected="selected">-</option>
                                    <option>None</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                    <option>None</option>
                                    </select>
                                </div>
                                <div className="form-group mr-1">
                                    <label htmlFor="District">Followup</label>
                                    <select
                                    className="form-control select2"
                                    style={{ width: '100%' }}
                                    value={followup}
                                    onChange={(e) => setFollowup(e.target.value)}
                                    >
                                    <option selected="selected">-</option>
                                    <option>None</option>
                                    <option>Yes</option>
                                    <option>No</option>
                                    <option>None</option>
                                    </select>
                                </div>

                                <Col>
                                    <Button
                                    variant="outline-primary"
                                    className="mt-4"
                                    size="sm"
                                    onClick={() => {
                                        filterApplied();
                                    }}
                                    >
                                    Go
                                    </Button>
                                    <Button
                                    variant="danger"
                                    size="sm"
                                    className="ml-1 mt-4"
                                    onClick={() => window.location.reload()}
                                    >
                                    Reset
                                    </Button>
                                </Col>
                                </div>
                            </>
                        </div>
                    </div>
                    <table
                        id="allMedicalData"
                        className="table table-bordered table-striped"
                    >
                        <thead>
                        <tr className="bg-dark">
                            <th>Added by</th>
                            <th>Company Name</th>
                            <th>Domain</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Facebook</th>
                            <th>Instagram</th>
                            <th>Twitter</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pageOfItems.map((user) => {
                            return (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                            <td>{user.companyname}</td>
                            <td>{user.domain}</td>
                            <td>{user.email}</td>
                            <td>
                                <a href={user.contacturl} target="blank">
                                {user.contacturl?user.contacturl.substring(0,14)+'...':"null"}
                                </a>
                            </td>
                            <td>
                                <a href={user.fburl} target="blank">
                                {user.fburl?user.fburl.substring(0,14)+'...':"null"}
                                </a>
                            </td>
                            <td>
                                <a href={user.igurl} target="blank">
                                {user.igurl?user.igurl.substring(0,14)+'...':"null"}
                                </a>
                            </td>
                            <td>
                                <a href={user.twitterurl} target="blank">
                                {user.twitterurl?user.twitterurl.substring(0,14)+'...':"null"}
                                </a>
                            </td>
                            <td>{user.phone}</td>
                            <td>
                                <LinkContainer to={`/updatedata?id=${user._id}`}>
                                <Button
                                    variant="warning"
                                    className="btn-sm ml-2 mr-1 "
                                >
                                    <i className="fas fa-edit"></i>
                                </Button>
                                </LinkContainer>{' '}
                                <Button
                                variant="danger"
                                className="btn-sm"
                                onClick={() => deleteHandler(user._id)}
                                >
                                <i className="fas fa-trash-alt"></i>
                                </Button>
                            </td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </table>
                    <Paginate pager={pager} />
                    </div>
                )}
                </div>
            </div>
           </>
        </div>
    )
}

export default Show
