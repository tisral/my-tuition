import React from 'react'
import {Card, Button} from 'antd';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';

const {Meta} = Card;

export default function Home() {
    return (

        <div style={{height: "100vh"}}>

            <br></br>

            <h1 style={{textAlign: 'center'}}>Welcome to the best place to save money for college</h1>

            <br></br>
            <Row gutter={[24, 24]}>
                <Col xs={{span: 16, offset: 4}} md={{span: 8, offset: 2}} lg={{span: 7, offset: 1}}> <Card
                    style={{width: 300, height: 300}}

                    cover={
                        <img
                            alt="example"
                            src="https://unsplash.com/photos/J4_4o_HmaQE/download?force=true"
                        />
                    }

                >
                    <Meta
                        title="Prepare your future"
                        description="Save enough for your college education"
                    />
                </Card></Col>


                <Col xs={{span: 16, offset: 4}} md={{span: 8, offset: 2}} lg={{span: 7, offset: 1}}> <Card
                    style={{width: 300, height: 300}}

                    cover={
                        <img
                            alt="example"
                            src="https://unsplash.com/photos/5fNmWej4tAA/download?force=true"
                        />
                    }

                >
                    <Meta
                        title="Pay your tuition"
                        description="Be on time at every deadline"
                    />
                </Card> </Col>


                <Col xs={{span: 16, offset: 4}} md={{span: 8, offset: 2}} lg={{span: 7, offset: 1}}> <Card
                    style={{width: 300, height: 300}}

                    cover={
                        <img
                            alt="example"
                            src="https://unsplash.com/photos/8CqDvPuo_kI/download?force=true"
                        />
                    }

                >
                    <Meta
                        title="Get a degree"
                        description="Be ready for your success"
                    />
                </Card>
                </Col>

            </Row>

            <br></br>
            <br></br>
            <Button style={{
                margin: "0 auto", display: "block"
            }} shape="round" type="primary" size="large" danger>
                <Link to="/login"> Get Started</Link>
            </Button>

        </div>

    )
}
