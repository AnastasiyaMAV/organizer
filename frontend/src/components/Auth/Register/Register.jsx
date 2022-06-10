/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './Register.scss';
import {
  Button, Form, Input, Select, Tooltip,
} from 'antd';
import Auth from '../Auth';
import { path, langValue } from '../../../utils/constants/constants';
import { localize } from '../../../utils/constants/locales/localize';
import * as validMessages from '../../../utils/constants/validMessages';
import { regularExpressions } from '../../../utils/constants/regularExpressions/regularExpressions';
import { regularMessages, regularMessagesError } from '../../../utils/constants/regularExpressions/regularMessages';

const { validUserMessage } = validMessages;

const Register = ({ userLang, handleRegister }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const locale = localize(userLang);

  const onFinish = async (values) => {
    await handleRegister(
      values.name,
      values.email,
      values.password,
      values.lang,
      false, // admin
    )
      .then(() => navigate(path.signin))
      .catch((err) => console.log(err));
  };

  const handleJumpSignin = () => {
    navigate(path.signin);
  };

  return (
    <Auth title={`${locale.register.title}`}>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        className="form__register"
        initialValues={{
          lang: langValue.RU,
        }}
      >
        <Tooltip placement="rightBottom" title={regularMessagesError.login}>
          <Form.Item
            name="name"
            label={`${locale.register.fieldNameLogin}`}
            rules={[
              {
                required: true,
                message: validUserMessage.requiredErr,
                whitespace: true,
              },
              {
                pattern: regularExpressions.login,
                message: regularMessages.login,
              },
            ]}
          >
            <Input placeholder={`${locale.register.fieldNameLogin}`} />
          </Form.Item>
        </Tooltip>

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

        <Tooltip placement="rightBottom" title={regularMessagesError.password}>
          <Form.Item
            name="password"
            label={`${locale.register.fieldNamePass}`}
            rules={[
              {
                required: true,
                message: validUserMessage.requiredErr,
              },
              {
                pattern: regularExpressions.password,
                message: regularMessages.password,
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder={`${locale.register.fieldNamePass}`} />
          </Form.Item>
        </Tooltip>

        <Form.Item
          name="lang"
          label={locale.register.fieldNameLang}
          rules={[
            {
              required: true,
              message: validUserMessage.requiredErr,
            },
          ]}
        >
          <Select>
            <Select.Option value={langValue.RU}>
              {locale.langForm.RU}
            </Select.Option>
            <Select.Option value={langValue.EN}>
              {locale.langForm.EN}
            </Select.Option>
            <Select.Option value={langValue.DE}>
              {locale.langForm.DE}
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {locale.register.buttonTextSignup}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="default" onClick={handleJumpSignin}>
            {locale.login.buttonTextSignin}
          </Button>
        </Form.Item>
      </Form>
    </Auth>
  );
};

export default inject(({ UserStore }) => {
  const { userLang, handleRegister } = UserStore;

  return {
    userLang,
    handleRegister,
  };
})(observer(Register));
