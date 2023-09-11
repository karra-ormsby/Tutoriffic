import React from 'react';
import './dashboard.css'
import ProfileDivider from './ProfileDivider'
import ContentDivider from './ContentDivider'
import { Layout, Divider } from 'antd';

const { Content } = Layout;

const Dashboard = () => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <div className="site-layout-background" style={{ padding: 0 }}>
          <h1>Welcome to Your Dashboard</h1>
          <Divider className = "divider" orientation="centre">Profile</Divider>
            <ProfileDivider />
          <Divider className = "divider" orientation="left">Your Content</Divider>
            <ContentDivider />
        </div>
      </Content>
    </Layout>
  );
};


export default Dashboard;
