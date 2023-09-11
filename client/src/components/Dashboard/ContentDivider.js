import React from "react";
import "./dashboard.css";
import "./contentDivider.css";
import { Card, Row, Col } from "antd";
import onlineClassroomContent from "../../assets/content-image.jpg";
import "../card.css";
import { Link } from "react-router-dom";
import {
  BookOutlined,
  ReadOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";

const ContentDivider = () => {
  return (
    <div className="card-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Card
            className="card image-card"
            cover={
              <img
                alt="online classroom"
                src={onlineClassroomContent}
                style={{ opacity: 0.7 }}
              />
            }
          />
        </Col>

        <Col xs={24} sm={24} md={4} lg={2} xl={2}>
          <Card className="card heading-card">
            <h2 style={{color:'white', fontSize: '30px'}}><ReadOutlined/></h2>
           </Card> 
          </Col>
          
          <Col xs={24} sm={24} md={20} lg={6} xl={6}>
            <Link to="/lessons">
            <Card className="card content-card enlarge">
              <h3>View your lessons <ArrowRightOutlined/></h3>
            </Card>
            </Link>
          </Col>
        

        <Col xs={24} sm={24} md={4} lg={2} xl={2}>
          <Card className="card heading-card">
            <h2 style={{color:'white', fontSize: '30px'}}><BookOutlined/></h2>
          </Card>
          </Col>
          <Col xs={24} sm={24} md={20} lg={6} xl={6}>
            <Link to="/quizzes">
            <Card className="card content-card enlarge">
              <h3>View your quizzes<ArrowRightOutlined/></h3>
            </Card>
            </Link>
            </Col>
        </Row>
    </div>
  );
};

export default ContentDivider;
