import React, {useEffect, useState} from 'react'
import {Typography, Divider, Card, Row, Col, Button} from 'antd';
import {CreditCardOutlined, DollarCircleOutlined, EditOutlined} from '@ant-design/icons';
import debitCard from "../assets/debitCard.svg";
import {Link, useHistory} from 'react-router-dom';
import moment from 'moment'
import db from '../config/Firebase';

const {Title} = Typography;

export default function Account({thisUserDoc}) {

    const history = useHistory();
    const [payments, setPayments] = useState([]);

    useEffect(() => {

        let mounted = true;

        if (thisUserDoc) {

            db.collection(`payments/${thisUserDoc.uid}/user-payments`).onSnapshot((snapshot) => {
                if (mounted) {
                    setPayments(snapshot.docs.map((doc) => doc.data()).sort((a, b) => b.timeStamp.localeCompare(a.timeStamp)));
                }
            });

        }

        return () => mounted = false;
    }, [])


    const handleCashOutMoney = async () => {
        await db.collection('users').doc(thisUserDoc.uid).update({
            balance: 0,
            targetAmount: 5
        });

        window.location.reload();

    }

    const cardDisplay = () => {
        if (thisUserDoc.card.status) {
            return (<Row>
                <Col xs={{span: 16, offset: 4}} md={{span: 8, offset: 2}} lg={{span: 7, offset: 1}}> <img
                    style={{width: 200, height: 200}} src={debitCard} alt="debit card"/></Col>
                <Col xs={{span: 16, offset: 4}} md={{span: 8, offset: 2}} lg={{span: 7, offset: 1}}><Card
                    title="XY Bank"
                    extra={<Link to={{pathname: "/settings/editAccount", state: thisUserDoc}}>Remove</Link>}
                    style={{maxWidth: 300}}>
                    <p>CHECKING ••••6589</p>
                    <p>{`Auto Payment : ${thisUserDoc.card.autoPayment ? "ON" : "OFF"}`}</p>
                    {thisUserDoc.card.autoPayment && <p>{`$ ${thisUserDoc.card.monthlyPaymentAmount} per month`}</p>}
                    <p>Status : confirmed</p>
                    {/* <p>{thisUserDoc.firstName}</p> */}
                </Card></Col>
            </Row>);
        } else {
            return (
                <div>
                    <CreditCardOutlined style={{fontSize: '200px'}}/>
                    <br></br>
                    <Link to="/settings/editAccount">Add a debit card</Link>
                </div>);
        }
    }

    return (
        <div>
            <Title level={3}>Debit Card Linked</Title>

            {cardDisplay()}

            <Divider/>

            <Title level={5}>Target Amount</Title>
            <h1>{new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'USD'
            }).format(thisUserDoc.targetAmount)}</h1>

            <br></br>
            <Button onClick={() => history.push("/settings/editAccount")} type="primary" icon={<EditOutlined/>}
                    size={"large"}>
                Edit
            </Button>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={handleCashOutMoney} icon={<DollarCircleOutlined/>} size={"large"}>
                Cash Out Money
            </Button>

            <Divider/>

            {payments && <div>

                <Title level={5}>Deposit History</Title>

                {payments.map((p) =>

                    <div key={p.timeStamp}><Card title={<b>{new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(p.amount)} </b>} bordered={false} style={{maxWidth: 300}}>
                        <p>{moment(p.timeStamp).format('MM/DD/YYYY, h:mm a')}</p>
                    </Card> <br></br></div>
                )}
            </div>}


        </div>
    )
}
