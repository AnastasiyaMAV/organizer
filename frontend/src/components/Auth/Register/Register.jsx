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
import { regularExpressions } from '../../../utils/constants/regularExpressions';

const Register = ({ userLang, handleRegister, loading }) => {
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
        <Tooltip
          placement="rightBottom"
          title={locale.regularMessagesTooltip.login}
        >
          <Form.Item
            name="name"
            label={`${locale.register.fieldNameLogin}`}
            rules={[
              {
                required: true,
                message: locale.validUserMessage.require,
                whitespace: true,
              },
              {
                pattern: regularExpressions.login,
                message: locale.regularMessages.login,
              },
            ]}
          >
            <Input
              placeholder={`${locale.register.fieldNameLogin}`}
              disabled={loading}
            />
          </Form.Item>
        </Tooltip>

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

        <Tooltip
          placement="rightBottom"
          title={locale.regularMessagesTooltip.password}
        >
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
        </Tooltip>

        <Form.Item
          name="confirm"
          label={`${locale.register.fieldNameConfirmPass}`}
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: locale.validUserMessage.confirm,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(locale.validUserMessage.confirmErr),
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={`${locale.register.fieldNameConfirmPass}`}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          name="lang"
          label={locale.register.fieldNameLang}
          rules={[
            {
              required: true,
              message: locale.validUserMessage.required,
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
          <div className="form__register-btnGroup">
            <Button type="primary" htmlType="submit" disabled={loading}>
              {locale.register.buttonTextSignup}
            </Button>
            <Button type="default" onClick={handleJumpSignin} disabled={loading}>
              {locale.login.buttonTextSignin}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Auth>
  );
};

export default inject(({ UserStore }) => {
  const { userLang, handleRegister, loading } = UserStore;

  return {
    userLang,
    handleRegister,
    loading,
  };
})(observer(Register));
