import React from 'react'
import {InputNumber, Switch, Typography, Checkbox, Divider, Button} from 'antd';
import {useState} from 'react';
import db from '../config/Firebase';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

export default function EditAccount({thisUserDoc}) {

    const history = useHistory();

    const [removeCard, setRemoveCard] = useState(false);
    const [autoPayment, setAutoPayment] = useState(thisUserDoc.card.autoPayment);
    const [monthlyPaymentAmount, setMonthlyPaymentAmount] = useState(thisUserDoc.card.monthlyPaymentAmount);
    const [targetAmount, setTargetAmount] = useState(thisUserDoc.targetAmount);
    const [status, setStatus] = useState(thisUserDoc.card.status);


    const handleSubmit = async () => {

        await db.collection('users').doc(thisUserDoc.uid).update({
            card: {
                status: !removeCard,
                autoPayment: autoPayment,
                monthlyPaymentAmount: monthlyPaymentAmount

            },
            targetAmount: targetAmount,

        });

        history.push("/settings/account");

        window.location.reload();

    }

    const cardStatusDisplay = () => {

        if (status) {
            return (<div>
                <Checkbox onChange={(e) => {
                    setRemoveCard(!e.target.value);
                    setStatus(e.target.value);
                }}>
                    Remove Debit Card
                </Checkbox>

                <Divider/>
                <span>OFF  &nbsp;  <Switch defaultChecked={thisUserDoc.card.autoPayment}
                                           onChange={(e) => setAutoPayment(e)}/> &nbsp; Auto Payment ON</span>

                <br></br>
                <br></br>
                <Title level={5}>Monthly Payment</Title>
                <h1></h1>
                <br></br>
                <InputNumber
                    size="large"
                    min={5}
                    max={targetAmount}
                    defaultValue={thisUserDoc.card.monthlyPaymentAmount}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={(e) => setMonthlyPaymentAmount(e)}
                />

            </div>);
        } else {
            return (<h1 style={{cursor: "pointer"}} onClick={() => setStatus(true)}>Add Card</h1>)
        }
    }

    return (
        <div>

            <Title level={3}>Manage Your Account</Title>
            <br></br>

            <Title level={5}>My Card</Title>

            {cardStatusDisplay()}

            <Divider/>

            <Title level={5}>Change Target Amount</Title>
            <h1></h1>
            <br></br>
            <InputNumber
                size="large"
                min={thisUserDoc.balance === 0 ? 1 : thisUserDoc.balance}
                defaultValue={thisUserDoc.targetAmount}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                onChange={(e) => setTargetAmount(e)}
            />

            <br></br>
            <br></br>
            <br></br>

            <Button type="primary" onClick={handleSubmit}>
                Save
            </Button>

        </div>
    )
}
