import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
  Button,
  Form,
  Input,
  Select,
  Checkbox,
  Tooltip,
  Popconfirm,
} from 'antd';
import './Profile.scss';
import Auth from '../Auth';
import { path, langValue } from '../../../utils/constants/constants';
import { localize } from '../../../utils/constants/locales/localize';
import { regularExpressions } from '../../../utils/constants/regularExpressions';
import ModalForm from '../../../ui/Modal/ModalForm/ModalForm';
import FormUpdatePass from '../../../ui/Form/FormUpdatePass/FormUpdatePass';

const Profile = ({
  userId,
  userName,
  userEmail,
  userAdmin,
  userLang,
  handleEditUserInfo,
  handleEditAdminInfo,
  loading,
  handleDellProfile,
  logOut,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const locale = localize(userLang);
  const [visibleModalUpdatePass, setVisibleModalUpdatePass] = useState(false);

  const onFinish = async (values) => {
    const token = localStorage.getItem('token');

    if (userAdmin) {
      await handleEditAdminInfo(
        token,
        userId,
        values.name,
        values.email,
        values.admin,
        values.lang,
      )
        .then(() => navigate(path.profile))
        .catch((err) => console.log(err));
    } else {
      await handleEditUserInfo(
        token,
        userId,
        values.name,
        values.email,
        values.lang,
      )
        .then(() => navigate(path.profile))
        .catch((err) => console.log(err));
    }
  };

  const handleJumpContacts = () => {
    navigate(path.contacts);
  };

  const handleDeleteProfile = async () => {
    const token = localStorage.getItem('token');
    await handleDellProfile(token, userId)
      .then(() => {
        logOut();
        navigate(path.signin);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModalAddUserCancel = () => {
    setVisibleModalUpdatePass(false);
  };

  return (
    <Auth title={`${locale.profile.title} ${userName}!`}>
      <Form
        form={form}
        name="profile"
        onFinish={onFinish}
        scrollToFirstError
        className="form__profile"
        initialValues={{
          name: userName || '',
          email: userEmail || '',
          lang: userLang || '',
          admin: userAdmin || false,
        }}
      >
        <Tooltip
          placement="rightBottom"
          title={locale.regularMessagesTooltip.login}
        >
          <Form.Item
            name="name"
            label={`${locale.profile.fieldNameLogin}`}
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
              placeholder={`${locale.profile.fieldNameLogin}`}
              disabled={loading}
            />
          </Form.Item>
        </Tooltip>

        <Form.Item
          name="email"
          label={`${locale.profile.fieldNameEmail}`}
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
            placeholder={`${locale.profile.fieldNameEmail}`}
            disabled={loading}
          />
        </Form.Item>

        {userAdmin && (
          <Form.Item name="admin" valuePropName="checked">
            <Checkbox>{locale.profile.fieldNameAdmin}</Checkbox>
          </Form.Item>
        )}

        <Form.Item
          name="lang"
          label={locale.profile.fieldNameLang}
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
          <div className="form__profile-btnGroup">
            <Button type="primary" htmlType="submit" disabled={loading}>
              {locale.profile.buttonTextSave}
            </Button>
            <Popconfirm
              title={locale.profile.popconfirmTitleDeleteUser}
              onConfirm={() => handleDeleteProfile()}
            >
              <Button type="default" disabled={loading}>
                {locale.profile.buttonTextDel}
              </Button>
            </Popconfirm>
            <Popconfirm
              title={locale.profile.popconfirmTitleResetPassUser}
              onConfirm={() => setVisibleModalUpdatePass(true)}
            >
              <Button type="default" disabled={loading}>
                {locale.profile.buttonTextChangePassword}
              </Button>
            </Popconfirm>

            <Button
              type="default"
              onClick={handleJumpContacts}
              disabled={loading}
            >
              {locale.profile.buttonLoadTextToMain}
            </Button>
          </div>
        </Form.Item>
      </Form>

      {visibleModalUpdatePass && (
        <ModalForm
          visible={visibleModalUpdatePass}
          title={locale.profile.titleModalPassword}
          handleModalCancel={handleModalAddUserCancel}
          footer={null}
        >
          <FormUpdatePass />
        </ModalForm>
      )}
    </Auth>
  );
};

export default inject(({ UserStore }) => {
  const {
    userId,
    userName,
    userEmail,
    userAdmin,
    userLang,
    handleEditUserInfo,
    handleEditAdminInfo,
    loading,
    handleDellProfile,
    logOut,
  } = UserStore;

  return {
    userId,
    userName,
    userEmail,
    userAdmin,
    userLang,
    handleEditUserInfo,
    handleEditAdminInfo,
    loading,
    handleDellProfile,
    logOut,
  };
})(observer(Profile));
