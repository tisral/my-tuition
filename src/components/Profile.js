import React from 'react'
import {Image, Button} from 'antd';
import {Typography, Divider} from 'antd';
import moment from 'moment'
import {EditOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';

const {Title} = Typography;

export default function Profile({thisUserDoc}) {

    const {firstName, lastName, address, birthDate, phoneNumber} = thisUserDoc;
    const history = useHistory();

    return (
        <div>
            <Title level={3}>Personal Information</Title>
            <Image
                width={200}
                src="https://unsplash.com/photos/IcI3FizU9Cw/download?force=true"
            />

            <br></br>
            <Title level={5}>First Name</Title>
            <h1>{firstName}</h1>

            <Title level={5}>Last Name</Title>

            <h1>{lastName}</h1>

            <Title level={5}>Date of Birth</Title>
            <h1>{moment(birthDate).format('MMMM Do YYYY')}</h1>

            <Title level={5}>SSN</Title>
            <h1>123 - 45 - XYXY</h1>

            <Divider/>

            <Title level={5}>Address</Title>

            <h1>{`${address.street}, ${address.city}, ${address.state} ${address.zipCode}`}</h1>

            <Divider/>

            <Title level={5}>Phone Number</Title>

            <h1>{phoneNumber}</h1>


            <br></br>
            <Button onClick={() => history.push("/settings/editProfile")} type="primary" icon={<EditOutlined/>}
                    size={"large"}>
                Edit
            </Button>
        </div>
    )
}
