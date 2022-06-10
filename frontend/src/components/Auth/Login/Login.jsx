/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './Login.scss';
import { Button, Form, Input } from 'antd';
import Auth from '../Auth';
import { localize } from '../../../utils/constants/locales/localize';
import * as validMessages from '../../../utils/constants/validMessages';
import { regularExpressions } from '../../../utils/constants/regularExpressions/regularExpressions';
import { regularMessages } from '../../../utils/constants/regularExpressions/regularMessages';
import { path } from '../../../utils/constants/constants';

const { validUserMessage } = validMessages;

const Login = ({ userLang, handleLogin, loggedIn }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const locale = localize(userLang);

  const onFinish = async (values) => {
    await handleLogin(values.email, values.password)
      .then(() => navigate(path.profile))
      .catch((err) => console.log(err));
  };

  const handleJumpSignup = () => {
    navigate(path.signup);
  };

  return (
    <Auth title={`${locale.login.title}`}>
      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        initialValues={{
          email: '',
          password: '',
        }}
        scrollToFirstError
        className="form__login"
      >
        <Form.Item
          name="email"
          label={`${locale.register.fieldNameEmail}`}
          rules={[
            {
              type: 'email',
              message: validUserMessage.emailErr,
            },
            {
              required: true,
              message: validUserMessage.requiredErr,
            },
          ]}
        >
          <Input placeholder={`${locale.register.fieldNameEmail}`} />
        </Form.Item>

        <Form.Item
          name="password"
          label={`${locale.register.fieldNamePass}`}
          rules={[
            {
              required: true,
              message: validUserMessage.requiredErr,
            },
            // {
            //   pattern: regularExpressions.password,
            //   message: regularMessages.password,
            // },
          ]}
          hasFeedback
        >
          <Input.Password placeholder={`${locale.register.fieldNamePass}`} />
        </Form.Item>

        <div className="register_btnGroup">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {locale.login.buttonTextSignin}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleJumpSignup}>
              {locale.register.buttonTextSignup}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Auth>
  );
};

export default inject(({ UserStore }) => {
  const { userLang, handleLogin, loggedIn } = UserStore;

  return {
    userLang,
    handleLogin,
    loggedIn,
  };
})(observer(Login));
