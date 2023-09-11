import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  QUERY_STUDENTS,
  QUERY_ALL_QUIZZES,
  QUERY_GRADES,
} from "../utils/queries";
import { Collapse } from "antd";
import './students.css'

const { Panel } = Collapse;

const Grades = () => {
  const { loading: loadingStudents, data: studentData } =
    useQuery(QUERY_STUDENTS);
  const { loading: loadingQuizzes, data: quizData } =
    useQuery(QUERY_ALL_QUIZZES);
  const { loading: loadingGrades, data: gradeData } = useQuery(QUERY_GRADES);

  const findGrade = (studentId, quizId) => {
    const grade = grades.find(
      (grade) => grade.student.id === studentId && grade.quiz.id === quizId
    );
    return grade ? grade.grade : undefined;
  };

  const students = studentData?.students || [];
  const quizzes = quizData?.quizzes || [];
  const grades = gradeData?.grades || [];

  const [openPanel, setOpenPanels] = useState([]);

  const panelChange = (keys) => {
    setOpenPanels(keys);
  };

  if (loadingStudents || loadingQuizzes || loadingGrades) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className="main-section">
        <h1>Student Grades</h1>
        <div className="student-list">
          <Collapse className="collapse" defaultActiveKey={openPanel} onChange={panelChange}>
            {students.map((student) => (
              <Panel
              className="panel"
                key={student.id}
                header={`${student.firstName} ${student.lastName}`}>
                <ul className="student-info">
                  {quizzes.map((quiz) => {
                    const grade = findGrade(student.id, quiz.id);
                    return (
                      <li className='grade-list'key={quiz.id}>
                        <p className="quiz-grade">{quiz.title}:</p>
                        <p className="info">
                          {grade !== undefined
                            ? `${grade.gradePercentage}`
                            : "N/A"}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    );
  }
};

export default Grades;
