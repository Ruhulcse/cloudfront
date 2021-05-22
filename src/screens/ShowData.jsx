import { useQuery } from 'react-query';
import { config, URL } from '../utils/config';
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import { CSVLink } from 'react-csv';
import { useEffect, useState } from 'react';

export default function ShowData() {
  const [promoMsg, setPromoMsg] = useState('0');
  const [replied, setReplied] = useState('None');
  const [reply, setReply] = useState('0');
  const [status, setStatus] = useState('None');
  const [interest, setInterest] = useState('None');
  const [followup, setFollowup] = useState('None');
  const [loading, setLoading] = useState(true);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [user, setUser] = useState([]);

  // const { isLoading, error, data } = useQuery('userData', () =>
  //   axios.get(`${URL}api/v1/data`, config)
  // );

  // if (error) return 'An error has occurred: ' + error.message;

  // console.log(data);
  // console.log(data.data);
  //setUser(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    try {
      async function fetchUserData() {
        setLoading(true);
        let user = JSON.parse(localStorage.getItem("user"));
        let id = user._id;
        console.log(user);
        let data = user.role === "admin" ? await axios.get(`${URL}api/v1/data`, config): await axios.get(`${URL}api/v1/data/user/${id}`, config);
        // setPager(pager);
        setPageOfItems(data?.data);
        console.log(data?.data);
        setLoading(false);
      }
      fetchUserData();
    } catch (error) {

      console.log(error);
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (keyword) {
    //   history.push(`/users/search/${keyword}/page/1`);
    // }
  };

  const deleteHandler = async (id) => {
    console.log(id);
    if (window.confirm('Delete the item?')) {
      await axios.delete(`${URL}api/v1/data/${id}`, config);
      window.location.reload();
    }
  };

  console.log(replied);

  const filterApplied = () => {
    console.log('filtered');
    let filteredItems = pageOfItems?.filter(
      (item) =>
        item.promoMsg === promoMsg &&
        item.replaid === replied &&
        item.reply === reply &&
        item.interest === interest &&
        item.followup === followup &&
        item.status === status
    );
    setPageOfItems(filteredItems);
    console.log(filteredItems);
  };

  // if (loading) return 'Loading...';

  return (
    <>
      <div className='content-wrapper'>
        {/* Content Header (Page header) */}
        <section className='content-header'>
          <Dashboard />
          <div className='container-fluid'>
            <div className='row mt-3'>
              <div className='col-sm-6'>
                <h1>All Data</h1>
              </div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-sm-right'>
                  <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                  </li>
                  <li className='breadcrumb-item active'>All Data</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        <div className='card'>
          {loading ? (
            'Loading...'
          ) : (
            <div className='card-body'>
              <div className='row mb-2'>
                <div className='col'>
                  <LinkContainer to={'/dashboard/addData'}>
                    <Button variant='primary' className='btn mr-4'>
                      Add Data
                    </Button>
                  </LinkContainer>
                  <CSVLink
                    data={pageOfItems}
                    filename={'data-file.csv'}
                    className='btn btn-outline-primary'
                  >
                    <i className='fas fa-file-download'></i> Export to CSV
                  </CSVLink>
                </div>
                <div className='col-auto'>
                  <>
                    <strong>Filter By</strong>
                    <br />
                    <div className='col-md-12 form-inline'>
                      <div className='form-group mr-1'>
                        <label htmlFor='Desired Country'>Promo Message</label>
                        <select
                          className='form-control select2'
                          style={{ width: '100%' }}
                          value={promoMsg}
                          onChange={(e) => setPromoMsg(e.target.value)}
                        >
                          <option selected='selected'>None</option>
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
                      <div className='form-group mr-1'>
                        <label htmlFor='District'>Replied</label>
                        <select
                          className='form-control select2'
                          style={{ width: '100%' }}
                          value={replied}
                          onChange={(e) => setReplied(e.target.value)}
                        >
                          <option selected='selected'>None</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div className='form-group mr-1'>
                        <label htmlFor='Desired Country'>Reply</label>
                        <select
                          className='form-control select2'
                          style={{ width: '100%' }}
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                        >
                          <option selected='selected'>None</option>
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
                      <div className='form-group mr-1'>
                        <label htmlFor='District'>Status</label>
                        <select
                          className='form-control select2'
                          style={{ width: '100%' }}
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option selected='selected'>None</option>
                          <option>Banned</option>
                          <option>Sold</option>
                          <option>Active</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div className='form-group mr-1'>
                        <label htmlFor='District'>Interest</label>
                        <select
                          className='form-control select2'
                          style={{ width: '100%' }}
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                        >
                          <option selected='selected'>None</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>None</option>
                        </select>
                      </div>
                      <div className='form-group mr-1'>
                        <label htmlFor='District'>Followup</label>
                        <select
                          className='form-control select2'
                          style={{ width: '100%' }}
                          value={followup}
                          onChange={(e) => setFollowup(e.target.value)}
                        >
                          <option selected='selected'>None</option>
                          <option>Yes</option>
                          <option>No</option>
                          <option>None</option>
                        </select>
                      </div>

                      <Col>
                        <Button
                          variant='outline-primary'
                          className='mt-4'
                          size='sm'
                          onClick={() => {
                            filterApplied();
                          }}
                        >
                          Go
                        </Button>
                      </Col>
                    </div>

                    {/* <Form onSubmit={submitHandler} inline>
                      <Form.Control
                        type='text'
                        name='q'
                        // onChange={(e) => setKeyword(e.target.value)}
                        placeholder='Search...'
                        className='mr-sm-2 ml-auto'
                      ></Form.Control>{' '}
                      <Button
                        type='submit'
                        variant='outline-primary'
                        className='p-2'
                      >
                        Search
                      </Button>
                    </Form> */}
                  </>
                </div>
              </div>
              <table
                id='allUsers'
                className='table table-bordered table-striped'
              >
                <thead>
                  <tr className='bg-dark text-white'>
                    <th>Company Name</th>
                    <th>Domain</th>
                    <th>Email</th>
                    <th>Country Code</th>
                    <th>Phone</th>
                    <th>Facebook</th>
                    <th>Instagram</th>
                    <th>Twitter</th>
                    <th>Rank</th>
                    <th>Site Earning</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {pageOfItems?.map((user) => (
                    <tr key={user._id}>
                      <td>{user.companyName}</td>
                      <td>{user.domain}</td>
                      <td>{user.email}</td>
                      <td>{user.countryCode}</td>
                      <td>{user.phone}</td>
                      <td>{user.fbUrl}</td>
                      <td>{user.igUrl}</td>
                      <td>{user.twitterUrl}</td>
                      <td>{user.rank}</td>
                      <td>{user.siteEearning}</td>
                      <td>
                        <LinkContainer to={`/updatedata?id=${user._id}`}>
                          <Button
                            variant='warning'
                            className='btn-sm ml-2 mr-1 '
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>{' '}
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i className='fas fa-trash-alt'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <Paginate pager={pager} /> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
