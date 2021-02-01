import React from 'react'
import {useState} from 'react';
import {InputNumber, Button, notification, Divider, Typography, Progress} from 'antd';
import {useHistory} from 'react-router-dom';

import moment from 'moment'
import db from '../config/Firebase';

const {Title} = Typography;

const openNotificationSuccess = (amountToAdd) => {
    notification.success({
        message: 'Transaction Completed',
        description:
            `${new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(amountToAdd)} was added to your account\n
            The changes may not be reflected on this page. Please refresh the page`,

    });
};

const openNotificationError = (amountToAdd) => {
    notification.error({
        message: 'There is no card linked to your account',
        description:
            "Add a debit card in the account panel",

    });
};

const openNotificationInfo = (amountToAdd) => {
    notification.info({
        message: 'Target Amount Exceeded',
        description:
            "Make sure the increament and your current balance does not exceed your total target OR increase your total target in the account panel",

    });
};

export default function Payment({user}) {

    const history = useHistory();

    const [amountToAdd, setAmountToAdd] = useState(5.0)

    const handleSubmit = async (amountToAdd) => {

        if (user.card.status) {

            console.log((user.balance + amountToAdd),  user.targetAmount);
            if ((user.balance + amountToAdd) > user.targetAmount) {
                openNotificationInfo();
            } else {
                await db.collection('users').doc(user.uid).update({
                    balance: user.balance + amountToAdd
                });

                await db.collection(`payments/${user.uid}/user-payments`).add({
                    amount: amountToAdd,
                    timeStamp: moment().format()
                });

                history.push("/dashboard");

                // window.location.reload(false);


                openNotificationSuccess(amountToAdd);
            }


        } else {

            openNotificationError();

        }

    }

    return (
        <div>
            {user &&
            <div className="app" style={{padding: "5%", margin: '100px auto', backgroundColor: "#E0F7FA"}}>

                <Title level={3}>Target Amount</Title>
                <h1>{new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'USD'
                }).format(user.targetAmount)}</h1>


                <Divider/>

                <Title level={3}>Current Balance</Title>
                <h1>{new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(user.balance)}</h1>


                <Divider/>

                <Title level={3}>Amount to Add</Title>
                <InputNumber
                    size="large"
                    min={5}
                    defaultValue={amountToAdd}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={(e) => setAmountToAdd(e)}

                />

                <br></br>
                <br></br>

                <Progress strokeLinecap="square"
                          percent={(Math.round((amountToAdd + user.balance) * 100) / user.targetAmount).toFixed(2)}/>


                <br></br>
                <br></br>
                <Button onClick={() => handleSubmit(amountToAdd)} style={{marginTop: 16}} type="primary">
                    Confirm Payment
                </Button>
            </div>
            }
        </div>
    )
}
