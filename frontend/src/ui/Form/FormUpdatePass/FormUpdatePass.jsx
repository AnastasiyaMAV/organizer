import './FormUpdatePass.scss';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
  Form, Input, Tooltip, Button,
} from 'antd';
import { localize } from '../../../utils/constants/locales/localize';
import { regularExpressions } from '../../../utils/constants/regularExpressions';
import { path } from '../../../utils/constants/constants';

const FormUpdatePass = ({
  userId,
  userLang,
  loading,
  handleUpdatePassProfile,
  errload,
  setErrload,
  successLoad,
  setSuccessLoad,
  logOut,
}) => {
  const navigate = useNavigate();
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
    await handleUpdatePassProfile(
      token,
      userId,
      values.password,
      values.newPassword,
    )
      .then(async () => {
        logOut();
        navigate(path.signin);
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
        name="updatePassword"
        onFinish={onFinish}
        scrollToFirstError
        className="form__userAdd"
      >

        <Tooltip
          placement="rightBottom"
          title={locale.regularMessagesTooltip.password}
        >
          <Form.Item
            name="password"
            label={`${locale.profile.fieldPassword}`}
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
              placeholder={`${locale.profile.titlePassword}`}
              disabled={loading}
            />
          </Form.Item>
        </Tooltip>

        <Tooltip
          placement="rightBottom"
          title={locale.regularMessagesTooltip.password}
        >
          <Form.Item
            name="newPassword"
            label={`${locale.profile.fieldPassword}`}
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
              placeholder={`${locale.profile.titleNewPassword}`}
              disabled={loading}
            />
          </Form.Item>
        </Tooltip>

        <Form.Item>
          <div className="form__updatePassword-btnGroup">
            {errload || successLoad ? (
              <>
                <div>{errload}</div>
                <div>{successLoad}</div>
              </>
            ) : (
              <Button type="primary" htmlType="submit" disabled={loading}>
                {locale.profile.buttonPasswordSave}
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
    userId,
    userLang,
    handleUpdatePassProfile,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
    logOut,
  } = UserStore;

  return {
    userId,
    userLang,
    handleUpdatePassProfile,
    errload,
    setErrload,
    successLoad,
    setSuccessLoad,
    logOut,
  };
})(observer(FormUpdatePass));
