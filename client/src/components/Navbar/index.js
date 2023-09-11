import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  TeamOutlined,
  ReadOutlined,
  AppstoreOutlined,
  MessageOutlined 
} from "@ant-design/icons";


const { SubMenu } = Menu;


const Navbar = () => {
  return (
    <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px", fontSize: '15px', justifyContent: 'center'}}>
      <Menu.Item key="/" icon={<UserOutlined />}>
        <Link to="/">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/modules" icon={<AppstoreOutlined />}>
        <Link to="/modules">Modules</Link>
      </Menu.Item>
      <Menu.Item key="/lessons" icon={<ReadOutlined />}>
        <Link to="/lessons">Lessons</Link>
      </Menu.Item>
      <Menu.Item key="/quizzes" icon={<BookOutlined />}>
        <Link to="/quizzes">Quizzes</Link>
      </Menu.Item>
      <SubMenu key="students" icon={<TeamOutlined />} title="Students">
        <Menu.Item key="/students">
          <Link to="/students">View Students</Link>
        </Menu.Item>
        <Menu.Item key="/students/grades">
          <Link to="/students/grades">View Grades</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="forum" icon={<MessageOutlined />} title="Forum">
            <Link to="/posts">Forum</Link>
      </Menu.Item>
      <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
    </Menu>

  );
};

export default Navbar;
