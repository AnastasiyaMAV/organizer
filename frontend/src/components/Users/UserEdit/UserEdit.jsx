import './UserEdit.scss';
import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Form, Input, Checkbox, Tooltip, Button,
} from 'antd';
import { localize } from '../../../utils/constants/locales/localize';
import { regularExpressions } from '../../../utils/constants/regularExpressions';

const UserEdit = ({
  userLang,
  loading,
  oneUser,
  handleEditUserInfoUnderAdmin,
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
    await handleEditUserInfoUnderAdmin(
      token,
      oneUser._id,
      values.name,
      values.email,
      values.admin,
      oneUser.lang,
    )
      .then(async () => {
        await handleAllUsers(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Form
        form={form}
        name="userEdit"
        onFinish={onFinish}
        scrollToFirstError
        className="form__userEdit"
        initialValues={{
          name: oneUser.name,
          email: oneUser.email,
          admin: oneUser.admin,
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
            <Input
              placeholder={`${locale.users.titleLogin}`}
              disabled={loading}
            />
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

        <Form.Item name="admin" valuePropName="checked">
          <Checkbox>{locale.users.titleAdmin}</Checkbox>
        </Form.Item>

        <Form.Item>
          <div className="form__userEdit-btnGroup">
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
    loading,
    handleEditUserInfoUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  } = UserStore;

  return {
    userLang,
    loading,
    handleEditUserInfoUnderAdmin,
    handleAllUsers,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
  };
})(observer(UserEdit));
