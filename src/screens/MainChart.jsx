import React,{useEffect, useState} from 'react'
import Dashboard from './Dashboard'
import { config, URL } from '../utils/config';
import axios from 'axios';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


function MainChart() {

    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState([]);
    const [checkChart , setcheckChart] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const submitHandler= async(e)=>{
        e.preventDefault();
         console.log(`date suru..${startDate}`);
         console.log(`date sesh..${endDate}`);
       let result = checkChart?.filter(
        (item) =>
         item.createdDate >= startDate && item.createdDate <= endDate
      );
      setChartData(result);
      console.log(result);
    }
    useEffect(() => {
        try {
          async function fetchUserData() {
            setLoading(true);
            let user = JSON.parse(localStorage.getItem("user"));
            let id = user._id;
            // console.log(user);
            let data = user.role === "admin" ? await axios.get(`${URL}api/v1/data`, config): await axios.get(`${URL}api/v1/data/user/${id}`, config);
            // console.log(data.data);
            setChartData(data.data);
            setcheckChart(data.data);
            // cdata=data.data;
            // console.log(chartData)
            setLoading(false);
          }
          fetchUserData();
        } catch (error) {
    
          console.log(error);
        }
      }, []);
      const firstchart = {
        type: "pie3d",
        width: "100%",
        height: "400",
        dataFormat: "json",
        dataSource: {
          chart: {
            caption: "Frequency data analysis",
            subCaption: "Percentage per district",
            xAxisName: "Medical",
            yAxisName: "Total",
            numberSuffix: "",
            theme: "fusion",
          },
          data: [
            {
              label: "Apache",
              value: "32647479"
            },
            {
              label: "Microsoft",
              value: "22100932"
            },
            {
              label: "Zeus",
              value: "14376"
            },
            {
              label: "Other",
              value: "18674221"
            }
          ]
        },
      };
    return (
        <div>
            <Dashboard/>
            <div className="container">
                <form onSubmit={submitHandler}>
                  <div className="row">
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
           {chartData.map((item)=>(
                <li>item</li>
            ))}
           </div>
             {/* <div className="card">
                <ReactFC {...firstchart} />
            </div> */}
        </div>
    )
}

export default MainChart
