import React from 'react'
import {
    Form,
    Input,
    Select,
    Button, DatePicker, message,
} from 'antd';

import db from "../config/Firebase";
import {useHistory} from 'react-router-dom';

import moment from 'moment'

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select date!',
        },
    ],
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{width: 70}}>
            <Option value="1">+1</Option>
        </Select>
    </Form.Item>
);

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const success = () => {
    message.success('Profile Updated');
};

export default function EditProfile({thisUserDoc}) {

    const user = thisUserDoc;
    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    const history = useHistory();

    const onFinish = async (values) => {
        await db.collection('users').doc(user.uid).update({
            firstName: values.user.firstName,
            lastName: values.user.lastName,
            phoneNumber: values.phoneNumber !== undefined ? values.prefix + values.phoneNumber : "",
            address: values.address,
            birthDate: moment(values.date).format()
        });

        success();
        history.push("/settings/profile");
        window.location.reload(false);
    };

    return (

        <div style={{marginTop: 40}}>
            <Form {...formItemLayout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}


                  initialValues={{
                      user: {
                          firstName: user.firstName,
                          lastName: user.lastName,
                      },
                      phoneNumber: user.phoneNumber.substring(1),
                      prefix: "1",
                      address: {
                          city: user.address.city,
                          zipCode: user.address.zipCode,
                          street: user.address.street,
                          state: user.address.state,
                      },
                      date: moment(user.birthDate, 'YYYY-MM-DD')

                  }}

            >
                <Form.Item

                    name={['user', 'firstName']}
                    label="First Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name={['user', 'lastName']}
                    label="Last Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item label="Address">
                    <Input.Group compact>
                        <Form.Item
                            name={['address', 'state']}
                            noStyle
                            rules={[{required: true, message: 'State is required'}]}
                        >
                            <Select placeholder="Select state">

                                {states.map(s => <Option key={s.toString()} value={s}>{s}</Option>)}

                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'street']}
                            noStyle
                            rules={[{required: true, message: 'Street is required'}]}
                        >
                            <Input style={{width: '80%'}} placeholder="Input street"/>
                        </Form.Item>

                        <Form.Item
                            name={['address', 'city']}
                            noStyle
                            rules={[{required: true, message: 'City is required'}]}
                        >
                            <Input style={{width: '50%'}} placeholder="Input city"/>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'zipCode']}
                            noStyle
                            rules={[{required: true, message: 'ZipCode is required'}]}
                        >
                            <Input style={{width: '50%'}} placeholder="ZipCode city"/>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>


                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{required: true, message: 'Please input your phone number!'}]}
                >
                    <Input addonBefore={prefixSelector} style={{width: '100%'}}/>
                </Form.Item>

                <Form.Item name="date" label="BirthDate" {...config}>
                    <DatePicker/>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
