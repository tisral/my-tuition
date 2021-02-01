import React from 'react'
import { Typography, Statistic, Row, Col, Button, Progress } from 'antd';
import { useAuth } from '../services/AuthContext';
import { Redirect, useHistory } from 'react-router-dom';
const { Title } = Typography;


export default function Dashboard({ user }) {

    const { currentUser } = useAuth();
    const history = useHistory();


    if (!currentUser) return <Redirect to="/login" />


    return (

        <div> {user && <div className="app" style={{ margin: '100px auto' }}>
            <Title level={3}>Dashboard</Title>

            <Progress type="circle" percent={(Math.round((user.balance) * 100) / user.targetAmount).toFixed(2)} />
            <br></br>
            <br></br>
            <h1>Completion Level</h1>


            <Row gutter={24}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <Statistic title="Target Amount (USD)" value={user.targetAmount} />
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }}>
                    <Statistic title="Account Balance (USD)" value={user.balance} precision={2} />
                    <Button onClick={() => history.push({ pathname: "/payment", state: { user } })} style={{ marginTop: 16 }} type="primary">
                        Make a One-Time Payment
                    </Button>

                    <br></br>

                    <Button onClick={() => history.push({ pathname: "/settings/editAccount", state: { user } })} style={{ marginTop: 16 }} type="primary">
                        Set Up Auto Payment
                    </Button>
                </Col>

            </Row>

        </div>}</div>


    )
}
