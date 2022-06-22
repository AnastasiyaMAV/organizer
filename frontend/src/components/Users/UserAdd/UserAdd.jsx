import './UserAdd.scss';
import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Form, Input, Select, Checkbox, Tooltip, Button,
} from 'antd';
import { langValue } from '../../../utils/constants/constants';
import { localize } from '../../../utils/constants/locales/localize';
import { regularExpressions } from '../../../utils/constants/regularExpressions';

const UserAdd = ({
  userLang,
  loading,
  handleAddUserUnderAdmin,
  handleAllUsers,
  errload,
  setErrload,
  successLoad,
  setSuccessLoad,
}) => {
  const [form] = Form.useForm();
  const locale = localize(userLang);

  useEffect(() => {
    setErrload();
  }, [setErrload]);

  useEffect(() => {
    setSuccessLoad();
  }, [setSuccessLoad]);

  const onFinish = async (values) => {
    const token = localStorage.getItem('token');
    await handleAddUserUnderAdmin(
      values.name,
      values.email,
      values.password,
      values.lang,
      values.admin,
    )
      .then(async () => {
        await handleAllUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        name="userAdd"
        onFinish={onFinish}
        scrollToFirstError
        className="form__userAdd"
        initialValues={{
          name: '',
          email: '',
          lang: langValue.RU,
          admin: false,
        }}
      >
        <Tooltip
          placement="rightBottom"
          title={locale.regularMessagesTooltip.login}
        >
          <Form.Item
            name="name"
            label={`${locale.users.titleLogin}`}
            rules={[
              {
                required: true,
                message: locale.validUserMessage.required,
                whitespace: true,
              },
              {
                pattern: regularExpressions.login,
                message: locale.regularMessages.login,
              },
            ]}
          >
            <Input placeholder={`${locale.users.titleLogin}`} />
          </Form.Item>
        </Tooltip>

        <Form.Item
          name="email"
          label={`${locale.users.titleEmail}`}
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
            placeholder={`${locale.users.titleEmail}`}
            disabled={loading}
          />
        </Form.Item>

        <Tooltip
          placement="rightBottom"
          title={locale.regularMessagesTooltip.password}
        >
          <Form.Item
            name="password"
            label={`${locale.users.titlePass}`}
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
              placeholder={`${locale.users.titlePass}`}
              disabled={loading}
            />
          </Form.Item>
        </Tooltip>

        <Form.Item
          name="confirm"
          label={`${locale.users.titleConfirmPass}`}
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
            placeholder={`${locale.users.titleConfirmPass}`}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item name="admin" valuePropName="checked">
          <Checkbox>{locale.users.titleAdmin}</Checkbox>
        </Form.Item>

        <Form.Item
          name="lang"
          label={locale.users.titleLang}
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
          <div className="form__userAdd-btnGroup">
            {errload || successLoad ? (
              <>
                <div>{errload}</div>
                <div>{successLoad}</div>
              </>
            ) : (
              <Button type="primary" htmlType="submit" disabled={loading}>
                {locale.users.buttonTextSave}
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default inject(({ UserStore }) => {
  const {
    userLang,
    handleAddUserUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  } = UserStore;

  return {
    userLang,
    handleAddUserUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  };
})(observer(UserAdd));
