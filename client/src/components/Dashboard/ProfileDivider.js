import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_LOGEDIN } from '../../utils/queries';
import UserAvatar from "../Avatar";
import { Card, Row, Col  } from "antd";
import { CalendarOutlined, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import onlineClassroomProfile from '../../assets/profile-image.jpg'
import "./dashboard.css";
import "./profileDivider.css"
import '../card.css'

const ProfileDivider = () => {
  const { data, loading, error } = useQuery(QUERY_LOGEDIN);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const user = data.loggedInUser;

  const userName = `${user.firstName} ${user.lastName}`


  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: "long", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-UK", options);
  };

  return (
<div className="card-container">
  <Row>
    <Col xs={24} sm={24} md={24} lg={6}>
      <Card className="card user" title={userName}>
        <UserAvatar />
      </Card>
    </Col>
    <Col xs={24} sm={24} md={24} lg={10}>
      <Card
        className="card image-card"
        cover={
          <img
            alt="online classroom"
            src={onlineClassroomProfile}
            style={{ opacity: 0.7, height: "100%", borderRadius: '5px' }}
          />
        }
      ></Card>
    </Col>
    <Col xs={12} sm={12} md={12} lg={4}>
      <Link to="/calendar">
        <Card className="card  date content enlarge" style={{ cursor: 'pointer' }}>
          <CalendarOutlined style={{ fontSize: 20 }} />
          <p className="currentDate">{getCurrentDate()}</p>
        </Card>
      </Link>
    </Col>
    <Col xs={12} sm={12} md={12} lg={4}>
      <Link to="/posts">
        <Card className="card content enlarge" style={{ cursor: 'pointer' }}>
          <MessageOutlined style={{ fontSize: 50, color: "grey" }} />
        </Card>
      </Link>
    </Col>
  </Row>
</div>
  );
};

export default ProfileDivider;
