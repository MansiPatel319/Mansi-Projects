import React from "react";
import { Link } from "react-router-dom";

import DotBoxImage from '../../../assets/images/Student/dot-box-img.svg';

import '../Student.scss';

class StudentClassList extends React.Component {

    componentDidMount(){
        // localStorage.setItem('noRedirect', true)
        const {student} = this.props;
        if(student.studentClassData.length === 0){
            this.getClassDetailData();
        }
    }

    handleSteps = (step, classData) => {
        this.props.setStudentSelectedClass(classData);
        this.props.setStudentMoodDetailCount(step);
    }

    getClassDetailData = () => {
        let classCodes = JSON.parse(localStorage.getItem('classCodes')) || [];
        let classData = new FormData();
        classData.append('code',JSON.stringify(classCodes));
        this.props.checkClassCode(classData);
    }

    render(){
        const {student} = this.props;
        return(
            <div id="wrapper" className="wrapper">
                <div className="main-middle-area">                
                    <div className="app-main-area-section">
                        <div className="app-main-area-div select-class-main-area">                        
                            <div className="app-top-bar-div">                    
                                <div className="app-top-row">
                                    <div className="app-top-left-div">                                    
                                    </div>
                                    <div className="app-center-right-div">
                                        <div className="text-main-group white-text-group">
                                            <h1>Select your class</h1>
                                        </div>
                                    </div>
                                    <div className="app-top-right-div">                                    
                                    </div>
                                </div>                            
                            </div>
                            
                            <div className="app-middle-area-div pt-100">
                                <div className="app-middle-area-root app-middle-select-class-area-root">                            
                                    <div className="container container-md">
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">                            
                                                <div className="center-middle-area min-height-m190">                            
                                                    <div className="select-class-area-div">
                                                
                                                        <div className="select-class-list-div">
                                                            <div className="select-class-list-row">                                    
                                                                        {
                                                                            student.studentClassData && student.studentClassData.data ?
                                                                                student.studentClassData.data.map((res)=> {
                                                                                    return(
                                                                                    <div className="select-class-box" key={res.id}>
                                                                                    <Link to="#" className="select-class-link"
                                                                                        onClick={() => {this.handleSteps(2, res)}}>
                                                                                        <div className="select-class-left-box">
                                                                                            <div className="img-thumb"> 
                                                                                                <img src={DotBoxImage} className="img-fluid img-class" alt="class" /> 
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="select-class-right-box" >
                                                                                            <div className="text-title-div">
                                                                                                <h3>
                                                                                                    <span className="class-name-h3">
                                                                                                        {res.class_name}
                                                                                                    </span>
                                                                                                    {/* <span className="span-block span-year"> 2020-2021</span> */}
                                                                                                </h3>
                                                                                            </div>
                                                                                            <div className="icon-div">
                                                                                                <span className="custom-icon forward-icon"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Link>
                                                                                </div>                                                                                                      
                                                                                )
                                                                            })
                                                                            :
                                                                            null
                                                                        }
                                                                        {/* <div className="select-class-right-box">
                                                                            <div className="text-title-div">
                                                                                <h3>
                                                                                    <span className="class-name-h3">
                                                                                        {student.studentClassData ? student.studentClassData.class_name : ''}
                                                                                    </span>
                                                                                    <span className="span-block span-year"> 2020-2021</span>
                                                                                </h3>
                                                                            </div>
                                                                            <div className="icon-div">
                                                                                <span className="custom-icon forward-icon"></span>
                                                                            </div>
                                                                        </div> */}
                                                                    
                                                            </div>
                                                        </div>
                                                    </div>                            
                                                </div>
                            
                                                <div className="bottom-area-div"> 
                                                    <div className="bottom-area-row"> 
                                                        <div className="center-text-div">
                                                            <p>
                                                                <Link to="#" className="link"
                                                                    onClick={() => {this.handleSteps(0)}}>
                                                                    Add another class
                                                                </Link>
                                                            </p>
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
        )
    }
}

export default StudentClassList;
 