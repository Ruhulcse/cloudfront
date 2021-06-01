import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import CountUp from 'react-countup';
import { config, URL } from '../utils/config';
import axios from 'axios';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

function MainChart() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [checkChart, setcheckChart] = useState([]);
  const [showchart, setShowChart] = useState([]);
  const [totaldata, setTotalData] = useState('0');
  const [promo, setPromo] = useState('0');
  const [reply, setReply] = useState('0');
  const [replyData, setReplyData] = useState([]);
  const [interestData, setInterestData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    let result = checkChart?.filter(
      (item) => item.createdDate >= startDate && item.createdDate <= endDate
    );
    setChartData(result);
    setTotalData(result.length);
    let totalPromo = 0;
    let totalReply = 0;
    let nuetral = 0;
    let yes = 0;
    let no = 0;
    result.map((item) => {
      totalPromo += +item.promoMsg;
      totalReply += +item.reply;
      if (item.interest === 'None') {
        nuetral++;
      }
      if (item.interest === 'Yes') {
        yes++;
      }
      if (item.interest === 'No') {
        no++;
      }
    });
    const dummyData = [];
    let Obj = {};
    Obj.label = 'promoMessage';
    Obj.value = totalPromo;
    dummyData.push(Obj);
    let rep = {};
    rep.label = 'reply';
    rep.value = totalReply;
    dummyData.push(rep);
    setReplyData(dummyData);
    //interest set
    const interstData = [];
    let interested = {};
    interested.label = 'interested';
    interested.value = yes;
    interestData.push(interested);
    interstData.push(interested);
    let notinterested = {};
    notinterested.label = 'not interested';
    notinterested.value = no;
    interstData.push(notinterested);
    let never = {};
    never.label = 'neutral';
    never.value = nuetral;
    interstData.push(never);
    setInterestData(interstData);
    setPromo(totalPromo);
    setReply(totalReply);
  };

  useEffect(() => {
    try {
      async function fetchUserData() {
        setLoading(true);
        let user = JSON.parse(localStorage.getItem('user'));
        let id = user._id;
        let data =
          user.role === 'admin'
            ? await axios.get(`${URL}api/v1/data`, config)
            : await axios.get(`${URL}api/v1/data/user/${id}`, config);
        setChartData(data.data);
        setcheckChart(data.data);
        let total = data.data.length;
        setTotalData(total);
        let totalPromo = 0;
        let totalReply = 0;
        let nuetral = 0;
        let yes = 0;
        let no = 0;
        data.data.map((item) => {
          totalPromo += +item.promoMsg;
          totalReply += +item.reply;
          if (item.interest === 'None') {
            nuetral++;
          }
          if (item.interest === 'Yes') {
            yes++;
          }
          if (item.interest === 'No') {
            no++;
          }
        });
        setPromo(totalPromo);
        setReply(totalReply);
        //setting reply chart
        const dummyData = [];
        let Obj = {};
        Obj.label = 'promoMessage';
        Obj.value = totalPromo;
        dummyData.push(Obj);
        let rep = {};
        rep.label = 'reply';
        rep.value = totalReply;
        dummyData.push(rep);
        //interest set
        const interstData = [];
        let interested = {};
        interested.label = 'interested';
        interested.value = yes;
        interestData.push(interested);
        interstData.push(interested);
        let notinterested = {};
        notinterested.label = 'not interested';
        notinterested.value = no;
        interstData.push(notinterested);
        let never = {};
        never.label = 'neutral';
        never.value = nuetral;
        interstData.push(never);
        setInterestData(interstData);
        setReplyData(dummyData);
        setLoading(false);
      }
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const replychart = {
    type: 'pie2d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Reply Data Analysis',
        subCaption: 'Percentage promo vs reply',
        xAxisName: 'Medical',
        yAxisName: 'Total',
        numberSuffix: '',
        theme: 'fusion',
      },
      data: replyData,
    },
  };
  const interestchart = {
    type: 'pie3d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Interest Analysis',
        subCaption: 'Percentage over totall collected data',
        xAxisName: 'Medical',
        yAxisName: 'Total',
        numberSuffix: '',
        theme: 'fusion',
      },
      data: interestData,
    },
  };
  return (
    <div>
      <Dashboard />
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="row pt-2">
            <div className="col-md-3">
              To:
              <input
                className="form-control"
                type="date"
                id="dateOfBirth"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-3">
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
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-6">
            {/* small box */}
            <div className="small-box bg-info text-white pl-2 py-2">
              <div className="inner">
                <h3>{totaldata}</h3>
                <p>Total Data collected</p>
              </div>
              <div className="icon">
                <i className="far fa-handshake" />
              </div>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-4 col-6">
            {/* small box */}
            <div className="small-box bg-success text-white pl-2 py-2">
              <div className="inner">
                <h3>
                  <CountUp end={promo} />
                </h3>
                <p>Total Promo msg</p>
              </div>
              <div className="icon">
                <i className="fas fa-file-medical" />
              </div>
            </div>
          </div>

          {/* ./col */}
          <div className="col-lg-4 col-6">
            {/* small box */}
            <div className="small-box bg-dark text-white pl-2 py-2">
              <div className="inner">
                <h3>
                  <CountUp end={reply} />
                </h3>
                <p>Total reply</p>
              </div>
              <div className="icon">
                <i className="fas fa-user-plus" />
              </div>
            </div>
          </div>
          {/* ./col */}
        </div>
      </div>
      <div className="container pt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <ReactFC {...replychart} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <ReactFC {...interestchart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainChart;
