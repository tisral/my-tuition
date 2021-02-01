import React from 'react'
import moment from 'moment'
import {
    Form,
    Input,
    Select,
    Checkbox,
    Button, DatePicker
} from 'antd';

import {auth} from "../config/Firebase";
import db from "../config/Firebase";
import {useHistory, Redirect} from 'react-router-dom';
import {useAuth} from '../services/AuthContext';

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

export default function SignUp() {

    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

    const history = useHistory();

    const {thisUser, currentUser} = useAuth();

    const onFinish = async (values) => {

        await auth
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(async (auth) => {
                if (auth) {

                    await db.collection('users').doc(auth.user.uid).set({

                        firstName: values.user.firstName,
                        lastName: values.user.lastName,
                        email: values.email,
                        phoneNumber: values.phoneNumber !== undefined ? values.prefix + values.phoneNumber : "",
                        address: values.address,
                        birthDate: moment(values.date).format(),
                        card: {
                            status: false,
                            autoPayment: false,
                            monthlyPaymentAmount: 5
                        },
                        targetAmount: 5,
                        balance: 0
                    });

                    history.push('/dashboard');
                    window.location.reload(false);
                }
            })
            .catch(error => alert(error.message))
    };

    if (currentUser) return <Redirect to="/dashboard"/>

    return (

        <div className="center">
            <Form {...formItemLayout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
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
                            <Input style={{width: '60%'}} placeholder="Input street"/>
                        </Form.Item>

                        <Form.Item
                            name={['address', 'city']}
                            noStyle
                            rules={[{required: true, message: 'City is required'}]}
                        >
                            <Input style={{width: '30%'}} placeholder="Input city"/>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'zipCode']}
                            noStyle
                            rules={[{required: true, message: 'ZipCode is required'}]}
                        >
                            <Input style={{width: '30%'}} placeholder="ZipCode city"/>
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


                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
