import React from "react";
import Select2 from "react-select2-wrapper";
import { Link } from "react-router-dom";
import "../../styles/style.css";
import HeaderContainer from "../../containers/Common/Header";
import graphimage from "../../assets/images/graphBlock.png";
import adminGraph from "../../assets/images/adminGraph.png";
import FooterContainer from "../../containers/Common/Footer";
import { Doughnut, HorizontalBar } from "react-chartjs-2";
import * as rdd from 'react-device-detect';
import staticSubMoodData from './staticJson.json'
import staticLabelMood from './staticLabel.json'
import staticmoodByDayData from './moodByDayData'


const Demoinsight = () => {
    const data = [
        {id:1, text:' Ms. Green’s 4th Grade',value:' Ms. Green’s 4th Grade'},
        {id:2, text:' Ms. Green’s 4th Grade',value:' Ms. Green’s 4th Grade'},
        {id:3, text:' Ms. Green’s 4th Grade',value:' Ms. Green’s 4th Grade'},
        {id:4, text:' Ms. Green’s 4th Grade',value:' Ms. Green’s 4th Grade'},
        {id:5, text:' Ms. Green’s 4th Grade',value:' Ms. Green’s 4th Grade'},

    ]
    const borderColor = [
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
       const getMoodLables = () => {
      const data=staticLabelMood
      return data;
    };
    const staticmoodData = {
      labels: getMoodLables(),
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
          data: ["1", "1", "1", "1", "1", "1", "1", "1", "1"],
					hoverBackgroundColor: [
						"#FFAE01",
            "#F87D27",
            "#DF6FA0",
            "#69CDF4",
            "#BFA8EA",
            "#84CB8B",
            "#D290DC",
            "#d25e75",
            "#6F9AF7",
					]
        },
      ],
    };
 
  
    const moodDataOptions = {
      centertext:
        10,
      centertext2: "logs",
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: true,
      cutoutPercentage: 70, // inner radius,
			borderWidth: '0',
      tooltips: {
        mode: "label",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        fontFamily: "omnies",
        displayColors: false,
        alignItems: 'left',
        justifyContent: 'space-between',
        titleFontStyle: "normal",
 				titleAlign: 'center',
        bodyAlign: 'left',
        padding: 100,
        callbacks: {
          title: function (tooltipItem, data) {
            let moodName = data.labels[tooltipItem[0]['index']];
						let subMoods = staticSubMoodData;
						let moodCount = '';
						Object.keys(subMoods).map((data, index) => {
							if(index === 1) {
								moodCount = subMoods[data]
         			}
						})
						return 0 + ' logs'
          },
          label: function (tooltipItem, data) {
            let moodName = data.labels[tooltipItem['index']];
						let subMoods =staticSubMoodData

						// let subMoods = 15;
						let moodLabels = [];
						Object.keys(subMoods).map((data, index) => {
							if(index === 0) {
								moodLabels.push(`${data}: ${subMoods['mood_count']}`)
							}
						})
						subMoods['sub_mood'].map((sub) => {
							Object.keys(sub).map((subMood, key) => {

								if(key === 0) {
									moodLabels.push(`${subMood}: ${sub['count']}`)
								}
							})
						})
						return moodLabels;
          },
          labelTextColor: function () {
            return '#3F3F44';
          },
        },
        custom: function (tooltip) {
          if (tooltip.dataPoints) {
            let index = tooltip.dataPoints[0].index;
            let color = borderColor[index];
            tooltip.borderColor = color;
            tooltip.titleFontColor = color;
          }
        },
      },
    };
    const DoughnutChartPlugin = {
      beforeDraw: function (chart) {
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
        let textTwo = chart.options.centertext2;
        let  textX = Math.round((width - ctx.measureText(text).width) / 2);
        let  textY = height / 2.3;
        let textX1 = Math.round((width - ctx.measureText(textTwo).width) / 2);
        ctx.fillText(text, textX, textY);
        ctx.fillText(textTwo, textX1, textY + 20);
        ctx.save();
      },
    };
    const moodByDayData = {
      labels:  [
        "Sat, 02 Oct",
        "Fri, 01 Oct",
        "Thu, 30 Sep",
        "Wed, 29 Sep",
        "Tue, 28 Sep",
        "Mon, 27 Sep",
        
      ],
      datasets: staticmoodByDayData,
    };
    const moodByDayDataOptions = {
      scales: {
        xAxes: [
          {
            stacked: true,
            gridLines: {
              display: false, //Remove lines on graph
            },
            ticks: {
              display: false, //Remove only the label
            },
          },
        ],
        yAxes: [
          {
            stacked: true,
            gridLines: {
              display: false,
            },
          },
        ],
      },
      responsive: true,
      legend: {
        display: false,
        position: "bottom",
        labels: {
          fontColor: "#3F3F44",
          fontWeight: 500,
          fontFamily: "Omnes",
          paddingLeft: 100,
          minWidth:'120px',
          maxWidth:'120px',
          usePointStyle: true,
        },
      },
      // tooltips: {
      //   position: "average",
      // },
    };
  return (
    <>
      <div id="wrapper" className="wrapper">
        <div className="main-middle-area dashboard-middle-area">
          <section className="general-dashboard-section bg-image-common">
            <div className="general-dashboard-div background-color-main">
            <HeaderContainer isLoggedIn={true} />


              <div className="body-main-new admin-home-view-main-div">
                <div className="container-main-root">
                  <div className="container-inner-root">
                    <div className="yh-dashboard-mian-div">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12 col-md-12">
                            <div className="yh-tab-header-div">
                              <div className="yh-tab-header-center-div">
                                <ul className="tab-list-ul">
                                  <li className="tab-item ">
                                  <Link to="/demo-class" className="link">
                          {" "}
                          Admin{" "}
                        </Link>
                                    {/* <Link
                                      to="#"
                                      className="link"
                                    >
                                      {" "}
                                      Admin{" "}
                                    </Link> */}
                                  </li>
                                  <li className="tab-item active">
                                    {/* <Link
                                      to="#"
                                      className="link"
                                    >
                                      {" "}
                                      Insight{" "}
                                    </Link> */}
                                    <Link to="#"  className="link">
                          {" "}
                          Insight{" "}
                        </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="yh-tab-body-div">
                              <div className="dash-class-view-main-root">
                                <div className="top-info-header-group-div">
                                  <div className="row justify-content-between">
                                    <div className="col-lg-5 col-md-6 left-6">
                                      <div className="top-info-header-group-left">
                                        <div className="dropdown-group-div">
                                          <div className="dropdown-group-box user-dropdown-group-box">
                                            <div className="icon-box user-icon-box">
                                              <span className="custom-icon user-group-new-icon"></span>
                                            </div>
                                            <div className="selectbox-inline">
                                            <div className="select-box select-common select-box-group select-custom2">
                                              <Select2
                                                className="js-select2"
                                                // value={this.state.selectedClass}
                                                data={data}

                                                options={{
                                                  placeholder:
                                                    " Ms. Green’s 4th Grade",
                                                }}
                                              />
                                            </div>
                                          </div>
                                            {/* <div className="selectbox-inline">
                                              <div className="select-box select-common select-box-group select-custom2">
                                                <select
                                                  className="js-select2"
                                                  id="group-name-select"
                                                >
                                                  <option> </option>
                                                  <option selected>
                                                    Ms. Green’s 4th Grade
                                                  </option>
                                                  <option>
                                                    Ms. Green’s 4th Grade
                                                  </option>
                                                  <option>
                                                    Ms. Green’s 4th Grade
                                                  </option>
                                                </select>
                                              </div>
                                            </div> */}
                                          </div>
                                        </div>

                                        <div className="dropdown_group_block">
                                          <div className="dropdown-group-box date-dropdown-group-box">
                                            <div className="input-inline-group">
                                              <ul
                                              ><li id="1">
                                              <Link to="#" className="active" value="1" >This Week</Link></li>
                                              <li id="2"><Link to="#" className="add-border" value="1" >Last Week</Link></li>
                                              <li id="3"><Link to="#" className="add-border" value="1" >30 days</Link></li>
                                              <li id="4"><Link to="#" className="" value="1" >All Time</Link></li>
                                              </ul></div>
                                              </div>
                                              <div className="icon-box date-icon-box"><div className="input-inline-group"><input type="text" className="form-control form-date" id="date-picker-01" name="daterange" value="03 Oct 2021 - 07 Oct 2021"/><label className="label-arrow"><span className="custom-icon calendar-icon"></span></label></div></div></div>
                                      </div>
                                    </div>

                                    <div className="col-lg-5 col-md-6 left-6">
                                      <div className="top-info-header-group-right">
                                        <div className="count-view-list">
                                          <div className="count-view-box">
                                            <h2>5</h2>
                                            <p>Students</p>
                                          </div>
                                          <div className="count-view-box">
                                            <h2>10</h2>
                                            <p>Logs</p>
                                          </div>
                                          <div className="count-view-box">
                                            <h2 style={{color:"maroon"}}>4</h2>
                                            <p style={{color:"maroon"}}>Flagged Logs</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="main-dashboard-body">
                                <div className="row">
                      <div className="col-lg-12 col-md-12 mb-4">
                          
                        <div className="log-overview-graph-div"> 
                          <div className="log-overview-graph-root">
                            <div className="row">
                              <div className="col-lg-4 col-md-4 left-graph">
                                <div className="graph-div round-graph-div">
                                  <div className="graph-img-thumb">

                                  <Doughnut
                                      data={staticmoodData}
                                      options={moodDataOptions}
                                      plugins={[DoughnutChartPlugin]}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-8 col-md-8 right-graph">

                                <div className="log-overview-part-root">
                                  <div className="log-overview-part-list">
                                    <div className="mood-field">

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-happy-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">25%</span> </div>
                                        <div className="mood-expander-wrapper">
                                          <div className="mood-toggle">
                                            <ul>
                                              <li className="active">
                                                <Link to="#">
                                                  <svg xmlns="http://www.w3.org/2000/svg" width="13.391" height="13.417" viewBox="0 0 13.391 13.417">
                                                    <g id="Group_1" data-name="Group 1" transform="translate(-9.565 -4.33)">
                                                      <g id="Group" transform="translate(9.565 4.33)">
                                                        <g id="noun_chart_2391125">
                                                          <path id="Path" d="M6.265,6.244V0L6.24,0a6.26,6.26,0,0,0,.008,12.521A6.194,6.194,0,0,0,12.5,6.244Z" transform="translate(0 0.896)" fill="#652d90"/>
                                                          <path id="Path-2" data-name="Path" d="M6.232,6.242s-.011.011-.011.005A6.157,6.157,0,0,0,0,0V6.241H6.232Z" transform="translate(7.16)" fill="#652d90"/>
                                                        </g>
                                                      </g>
                                                    </g>
                                                  </svg>
                                                </Link>
                                              </li>
                                              <li>
                                                <Link to="#">
                                                  <svg id="noun_users_791122" xmlns="http://www.w3.org/2000/svg" width="11.027" height="13.546" viewBox="0 0 11.027 13.546">
                                                    <ellipse id="Oval" cx="2.775" cy="2.767" rx="2.775" ry="2.767" transform="translate(2.739 0)" fill="#652d90"/>
                                                    <path id="Path" d="M5.513,7.4c-3.043,0-5.72-.534-5.5-1.869C.6,2.039,2.422,0,5.513,0s4.917,2.063,5.5,5.535C11.233,6.87,8.556,7.4,5.513,7.4Z" transform="translate(0 6.142)" fill="#652d90"/>
                                                  </svg>
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                          <div className="mood-expander">
                                            <div className="mood_exIcon">
                                              <span className="mood-icon mood-happy-icon"></span>
                                              <span className="mood-field-percentage">25%</span>
                                            </div>
                                            <ul>
                                              <li>Okay: <span className="mood-field-percentage">25%</span></li>
                                              <li>Bored: <span className="mood-field-percentage">30%</span></li>
                                              <li>Focused: <span className="mood-field-percentage">10%</span></li>
                                              <li>Tired: <span className="mood-field-percentage">5%</span></li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-excited-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">10%</span> </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-caring-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">5%</span> </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-calm-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">10%</span> </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-ok-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">10%</span> </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-confused-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">33%</span> </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-anxious-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">15%</span> </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-sad-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">5%</span> </div>
                                      </div>

                                      <div className="mood-field-item">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-angry-icon"></span> </div> 
                                        <div className="mood-text-box"> <span className="mood-field-percentage">3%</span></div>
                                      </div>

                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>

                        
                        <div className="yh_insight_myStudent_wrapper">
                          <div className="yh_insight_myStudent_heading">
                            <h3>My Student</h3>
                          </div>
                          <div className="insight_myStudent_moodListWrapper">
                            <div className="students-box-list">
                              <div className="row mlr-5">

                                <div className="col-lg-6 col-md-6 plr-5">
                                  <div className="my-student-box active">
                                    <Link to="#" className="link-full">
                                      <div className="stu-info-box">
                                        <h3>Student C</h3>
                                        <p><span className="date-span">Today</span> <span className="time-span">10:52am</span> </p>
                                      </div>
                                      <div className="action-mood-box">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-confused-icon"></span> </div>
                                        <div className="flag-icon-box"> <span className="custom-icon flag-icon"></span> </div>
                                        
                                      </div>
                                    </Link>
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-6 plr-5">
                                  <div className="my-student-box ">
                                    <Link to="#" className="link-full">
                                      <div className="stu-info-box">
                                        <h3>Student A</h3>
                                        <p><span className="date-span">Today</span> <span className="time-span">10:52am</span> </p>
                                      </div>
                                      <div className="action-mood-box">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-excited-icon"></span> </div>
                                        
                                      </div>
                                    </Link>
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-6 plr-5">
                                  <div className="my-student-box ">
                                    <Link to="#" className="link-full">
                                      <div className="stu-info-box">
                                        <h3>Student B</h3>
                                        <p><span className="date-span">Yesterday</span> <span className="time-span">10:52am</span> </p>
                                      </div>
                                      <div className="action-mood-box">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-sad-icon"></span> </div>
                                        
                                      </div>
                                    </Link>
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-6 plr-5">
                                  <div className="my-student-box">
                                    <Link to="#" className="link-full">
                                      <div className="stu-info-box">
                                        <h3>Student D</h3>
                                        <p><span className="date-span">Yesterday</span> <span className="time-span">10:52am</span> </p>
                                      </div>
                                      <div className="action-mood-box">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-calm-icon"></span> </div>
                                        
                                      </div>
                                    </Link>
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-6 plr-5">
                                  <div className="my-student-box">
                                    <Link to="#" className="link-full">
                                      <div className="stu-info-box">
                                        <h3>Student E</h3>
                                        <p><span className="date-span">Thursday, 20 August</span> <span className="time-span">10:52am</span> </p>
                                      </div>
                                      <div className="action-mood-box">
                                        <div className="mood-icon-box"> <span className="mood-icon mood-happy-icon"></span> </div>
                                      </div>
                                    </Link>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="yh_insight_myStudent_btnWrapper">
                            <Link to="#" data-toggle="modal" data-target="#askstudent" className="insight_myStudent_btn">Ask "How are you?"</Link>
                            <Link to="/demo-moodjournal" data-toggle="modal" data-target="#askallstudent" className="insight_myStudent_btn">My Class Journal</Link>
                          </div>
                        </div>
                        
                        <div className="topics-box-root">
                          <div className="row">
                             <div className="col-lg-6 col-md-6">
                              <div className="topics-box-card flagged-topics-box-card">

                                <div className="topics-box-header">
                                  <div className="topics-row">
                                    <div className="topics-box-col width-66">
                                      <h4 className="color1">Flagged Topics</h4>
                                    </div>
                                    <div className="topics-box-col width-33 topics-box-col-center">
                                      <h4>Date</h4>
                                    </div>
                                  </div>
                                </div>

                                <div className="topics-box-body">

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      <div className="topics-box-col width-47">
                                        <p>bullying</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-anxious-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>25 Nov</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      <div className="topics-box-col width-47">
                                        <p>frustrated</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-angry-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>20 Nov</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      <div className="topics-box-col width-47">
                                        <p>i need help</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-confused-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>18 Nov</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      <div className="topics-box-col width-47">
                                        <p>laughing at me</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-sad-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>15 Nov</p>
                                      </div>
                                    </div>
                                  </Link>

                                </div>



                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="topics-box-card popular-topics-box-card">

                                <div className="topics-box-header">
                                  <div className="topics-row">
                                    <div className="topics-box-col topic-box-white width-66">
                                      <h4>Popular Topics</h4>
                                    </div>
                                    <div className="topics-box-col width-33 topics-box-col-center">
                                      <h4>Mentions</h4>
                                    </div>
                                  </div>
                                </div>

                                <div className="topics-box-body">

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      
                                      <div className="topics-box-col width-47">
                                        <p>exams</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-anxious-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>20</p>
                                      </div>
                                      
                                    </div>
                                  </Link>

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      <div className="topics-box-col width-47">
                                        <p>sleep</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-happy-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>10</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      <div className="topics-box-col width-47">
                                        <p>volunteer</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-excited-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>15</p>
                                      </div>
                                    </div>
                                  </Link>

                                  <Link to="#" className="topic-link">
                                    <div className="topics-row">
                                      <div className="topics-box-col width-47">
                                        <p>exercise</p>
                                      </div>
                                      <div className="topics-box-col width-20">
                                        <div className="icon-mood-center"> <span className="mood-icon mood-happy-icon"></span> </div>
                                      </div>
                                      <div className="topics-box-col width-33 topics-box-col-center">
                                        <p>9</p>
                                      </div>
                                    </div>
                                  </Link>

                                </div>



                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="yh_insight_myStudent_wrapper">
                          <div className="yh_insight_myStudent_heading">
                            <h3>Moods by Day</h3>
                          </div>
                          <div className="insight_myStudent_moodListWrapper">
                          <HorizontalBar
                              data={moodByDayData}
                              options={moodByDayDataOptions}
                              width={100}
                              height={20}
                            />
                            {/* <div className="row">
                              <div className="col-lg-2 col-md-2">
                                <div className="moodsBydate">
                                  <ul>
                                    <li>
                                      <p>Sun, 26 Nov</p>
                                    </li>
                                    <li>
                                      <p>Sun, 26 Nov</p>
                                    </li>
                                    <li>
                                      <p>Sun, 26 Nov</p>
                                    </li>
                                    <li>
                                      <p>Sun, 26 Nov</p>
                                    </li>
                                    <li>
                                      <p>Sun, 26 Nov</p>
                                    </li>
                                    <li>
                                      <p>Sun, 26 Nov</p>
                                    </li>
                                    <li>
                                      <p>Sun, 26 Nov</p>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-lg-10 col-md-10">
                                <div className="moodsGraph">
                                  <img src={graphimage} className="img-fluid" alt="image"/>
                                </div>
                              </div>
                            </div>
                          
                           */}
                          </div>
                        </div>

                      </div>      
                    </div>
                              
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            <FooterContainer/>
            </div>
          </section>
        </div>
      </div>

      <div
        className="modal modal-custom modal-custom-new fade"
        id="view-class-access-code-modal"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span className="custom-icon cancel-new-icon-01"></span>
              </button>
              <div className="heading-title-div">
                <h2 className="modal-title">
                  How will your students access your class?
                </h2>
              </div>
            </div>

            <div className="modal-body view-class-access-code-body">
              <div className="view-download-div">
                <div className="view-download-inner-div">
                  <button className="btn btn-general-transparent btn-view mr-10">
                    {" "}
                    <span className="custom-icon eye-hidden-icon"></span>{" "}
                  </button>
                  <button className="btn btn-general-transparent btn-download">
                    {" "}
                    <span className="custom-icon download-icon"></span>{" "}
                  </button>
                </div>
              </div>

              <div className="view-access-code-card-root">
                <div className="view-access-code-card-row-root">
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="view-access-code-card view-access-code-card01">
                        <div className="view-access-code-card-row">
                          <div className="view-access-code-card-top">
                            <div className="code-bx-div">
                              <h2>A80283EM9L</h2>
                            </div>
                          </div>

                          <div className="view-access-code-card-middle">
                            <div className="view-access-code-card-middle-left">
                              <span className="span-icon">
                                <span className="custom-icon keyboard-icon-rounded"></span>
                              </span>
                            </div>
                            <div className="view-access-code-card-middle-right">
                              <div className="content-div">
                                <h4>Class Access Code</h4>
                                <p>
                                  Students log in by typing your 10-digit class
                                  access code.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="view-access-code-card view-access-code-card02">
                        <div className="view-access-code-card-row">
                          <div className="view-access-code-card-top">
                            <div className="thumb-bx-div">
                              <img
                                src="assets/images/qr-image.png"
                                className="img-fluid img-qr"
                                alt="QR"
                              />
                            </div>
                          </div>

                          <div className="view-access-code-card-middle">
                            <div className="view-access-code-card-middle-left">
                              <span className="span-icon">
                                <span className="custom-icon qr-code-icon-rounded"></span>
                              </span>
                            </div>
                            <div className="view-access-code-card-middle-right">
                              <div className="content-div">
                                <h4>Class QR Code</h4>
                                <p>
                                  Students log in by scanning your class QR
                                  code.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="notes-blm-div">
                  <p>
                    * Your students need to enter your class once per device.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </>
  );
};
export default Demoinsight;
