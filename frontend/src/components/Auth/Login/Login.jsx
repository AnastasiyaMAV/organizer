import React from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Form, Input } from 'antd';
import './Login.scss';
import Auth from '../Auth';
import { localize } from '../../../utils/constants/locales/localize';
import { path } from '../../../utils/constants/constants';
import { regularExpressions } from '../../../utils/constants/regularExpressions';

const Login = ({ userLang, handleLogin, loading }) => {
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
        scrollToFirstError
        className="form__login"
        initialValues={{
          email: '',
          password: '',
        }}
      >
        <Form.Item
          name="email"
          label={`${locale.register.fieldNameEmail}`}
          rules={[
            {
              type: 'email',
              message: locale.validUserMessage.email,
            },
            {
              required: true,
              message: locale.validUserMessage.required,
            },
          ]}
        >
          <Input
            placeholder={`${locale.register.fieldNameEmail}`}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={`${locale.register.fieldNamePass}`}
          rules={[
            {
              required: true,
              message: locale.validUserMessage.required,
            },
            {
              pattern: regularExpressions.password,
              message: locale.regularMessages.password,
            },
          ]}
        >
          <Input.Password
            placeholder={`${locale.register.fieldNamePass}`}
            disabled={loading}
          />
        </Form.Item>

        <div className="form__login-btnGroup">
          <Button type="primary" htmlType="submit" disabled={loading}>
            {locale.login.buttonTextSignin}
          </Button>
          <Button type="default" onClick={handleJumpSignup} disabled={loading}>
            {locale.register.buttonTextSignup}
          </Button>
        </div>
      </Form>
    </Auth>
  );
};

export default inject(({ UserStore }) => {
  const { userLang, handleLogin, loading } = UserStore;

  return {
    userLang,
    handleLogin,
    loading,
  };
})(observer(Login));
