import React, { useState } from "react";
import axios from "axios";
import {URL,config} from "../utils/config"
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function AddData({ history}) {
  const [domain, setDomain] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [contactUrl, setContactUrl] = useState("");
  const [fbUrl, setFbUrl] = useState("");
  const [igUrl, setIgUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [promoMsg, setPromoMsg] = useState("0");
  const [replaid, setReplaid] = useState("None");
  const [reply, setReply] = useState("0");
  const [status, setStatus] = useState("None");
  const [interest, setInterest] = useState("None");
  const [countryCode, setCountryCode] = useState("");
  const [storeTheme, setStoreTheme] = useState("");
  const [storeCreated, setStoreCreated] = useState("");
  const [productSold, setProductSold] = useState("");
  const [rank, setRank] = useState("");
  const [siteEearning, setSiteEearning] = useState("");
  const [followup, setFollowup] = useState("None");
  const [extraNote, setExtraNote] = useState("");
  const [available, setAvailable] = useState(false);
  const [domainMessage, setDomainMessage] = useState(false);
  const [availemsg,setAvailemsg] = useState(false);
  const [error, setError] = useState(null);

  const submitDomain = async (e) => {

    e.preventDefault();
    const domainvalue = domain;
    var re =/^([a-zA-Z0-9-.])/;
    var count= domainvalue.length;
    var final = 0;
    for(let i=0;i<domainvalue.length;i++){
      final++;
      if(re.test(domainvalue[i])===false){
        setDomainMessage(true);
        setAvailemsg(false)
        final--
      }
    }

    if(final===count){
      setDomainMessage(false);
      const Formdata = {
        domain,
      }
      if(domainMessage===false){
        const {data} = await axios.post(`${URL}api/v1/data/check`,Formdata)
        if(data==="Domain available"){
          setAvailable(true);
        }
        else{
          setAvailemsg(true);
        }
        console.log(data);
      }
    }
   
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const Formdata = {
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
     extraNote
    };
  console.log(Formdata);
    try {
      console.log(config);
      const { data } = await axios.post(`${URL}api/v1/data`,Formdata,config)
      console.log(data);
      if (data) {
        history.push("/showData");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
          <Dashboard/>
          </div>
          {/* /.container-fluid */}
        </section>

        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              <div className="col-md-8">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Add Data</h3>
                  </div>
                  {/* {error && <Message>{error}</Message>} */}
                  {/* /.card-header */}
                  {/* form start */}
                  {!available?
                  <div>
                    <form onSubmit={submitDomain}>
                      <div className="card-body">
                        <div className="row">
                        {domainMessage&&<p style={{color:"red"}}>unsupported font</p>}
                        {availemsg&&<p style={{color:"red"}}>Domain Already exists in database</p>}
                        <div className="col-md-12">
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
                        </div>
                      </div>
                      <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Check Domain
                      </button>
                    </div>
                    </form>
                  </div>
                    :
                  <div>
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
                            <label htmlFor="Occupation">Contact page URL</label>
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
                            <label htmlFor="Mobile Number">Facebook Page URL</label>
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
                            <label htmlFor="Desired Country">Promo Message</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={promoMsg}
                              onChange={(e) =>
                                setPromoMsg(e.target.value)
                              }
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
                            <label htmlFor="District">Replied</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={replaid}
                              onChange={(e) => setReplaid(e.target.value)}
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Desired Country">Reply</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={reply}
                              onChange={(e) =>
                                setReply(e.target.value)
                              }
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
                              style={{ width: "100%" }}
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
                              style={{ width: "100%" }}
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
                            <label htmlFor="Date Of Birth">Store Created</label>
                            <input
                              className="form-control"
                              type="date"
                              id="dateOfBirth"
                              value={storeCreated}
                              onChange={(e) => setStoreCreated(e.target.value)}
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
                              onChange={(e) => setSiteEearning(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="District">Followup</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
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
                        Submit
                      </button>
                    </div>
                   </form>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
