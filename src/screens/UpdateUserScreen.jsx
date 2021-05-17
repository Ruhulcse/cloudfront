import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Meta from '../components/Meta';
// import Message from '../components/Message';
// import { config } from '../utils/tokenConfig';
// import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

function UpdateUserScreen({ location, history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  let id = searchParams.get('id');

  useEffect(() => {
    try {
      async function fetchUserData() {
        setIsloading(true);
        let { data } = await axios.get(`/api/users/profile/${id}`);
        setName(data.name);
        setEmail(data.email);
        setRole(data.role);
        setIsloading(false);
      }
      fetchUserData();
    } catch (error) {
      setError(error.response.data.message);
    }
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { name, email, role };

    try {
      const { data } = await axios.put(
        `/api/users/profile/${id}`,
        userData
        // config
      );
      if (data) {
        history.push('/users/');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {/* <Meta title={'Add New User - MedInfo'} /> */}
      <div className='content-wrapper'>
        {/* Content Header (Page header) */}
        <section className='content-header'>
          <div className='container-fluid'>
            <div className='row mb-2'>
              <div className='col-sm-6'>
                <h3>Update user profile</h3>
              </div>
              <div className='col-sm-6'>
                <ol className='breadcrumb float-sm-right'>
                  <li className='breadcrumb-item'>
                    <Link to='/'>Home</Link>
                  </li>
                  <li className='breadcrumb-item active'>Update user profle</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        {/* Main content */}
        <section className='content'>
          <div className='container-fluid'>
            <div className='row d-flex justify-content-center'>
              {/* left column */}
              <div className='col-md-6'>
                {/* general form elements */}
                <div className='card card-primary'>
                  <div className='card-header'>
                    <h3 className='card-title'>User Profile</h3>
                  </div>
                  {/* {error && <Message>{error}</Message>} */}
                  {/* /.card-header */}
                  {/* form start */}
                  {isLoading ? (
                    '<Loader />'
                  ) : (
                    <form onSubmit={submitHandler}>
                      <div className='card-body'>
                        <div className='form-group'>
                          <label htmlFor='Name'>Name</label>
                          <input
                            type='text'
                            className='form-control'
                            id='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='Email'>Email address</label>
                          <input
                            type='email'
                            className='form-control'
                            id='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className='form-group'>
                          <label htmlFor='Role'>Role</label>
                          <select
                            className='form-control select2'
                            style={{ width: '100%' }}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option selected='selected'>{role}</option>
                            <option value='broker'>Broker</option>
                            <option value='medical'>Medical</option>
                            <option value='spectator'>Spectator</option>
                          </select>
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className='card-footer'>
                        <button type='submit' className='btn btn-primary'>
                          update
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                {/* /.card */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UpdateUserScreen;
