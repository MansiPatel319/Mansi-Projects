import React from "react";

import AddClassCodeContainer from '../../containers/Student/AddClassCode';
import AddStudentCodeContainer from '../../containers/Student/AddStudentCode';
import StudentClassListContainer from '../../containers/Student/StudentClassList';
import StudentJournalContainer from '../../containers/Student/StudentJournal';
import StudentJournalResponseContainer from '../../containers/Student/StudentJournalResponse';
import DescribeMoodsContainer from '../../containers/Student/DescribeMood';
import MoodDetailsContainer from '../../containers/Student/MoodDetail';
import MoodListContainer from '../../containers/Student/MoodList';

import './Student.scss';

class Student extends React.Component {

    componentDidMount(){
        localStorage.setItem('noRedirect', true)
        let classCodes = JSON.parse(localStorage.getItem('classCodes')) || [];
        if(classCodes.length > 0) {
            this.handleSteps(1);
        }
    }

    handleSteps = (step) => {
        this.props.setStudentMoodDetailCount(step);
    }

    render(){
        const {student} = this.props;
        
        return(
            <>
            {
                student.studentMoodDetailCount === 0 ?
                    <AddClassCodeContainer/> : null

            }
            {
                student.studentMoodDetailCount === 1 ?
                    <StudentClassListContainer/> : null

            }
            {
                student.studentMoodDetailCount === 2 ?
                    <AddStudentCodeContainer/> : null

            }
            {
                student.studentMoodDetailCount === 3 ?
                    <MoodListContainer/> : null

            }
            {
                student.studentMoodDetailCount === 4 ?
                    <DescribeMoodsContainer/> : null

            }
            {
                student.studentMoodDetailCount === 5 ?
                    <MoodDetailsContainer/> : null

            }
            {
                student.studentMoodDetailCount === 6 ?
                    <StudentJournalContainer/> : null

            }
            {
                  student.studentMoodDetailCount === 7 ?
                  <StudentJournalResponseContainer/> : null
            }
            </>
        )
    }
}

export default Student;
 