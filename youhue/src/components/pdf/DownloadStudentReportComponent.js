import React from "react";
import logo from "../../assets/images/pdf/logo.svg";
import angry from "../../assets/images/pdf/angry.svg";
import anxious from "../../assets/images/pdf/anxious.svg";
import calm from "../../assets/images/pdf/calm.svg";
import confused from "../../assets/images/pdf/confused.svg";
import excited from "../../assets/images/pdf/excited.svg";
import happy from "../../assets/images/pdf/happy.svg";
import loved from "../../assets/images/pdf/loved.svg";
import okay from "../../assets/images/pdf/okay.svg";
import sad from "../../assets/images/pdf/sad.svg";
import flag from "../../assets/images/pdf/flag.svg";
import circle from "../../assets/images/pdf/circle.svg";
import staticSubMoodData from '../DemoClass/staticJson.json'
import staticLabelMood from '../DemoClass/staticLabel.json'
import { Doughnut } from "react-chartjs-2";
import * as rdd from 'react-device-detect';
import { baseUrl } from "../../axiosUrl";

import "../../styles/pdf/studentReport.css";

class DownloadStudentReportComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "res":[],
        };
    }

    componentDidMount() {
        let student_report = localStorage.getItem("student_report")
        let data1 = JSON.parse(student_report)
        const token = localStorage.getItem('token');
        fetch(baseUrl+"v6/download-student-report/", {
            "method": "POST",
            "headers": {
                "Authorization": token,
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                "students": data1['student_ids'],
                "start_date": data1['start_date'],
                "end_date": data1['end_date']
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.status) {
                    console.log(response, "response");
                    this.setState({
                        res:response.data,
                    });
                    setTimeout(() => {
                        window.print()
                    }, 2000);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleMoodColor(mood_name) {
        switch (mood_name) {
            case 'Happy':
                return happy;
            case 'Excited':
                return excited;
            case 'Angry':
                return angry;
            case 'Anxious':
                return anxious;
            case 'Calm':
                return calm;
            case 'Confused':
                return confused;
            case 'Loved':
                return loved;
            case 'Okay':
                return okay;
            case 'Sad':
                return sad;
            default:
                return '';
        }
    }
    borderColor = [
        "#A04F18",
        "#891818",
        "#991C5B",
        "#3976C0",
        "#652D90",
        "#126D2B",
        "#87259C",
        "#841238",
        "#1D499D",
    ];
   getMoodLables = () => {
        const data=staticLabelMood
        return data;
        };
    getMoodLablesDyn = (data) => {
        console.log('data', data)
            const dataNew=data.map((e)=>e.mood)
            return dataNew;
            };
    staticmoodData = {
    labels: this.getMoodLables(),
    datasets: [
        {
        label: "Moods",
        backgroundColor: [
            "#FFAE01",
            "#F87D27",
            "#DF6FA0",
            "#69CDF4",
            "#BFA8EA",
            "#84CB8B",
            "#D290DC",
            "#d25e75",
            "#6F9AF7",
        ],
        data: ["1", "1", "1", "1", "1", "1", "1", "1", "1"]
        },
    ],
    };
    DoughnutChartPlugin = {
        beforeDraw: function (chart) {
            console.log("chart",chart);
          chart.canvas.parentNode.style.width = rdd.isTablet ? '380px' : '220px';
          chart.canvas.parentNode.style.width = rdd.isTablet ? '280px' : '380px';
          let width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
          ctx.restore();
          let fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em Omnes";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#713C97";
          let text = chart.options.centertext;
          let  textX = Math.round((width - ctx.measureText(text).width) / 2);
          console.log(textX,"textX");
          let  textY = height / 2.3;
        //   let textX1 = Math.round((width - ctx.measureText(textTwo).width) / 2);
          ctx.fillText(text, textX, textY);
        //   ctx.fillText(textTwo, textX1, textY + 20);
          ctx.save();
        },
      };

      getMoodData = (dat) => {
          console.log("dat",dat);
        // const { insightData } = this.props;
        let data = "";
        if (dat) {
          data = dat.map((e)=>e.percentage)
        }
        console.log("data",data);
        return data;
      };

      moodData = (data) => {
        console.log('data', data)
        return {
            labels: this.getMoodLablesDyn(data),
            datasets: [
                {
                label: "Moods",
                backgroundColor: [
                    "#FFAE01",
                    "#F87D27",
                    "#DF6FA0",
                    "#69CDF4",
                    "#BFA8EA",
                    "#84CB8B",
                    "#D290DC",
                    "#d25e75",
                    "#6F9AF7",
                ],
                data: this.getMoodData(data)
                },
            ]
        }
      
      }

      moodDataOptions = (data) => {
          console.log("data",data);
          return{
            centertext:
                data?.student_name ? data?.student_name
                : "",
          }
      };

    render() {
        let {res} = this.state
        console.log("this.state",this.state);

        return (
            res && res.length != 0 ?
             res.map((res_data)=>{
                return (
                    <div className="">
                        <table>
                            <tr>
                                <td>
                                    <table cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td>
                                                <table className="center_table" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td>
                                                            <div className="yh_tmp_wrapper">
                                                                <table cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td>
                                                                            <div className="yh_tmp_logo">
                                                                                <img src={logo} alt="image" />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="yh_tmp_heading">
                                                                                <h3>{res_data.data.school_name}</h3>
                                                                                <h5>{res_data.data.class_name}</h5>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="yh_tmp_detail">
                                                                                <h3>Student Name: <span>{res_data.data.student_name}</span> </h3>
                                                                                <h3>Date: <span>{res_data.data.date}</span></h3>
                                                                                <h3>Total Logs: <span>{res_data.data.total_log}</span></h3>
                                                                                <h3>Flagged Logs: <span>{res_data.data.flagged_log}</span></h3>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td>
                                                                            <table className="yh_common_brdr" cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td>
                                                                                        <table cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <div className="yh_tmp_topMood_heading">
                                                                                                        <h3>Mood Chart</h3>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>
                                                                                                    <table className="normal_border" cellspacing="0" cellpadding="0">
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <div className="yh_chart_image">
                                                                                                                    {/* <img src="images/bar_chart.png" alt="image" /> */}
                                                                                                                    <Doughnut
                                                                                                                        data={res_data?.data.mood_chart.length > 0?  this.moodData(res_data.data.mood_chart) : this.staticmoodData}
                                                                                                                        options={res_data?.data ? this.moodDataOptions(res_data.data) : ""}
                                                                                                                        plugins={[this.DoughnutChartPlugin]}
                                                                                                                        />
                                                                                                                </div>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                        <td>
                                                                            <table style={{"width": "350px", "margin": "0 auto"}} cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="yh_tmp_topMoods moodAnxious">
                                                                                            <table cellspacing="0" cellpadding="0">
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        <div className="yh_tmp_topMood_heading">
                                                                                                            <h3>Top 3 moods</h3>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                {res_data.data.top_mood && res_data.data.top_mood.length != 0 ?
                                                                                                res_data.data.top_mood.map((top_moods)=>{
                                                                                                    return (
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <table className={`mood${top_moods.mood_name}_allBrdr`} cellspacing="0" cellpadding="0">
                                                                                                                <tr>
                                                                                                                    <th className={`mood${top_moods.mood_name}_brdr`}>
                                                                                                                        <div className="yh_tmp_img">
                                                                                                                            <img src={this.handleMoodColor(top_moods.mood_name)} alt="image" />
                                                                                                                        </div>
                                                                                                                    </th>
                                                                                                                    <th className={`mood${top_moods.mood_name}_brdr`}>
                                                                                                                        <div className="yh_tmp_moodHead">
                                                                                                                            <h3>{top_moods.percentage}%</h3>
                                                                                                                        </div>
                                                                                                                    </th>
                                                                                                                    <th className={`mood${top_moods.mood_name}_brdr`}>
                                                                                                                        <div className="yh_tmp_moodHead">
                                                                                                                            <h3>{top_moods.count} <span>logs</span></h3>
                                                                                                                        </div>
                                                                                                                    </th>
                                                                                                                </tr>
                                                                                                                {top_moods?.sub_mood.map((sub_mood_data)=>{
                                                                                                                    return (
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            <div className="yh_tmp_moodName">
                                                                                                                                <h3>{sub_mood_data.mood}</h3>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            <div className="yh_tmp_moodNum">
                                                                                                                                <h3>{sub_mood_data.percentage}%</h3>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                        <td>
                                                                                                                            <div className="yh_tmp_moodLog">
                                                                                                                                <h3>{sub_mood_data.count} <span>logs</span></h3>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                    )
                                                                                                                })}
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    )
                                                                                                }):""}
                                                                                                
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td>
                                                                            <table className="yh_common_brdr" style={{"width": "550px", "margin": "0 auto"}} cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="yh_tmp_weekMoods">
                                                                                            <table cellspacing="0" cellpadding="0">
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        <div className="yh_tmp_topMood_heading">
                                                                                                            <h3>Moods by Day of the Week</h3>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                                <tr>
                                                                                                    <td>
                                                                                                        <table className="normal_border" cellspacing="0" cellpadding="0">
                                                                                                            <tr>
                                                                                                                <th style={{"color": "#3F3F44", "fontSize": "16px", "fontWeight": "500", "margin": "0"}}>Mon</th>
                                                                                                                <th style={{"color": "#3F3F44", "fontSize": "16px", "fontWeight": "500", "margin": "0"}}>Tue</th>
                                                                                                                <th style={{"color": "#3F3F44", "fontSize": "16px", "fontWeight": "500", "margin": "0"}}>Wed</th>
                                                                                                                <th style={{"color": "#3F3F44", "fontSize": "16px", "fontWeight": "500", "margin": "0"}}>Thu</th>
                                                                                                                <th style={{"color": "#3F3F44", "fontSize": "16px", "fontWeight": "500", "margin": "0"}}>Fri</th>
                                                                                                                <th style={{"color": "#3F3F44", "fontSize": "16px", "fontWeight": "500", "margin": "0"}}>Sat</th>
                                                                                                                <th style={{"color": "#3F3F44", "fontSize": "16px", "fontWeight": "500", "margin": "0"}}>Sun</th>
                                                                                                            </tr>
                                                                                                            {res && res_data.data.week_data ? Object.keys(res_data.data.week_data).map((day_data, qr)=>{
                                                                                                                return (
                                                                                                                    <td>
                                                                                                                        {res && res_data.data.week_data[day_data].map((qr)=>{
                                                                                                                            return (
                                                                                                                                qr && qr.percentage !=0 ?
                                                                                                                                <tr>
                                                                                                                                    <div className="yh_tmp_weekMoodBlock" style={{"marginBottom":"10px"}}>
                                                                                                                                        <img src={this.handleMoodColor(qr.mood)} alt="image" />
                                                                                                                                        <h3>{qr.percentage}%</h3>
                                                                                                                                    </div>
                                                                                                                                </tr> 
                                                                                                                                : ""
                                                                                                                            )
                                                                                                                        })}
                                                                                                                    </td>
                                                                                                                )
                                                                                                            }) : "" }
                                                                                                        </table>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </table>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                        <td>
                                                                            <table style={{"width": "290px", "margin": "0 auto"}} cellspacing="0" cellpadding="0">
                                                                                <tr>
                                                                                    <td>
                                                                                        <div className="yh_flag_heading">
                                                                                            <h3>Flagged Topics</h3>
                                                                                        </div>
                                                                                        <table className="normal_border flagged_table" style={{"height":"auto",}} cellspacing="0" cellpadding="0">
                                                                                            <tr>
                                                                                                <th className="normal_bottom_border"><img src={flag} alt="image" /></th>
                                                                                                <th className="normal_bottom_border">Mentions</th>
                                                                                            </tr>
                                                                                            {res_data.data.flagged_topics && res_data.data.flagged_topics.length != 0 ? 
                                                                                                res_data.data.flagged_topics.map((topics)=>{
                                                                                                    return (
                                                                                                        <tr>
                                                                                                            <td><h3>{topics.flagged_topic}</h3></td>
                                                                                                            <td><h3>{topics.count}</h3></td>
                                                                                                        </tr>  
                                                                                                    )
                                                                                                })
                                                                                                :""
                                                                                            }
                                                                                            
                                                                                        </table>
                                                                                        <div className="yh_bottom_heading">
                                                                                            <h3>* Top 10 flagged topics for this student.</h3>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <table cellspacing="0" cellpadding="0">
                                    <tr>
                                    <td>
                                        <table className="center_table" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td>
                                            <div className="yh_tmp_wrapper">
                                                <table cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td>
                                                    <div className="yh_tmp_logo">
                                                        <img src={logo} alt="image"/>
                                                    </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{"width": "100%"}} colspan="2">
                                                    <div className="yh_tmp_heading">
                                                        <h3>{res_data.data.school_name}</h3>
                                                        <h5>{res_data.data.class_name}</h5> 
                                                    </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                    <div className="yh_tmp_detail">
                                                        <h3>Student Name: <span>{res_data.data.student_name}</span> </h3>
                                                        <h3>Date: <span>{res_data.data.date}</span></h3>
                                                        <h3>Total Logs: <span>{res_data.data.total_log}</span></h3>
                                                        <h3>Flagged Logs: <span>{res_data.data.flagged_log}</span></h3>
                                                    </div>
                                                    </td>
                                                    <td style={{"text-align": "right"}}>
                                                    <img style={{"verticalAlign":"top"}} src={circle} alt="grapg"/>
                                                    </td>
                                                </tr>
                                                </table>
                                                <table cellspacing="0" cellpadding="0">
                                                {res_data?.data &&
                                                    res_data?.data?.mood.length > 0
                                                    ? [1, 2, 3].map(
                                                        (indvidual_mood, index) => {
                                                            return (
                                                            <tr>
                                                                {index == 0
                                                                ? res_data.data.mood
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (sub_mood_data, i) => {
                                                                        // if(i < 3){
                                                                        return (
                                                                            <td>
                                                                            <table
                                                                                className={`mood${sub_mood_data.mood}_allBrdr`}
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                            >
                                                                                <tr>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_img">
                                                                                    <img
                                                                                        src={this.handleMoodColor(
                                                                                        sub_mood_data.mood
                                                                                        )}
                                                                                        alt="image"
                                                                                    />
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_moodHead">
                                                                                    <h3>
                                                                                        {
                                                                                        sub_mood_data.percentage
                                                                                        }
                                                                                        %
                                                                                    </h3>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_moodHead">
                                                                                    <h3>
                                                                                        {
                                                                                        sub_mood_data.count
                                                                                        }{" "}
                                                                                        <span>
                                                                                        logs
                                                                                        </span>
                                                                                    </h3>
                                                                                    </div>
                                                                                </th>
                                                                                </tr>

                                                                                {sub_mood_data &&
                                                                                sub_mood_data
                                                                                .sub_mood
                                                                                .length > 0
                                                                                ? sub_mood_data.sub_mood.map(
                                                                                    (sub) => {
                                                                                        return (
                                                                                        <tr>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodName">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.mood
                                                                                                }
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodNum">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.percentage
                                                                                                }
                                                                                                %
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodLog">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.count
                                                                                                }{" "}
                                                                                                <span>
                                                                                                    logs
                                                                                                </span>
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        );
                                                                                    }
                                                                                    )
                                                                                : ""}
                                                                            </table>
                                                                            </td>
                                                                        );
                                                                        // }
                                                                        }
                                                                    )
                                                                : index == 1
                                                                ? res_data.data.mood
                                                                    .slice(3, 6)
                                                                    .map(
                                                                        (sub_mood_data, i) => {
                                                                        // if(i < 3){
                                                                        return (
                                                                            <td>
                                                                            <table
                                                                                className={`mood${sub_mood_data.mood}_allBrdr`}
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                            >
                                                                                <tr>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_img">
                                                                                    <img
                                                                                        src={this.handleMoodColor(
                                                                                        sub_mood_data.mood
                                                                                        )}
                                                                                        alt="image"
                                                                                    />
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_moodHead">
                                                                                    <h3>
                                                                                        {
                                                                                        sub_mood_data.percentage
                                                                                        }
                                                                                        %
                                                                                    </h3>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_moodHead">
                                                                                    <h3>
                                                                                        {
                                                                                        sub_mood_data.count
                                                                                        }{" "}
                                                                                        <span>
                                                                                        logs
                                                                                        </span>
                                                                                    </h3>
                                                                                    </div>
                                                                                </th>
                                                                                </tr>

                                                                                {sub_mood_data &&
                                                                                sub_mood_data
                                                                                .sub_mood
                                                                                .length > 0
                                                                                ? sub_mood_data.sub_mood.map(
                                                                                    (sub) => {
                                                                                        return (
                                                                                        <tr>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodName">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.mood
                                                                                                }
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodNum">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.percentage
                                                                                                }
                                                                                                %
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodLog">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.count
                                                                                                }{" "}
                                                                                                <span>
                                                                                                    logs
                                                                                                </span>
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        );
                                                                                    }
                                                                                    )
                                                                                : ""}
                                                                            </table>
                                                                            </td>
                                                                        );
                                                                        // }
                                                                        }
                                                                    )
                                                                : index == 2
                                                                ? res_data.data.mood
                                                                    .slice(6, 9)
                                                                    .map(
                                                                        (sub_mood_data, i) => {
                                                                        return (
                                                                            <td>
                                                                            <table
                                                                                className={`mood${sub_mood_data.mood}_allBrdr`}
                                                                                cellspacing="0"
                                                                                cellpadding="0"
                                                                            >
                                                                                <tr>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_img">
                                                                                    <img
                                                                                        src={this.handleMoodColor(
                                                                                        sub_mood_data.mood
                                                                                        )}
                                                                                        alt="image"
                                                                                    />
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_moodHead">
                                                                                    <h3>
                                                                                        {
                                                                                        sub_mood_data.percentage
                                                                                        }
                                                                                        %
                                                                                    </h3>
                                                                                    </div>
                                                                                </th>
                                                                                <th
                                                                                    className={`mood${sub_mood_data.mood}_brdr`}
                                                                                >
                                                                                    <div className="yh_tmp_moodHead">
                                                                                    <h3>
                                                                                        {
                                                                                        sub_mood_data.count
                                                                                        }{" "}
                                                                                        <span>
                                                                                        logs
                                                                                        </span>
                                                                                    </h3>
                                                                                    </div>
                                                                                </th>
                                                                                </tr>

                                                                                {sub_mood_data &&
                                                                                sub_mood_data
                                                                                .sub_mood
                                                                                .length > 0
                                                                                ? sub_mood_data.sub_mood.map(
                                                                                    (sub) => {
                                                                                        return (
                                                                                        <tr>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodName">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.mood
                                                                                                }
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodNum">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.percentage
                                                                                                }
                                                                                                %
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                            <td>
                                                                                            <div className="yh_tmp_moodLog">
                                                                                                <h3>
                                                                                                {
                                                                                                    sub.count
                                                                                                }{" "}
                                                                                                <span>
                                                                                                    logs
                                                                                                </span>
                                                                                                </h3>
                                                                                            </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                        );
                                                                                    }
                                                                                    )
                                                                                : ""}
                                                                            </table>
                                                                            </td>
                                                                        );
                                                                        }
                                                                    )
                                                                : ""}
                                                            </tr>
                                                            );
                                                        }
                                                        )
                                                    : ""}
                                                </table>
                                            </div>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </table>
                                </td>
                            </tr>
                        </table>
                    </div> 
                )
            })
             
        : ""
            
        );
    }
}

export default DownloadStudentReportComponent;
