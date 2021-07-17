import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { config, URL } from '../utils/config';
import Dashboard from './Dashboard';


function Update({id,history}) {
  const [promomsg, setPromoMsg] = useState('0');
  const [replaid, setReplaid] = useState('None');
  const [reply, setReply] = useState('0');
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      async function fetchUserData() {
        setIsloading(true);
        let { data } = await axios.get(`${URL}api/v1/data/${id}`, config);
        setPromoMsg(data.promomsg);
        setReplaid(data.replaid);
        setReply(data.reply);
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
      promomsg,
      replaid,
      reply,
    };

    try {
      const  {data}  = await axios.put(
        `${URL}api/v1/data/${id}`,
        userData,
        config
      );
      console.log(data);
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      
    }
  };
    return (
        <div>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              {/* left column */}
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  {/* {error && <Message>{error}</Message>} */}
                  {/* /.card-header */}
                  {/* form start */}
                  {isloading ? (
                    'Loading...'
                  ) : (
                    <form onSubmit={submitHandler}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Desired Country">
                                Promo Message
                              </label>
                              <select
                                className="form-control select2"
                                style={{ width: '100%' }}
                                value={promomsg}
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
    )
}

export default Update
