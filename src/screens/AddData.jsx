import React, { useState } from "react";
import axios from "axios";
import {URL,config} from "../Utils/Config"
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function AddData({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passport, setPassport] = useState("");
  const [occupation, setOccupation] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [desiredCountry, setDesiredCountry] = useState("Saudi Arabia");
  const [fathersName, setFatherName] = useState("");
  const [fathersMobile, setFathersMobile] = useState("");
  const [village, setVillage] = useState("");
  const [thana, setThana] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [referenceName, setReferenceName] = useState("");
  const [refMobile, setRefMobile] = useState("");
  const [refVillage, setRefVillage] = useState("");
  const [refThana, setRefThana] = useState("");
  const [refDistrict, setRefDistrict] = useState("Dhaka");
  const [imo, setImo] = useState("");
  const [fb, setFb] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const medicalData = {
      name,
      email,
      passport,
      occupation,
      mobileNumber,
      dateOfBirth,
      desiredCountry,
      fathersName,
      fathersMobile,
      village,
      thana,
      district,
      referenceName,
      refMobile,
      refVillage,
      refThana,
      refDistrict,
      imo,
      fb,
    };

    try {
      const { data } = await axios.post(
        "/api/forms/medical",
        medicalData,
        config
      );
      if (data) {
        history.push("/forms/medical");
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
                    <h3 className="card-title">Medical Data</h3>
                  </div>
                  {/* {error && <Message>{error}</Message>} */}
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={submitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Name">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              placeholder="Enter name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Passport">Passport</label>
                            <input
                              type="text"
                              className="form-control"
                              id="passport"
                              placeholder="Enter Passport Number"
                              value={passport}
                              onChange={(e) => setPassport(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Occupation">Occupation</label>
                            <input
                              type="text"
                              className="form-control"
                              id="occupation"
                              placeholder="Enter Occupation"
                              value={occupation}
                              onChange={(e) => setOccupation(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Mobile Number">Mobile Number</label>
                            <input
                              type="text"
                              className="form-control"
                              id="mobileNumber"
                              placeholder="Enter Mobile Number"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Date Of Birth">Date Of Birth</label>
                            <input
                              className="form-control"
                              type="date"
                              id="dateOfBirth"
                              value={dateOfBirth}
                              onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Desired Country">Travel to</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={desiredCountry}
                              onChange={(e) =>
                                setDesiredCountry(e.target.value)
                              }
                            >
                              <option selected="selected">Saudi Arabia</option>
                              <option>Turkey</option>
                              <option>Bahrain</option>
                              <option>Qatar</option>
                              <option>Lebanon</option>
                              <option>Jordan</option>
                              <option>United Arab Emirates</option>
                              <option>Kuwait</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Father's Name">Father's Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fathersName"
                              placeholder="Enter Father's Name"
                              value={fathersName}
                              onChange={(e) => setFatherName(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Father's Mobile">
                              Father's Mobile
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="fathersMobile"
                              placeholder="Enter Father's Mobile"
                              value={fathersMobile}
                              onChange={(e) => setFathersMobile(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Village">Village</label>
                            <input
                              type="text"
                              className="form-control"
                              id="village"
                              placeholder="Enter Village"
                              value={village}
                              onChange={(e) => setVillage(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Thana">Thana</label>
                            <input
                              type="text"
                              className="form-control"
                              id="thana"
                              placeholder="Enter Thana"
                              value={thana}
                              onChange={(e) => setThana(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="District">District</label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                            >
                              <option selected="selected">Dhaka</option>
                              <option>Bagerhat</option>
                              <option>Bandarban</option>
                              <option>Barguna</option>
                              <option>Barisal</option>
                              <option>Bhola</option>
                              <option>Bogra</option>
                              <option>Brahmanbaria</option>
                              <option>Chandpur</option>
                              <option>Chittagong</option>
                              <option>Chuadanga</option>
                              <option>Comilla</option>
                              <option>Cox's Bazar</option>
                              <option>Dinajpur</option>
                              <option>Faridpur</option>
                              <option>Feni</option>
                              <option>Gaibandha</option>
                              <option>Gazipur</option>
                              <option>Gopalganj</option>
                              <option>Habiganj</option>
                              <option>Jaipurhat</option>
                              <option>Jamalpur</option>
                              <option>Jessore</option>
                              <option>Jhalakati</option>
                              <option>Jhenaidah</option>
                              <option>Khagrachari</option>
                              <option>Khulna</option>
                              <option>Kishoreganj</option>
                              <option>Kurigram</option>
                              <option>Kushtia</option>
                              <option>Lakshmipur</option>
                              <option>Lalmonirhat</option>
                              <option>Madaripur</option>
                              <option>Magura</option>
                              <option>Manikganj</option>
                              <option>Meherpur</option>
                              <option>Moulvibazar</option>
                              <option>Munshiganj</option>
                              <option>Mymensingh</option>
                              <option>Naogaon</option>
                              <option>Narail</option>
                              <option>Narayanganj</option>
                              <option>Narsingdi</option>
                              <option>Natore</option>
                              <option>Nawabganj</option>
                              <option>Netrakona</option>
                              <option>Nilphamari</option>
                              <option>Noakhali</option>
                              <option>Pabna</option>
                              <option>Panchagarh</option>
                              <option>Parbattya Chattagram</option>
                              <option>Patuakhali</option>
                              <option>Pirojpur</option>
                              <option>Rajbari</option>
                              <option>Rajshahi</option>
                              <option>Rangpur</option>
                              <option>Satkhira</option>
                              <option>Shariatpur</option>
                              <option>Sherpur</option>
                              <option>Sirajganj</option>
                              <option>Sunamganj</option>
                              <option>Sylhet</option>
                              <option>Tangail</option>
                              <option>Thakurgaon</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Reference Name">
                              Visa provider(reference name)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="referenceName"
                              placeholder="Enter Reference Name"
                              value={referenceName}
                              onChange={(e) => setReferenceName(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Reference Mobile">
                              Reference Mobile
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="refMobile"
                              placeholder="Enter Reference Mobile"
                              value={refMobile}
                              onChange={(e) => setRefMobile(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Reference Village">
                              Reference Village
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="refVillage"
                              placeholder="Enter Reference Village"
                              value={refVillage}
                              onChange={(e) => setRefVillage(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Reference Thana">
                              Reference Thana
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="refThana"
                              placeholder="Enter Reference Thana"
                              value={refThana}
                              onChange={(e) => setRefThana(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="Reference District">
                              Reference District
                            </label>
                            <select
                              className="form-control select2"
                              style={{ width: "100%" }}
                              value={refDistrict}
                              onChange={(e) => setRefDistrict(e.target.value)}
                            >
                              <option selected="selected">Dhaka</option>
                              <option>Bagerhat</option>
                              <option>Bandarban</option>
                              <option>Barguna</option>
                              <option>Barisal</option>
                              <option>Bhola</option>
                              <option>Bogra</option>
                              <option>Brahmanbaria</option>
                              <option>Chandpur</option>
                              <option>Chittagong</option>
                              <option>Chuadanga</option>
                              <option>Comilla</option>
                              <option>Cox's Bazar</option>
                              <option>Dinajpur</option>
                              <option>Faridpur</option>
                              <option>Feni</option>
                              <option>Gaibandha</option>
                              <option>Gazipur</option>
                              <option>Gopalganj</option>
                              <option>Habiganj</option>
                              <option>Jaipurhat</option>
                              <option>Jamalpur</option>
                              <option>Jessore</option>
                              <option>Jhalakati</option>
                              <option>Jhenaidah</option>
                              <option>Khagrachari</option>
                              <option>Khulna</option>
                              <option>Kishoreganj</option>
                              <option>Kurigram</option>
                              <option>Kushtia</option>
                              <option>Lakshmipur</option>
                              <option>Lalmonirhat</option>
                              <option>Madaripur</option>
                              <option>Magura</option>
                              <option>Manikganj</option>
                              <option>Meherpur</option>
                              <option>Moulvibazar</option>
                              <option>Munshiganj</option>
                              <option>Mymensingh</option>
                              <option>Naogaon</option>
                              <option>Narail</option>
                              <option>Narayanganj</option>
                              <option>Narsingdi</option>
                              <option>Natore</option>
                              <option>Nawabganj</option>
                              <option>Netrakona</option>
                              <option>Nilphamari</option>
                              <option>Noakhali</option>
                              <option>Pabna</option>
                              <option>Panchagarh</option>
                              <option>Parbattya Chattagram</option>
                              <option>Patuakhali</option>
                              <option>Pirojpur</option>
                              <option>Rajbari</option>
                              <option>Rajshahi</option>
                              <option>Rangpur</option>
                              <option>Satkhira</option>
                              <option>Shariatpur</option>
                              <option>Sherpur</option>
                              <option>Sirajganj</option>
                              <option>Sunamganj</option>
                              <option>Sylhet</option>
                              <option>Tangail</option>
                              <option>Thakurgaon</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="Imo">Imo</label>
                            <input
                              type="text"
                              className="form-control"
                              id="imo"
                              placeholder="Enter Imo"
                              value={imo}
                              onChange={(e) => setImo(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* /.col */}
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="Facebook">Facebook</label>
                            <input
                              type="text"
                              className="form-control"
                              id="fb"
                              placeholder="Enter Facebook"
                              value={fb}
                              onChange={(e) => setFb(e.target.value)}
                            />
                          </div>
                        </div>
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
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
