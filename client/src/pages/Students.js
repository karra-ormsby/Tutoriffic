import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_STUDENTS } from "../utils/queries";
import { Collapse } from "antd";
import "./students.css";

const { Panel } = Collapse;

const Students = () => {
  const { data } = useQuery(QUERY_STUDENTS);

  const students = data?.students || [];

  const [openPanels, setOpenPanels] = useState([]);

  const panelChange = (keys) => {
    setOpenPanels(keys);

    if (!students.length) {
      return <h3>No Students Yet</h3>;
    }
  };

  return (
    <div className="main-section">
      <h1>Student List</h1>
      <div className="student-list">
        <Collapse
          className="collapse"
          defaultActiveKey={["0"]}
          onChange={panelChange}>
          {students.map((student) => (
            <Panel
              className="panel"
              key={student.id}
              header={`${student.firstName} ${student.lastName}`}>
              <ul className="student-info">
                <li>
                  Date of Birth:{" "}
                  <span className="info">{student.dateOfBirth}</span>
                </li>
                <li>
                  Schooling Level:{" "}
                  <span className="info">{student.schoolingLevel}</span>
                </li>
                <li>
                  Parent/Guardian:{" "}
                  <span className="info"> {student.parentGuardian} </span>
                </li>
                <li>
                  Parent/Guardian Contact Details:{" "}
                  <span className="info">{student.contact}</span>
                </li>
              </ul>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default Students;
