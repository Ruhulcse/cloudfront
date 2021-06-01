import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { config, URL } from '../utils/config';
import Dashboard from './Dashboard';

function UpdateDataScreen({ location, history }) {
  const [domain, setDomain] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [contactUrl, setContactUrl] = useState('');
  const [fbUrl, setFbUrl] = useState('');
  const [igUrl, setIgUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [promoMsg, setPromoMsg] = useState('0');
  const [replaid, setReplaid] = useState('None');
  const [reply, setReply] = useState('0');
  const [status, setStatus] = useState('None');
  const [interest, setInterest] = useState('None');
  const [countryCode, setCountryCode] = useState('');
  const [storeTheme, setStoreTheme] = useState('');
  const [storeCreated, setStoreCreated] = useState('');
  const [productSold, setProductSold] = useState('');
  const [rank, setRank] = useState('');
  const [siteEearning, setSiteEearning] = useState('');
  const [followup, setFollowup] = useState('None');
  const [extraNote, setExtraNote] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  let id = searchParams.get('id');

  useEffect(() => {
    try {
      async function fetchUserData() {
        setIsloading(true);
        let { data } = await axios.get(`${URL}api/v1/data/${id}`, config);
        setDomain(data.domain);
        setCompanyName(data.companyName);
        setEmail(data.email);
        setContactUrl(data.contactUrl);
        setFbUrl(data.fbUrl);
        setIgUrl(data.igUrl);
        setTwitterUrl(data.twitterUrl);
        setPhone(data.phone);
        setPromoMsg(data.promoMsg);
        setReplaid(data.replaid);
        setReply(data.reply);
        setStatus(data.status);
        setInterest(data.interest);
        setCountryCode(data.countryCode);
        setStoreTheme(data.storeTheme);
        setStoreCreated(data.storeCreated);
        setProductSold(data.productSold);
        setRank(data.rank);
        setSiteEearning(data.siteEearning);
        setFollowup(data.followup);
        setExtraNote(data.extraNote);

        setIsloading(false);
      }
      fetchUserData();
    } catch (error) {
      setError(error.response.data.message);
    }
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      domain,
      companyName,
      email,
      contactUrl,
      fbUrl,
      igUrl,
      twitterUrl,
      phone,
      promoMsg,
      replaid,
      reply,
      status,
      interest,
      countryCode,
      storeTheme,
      storeCreated,
      productSold,
      rank,
      siteEearning,
      followup,
      extraNote,
    };

    try {
      const { data } = await axios.put(
        `${URL}api/v1/data/${id}`,
        userData,
        config
      );
      if (data) {
        history.push('/showData/');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {/* <Meta title={'Add New User - MedInfo'} /> */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <Dashboard />
          <div className="container-fluid">
            <div className="row mb-2 mt-3">
              <div className="col-sm-6">
                <h1>Update Data</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">Update Data</li>
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              {/* left column */}
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Data Details</h3>
                  </div>
                  {/* {error && <Message>{error}</Message>} */}
                  {/* /.card-header */}
                  {/* form start */}
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <form onSubmit={submitHandler}>
                      <div className="card-body">
                        <div className="row">
                          {/* /.col */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Name">Domain</label>
                              <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Passport">Company Name</label>
                              <input
                                type="text"
                                className="form-control"
                                id="companyname"
                                placeholder="Enter Company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* /.col */}

                          {/* /.col */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Email">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Occupation">
                                Contact page URL
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="occupation"
                                placeholder="Enter contact page url"
                                value={contactUrl}
                                onChange={(e) => setContactUrl(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* /.col */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Mobile Number">
                                Facebook Page URL
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="mobileNumber"
                                placeholder="Enter Facebook Page URL"
                                value={fbUrl}
                                onChange={(e) => setFbUrl(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="IG page URL">IG page URL</label>
                              <input
                                type="text"
                                className="form-control"
                                id="fathersName"
                                placeholder="Enter IG page URL"
                                value={igUrl}
                                onChange={(e) => setIgUrl(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Father's Mobile">
                                Twitter URL
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="fathersMobile"
                                placeholder="Enter Twitter URL"
                                value={twitterUrl}
                                onChange={(e) => setTwitterUrl(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Village">Phone Number</label>
                              <input
                                type="text"
                                className="form-control"
                                id="village"
                                placeholder="Enter Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Desired Country">
                                Promo Message
                              </label>
                              <select
                                className="form-control select2"
                                style={{ width: '100%' }}
                                value={promoMsg}
                                onChange={(e) => setPromoMsg(e.target.value)}
                              >
                                <option selected="selected">None</option>
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
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Desired Country">Reply</label>
                              <select
                                className="form-control select2"
                                style={{ width: '100%' }}
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                              >
                                <option selected="selected">None</option>
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
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="District">Status</label>
                              <select
                                className="form-control select2"
                                style={{ width: '100%' }}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option selected="selected">None</option>
                                <option>Banned</option>
                                <option>Sold</option>
                                <option>Active</option>
                                <option>None</option>
                              </select>
                            </div>
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="District">Interest</label>
                              <select
                                className="form-control select2"
                                style={{ width: '100%' }}
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                              >
                                <option selected="selected">None</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>None</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Reference Thana">
                                Country Code
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="refThana"
                                placeholder="Enter Country Code"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Facebook">Store Theme</label>
                              <input
                                type="text"
                                className="form-control"
                                id="fb"
                                placeholder="Enter store theme"
                                value={storeTheme}
                                onChange={(e) => setStoreTheme(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Date Of Birth">
                                Store Created
                              </label>
                              <input
                                className="form-control"
                                type="date"
                                id="dateOfBirth"
                                value={storeCreated}
                                onChange={(e) =>
                                  setStoreCreated(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Facebook">Product Sold</label>
                              <input
                                type="text"
                                className="form-control"
                                id="fb"
                                placeholder="Enter product sold"
                                value={productSold}
                                onChange={(e) => setProductSold(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Facebook">Rank</label>
                              <input
                                type="text"
                                className="form-control"
                                id="fb"
                                placeholder="Enter Rank"
                                value={rank}
                                onChange={(e) => setRank(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Facebook">Site Earnings</label>
                              <input
                                type="text"
                                className="form-control"
                                id="fb"
                                placeholder="Enter site earnings "
                                value={siteEearning}
                                onChange={(e) =>
                                  setSiteEearning(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="District">Followup</label>
                              <select
                                className="form-control select2"
                                style={{ width: '100%' }}
                                value={followup}
                                onChange={(e) => setFollowup(e.target.value)}
                              >
                                <option selected="selected">None</option>
                                <option>Yes</option>
                                <option>No</option>
                                <option>None</option>
                              </select>
                            </div>
                          </div>
                          {/* /.row */}

                          {/* /.row */}
                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="Facebook">Extra Note</label>
                              <textarea
                                type="text"
                                className="form-control"
                                id="fb"
                                placeholder="Write extra notes"
                                value={extraNote}
                                onChange={(e) => setExtraNote(e.target.value)}
                              />
                            </div>
                          </div>
                          {/* /.row */}
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                          Update data
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

export default UpdateDataScreen;
