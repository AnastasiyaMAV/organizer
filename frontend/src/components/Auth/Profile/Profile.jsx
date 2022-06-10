import React from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import './Profile.scss';
import {
  Button, Form, Input, Select, Checkbox, Tooltip,
} from 'antd';
import Auth from '../Auth';
import { path, langValue } from '../../../utils/constants/constants';
import { localize } from '../../../utils/constants/locales/localize';
import * as validMessages from '../../../utils/constants/validMessages';
import { regularExpressions } from '../../../utils/constants/regularExpressions/regularExpressions';
import { regularMessages, regularMessagesError } from '../../../utils/constants/regularExpressions/regularMessages';

const { validUserMessage } = validMessages;

const Profile = ({
  userName,
  userEmail,
  userAdmin,
  userLang,
  handleEditUserInfo,
  handleEditAdminInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const locale = localize(userLang);

  const onFinish = async (values) => {
    const token = localStorage.getItem('token');

    if (userAdmin) {
      await handleEditAdminInfo(
        token,
        values.name,
        values.email,
        values.admin,
        values.lang,
      )
        .then(() => navigate(path.profile))
        .catch((err) => console.log(err));
    } else {
      await handleEditUserInfo(token, values.name, values.email, values.lang)
        .then(() => navigate(path.profile))
        .catch((err) => console.log(err));
    }
  };

  const handleJumpContacts = () => {
    navigate(path.contacts);
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
        <Tooltip placement="rightBottom" title={regularMessagesError.login}>
          <Form.Item
            name="name"
            label={`${locale.profile.fieldNameLogin}`}
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
            <Input placeholder={`${locale.profile.fieldNameLogin}`} />
          </Form.Item>
        </Tooltip>

        <Form.Item
          name="email"
          label={`${locale.profile.fieldNameEmail}`}
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
          <Input placeholder={`${locale.profile.fieldNameEmail}`} />
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
          <div className="form__profile-btnGroup">
            <Button type="primary" htmlType="submit">
              {locale.profile.buttonTextSave}
            </Button>
            <Button type="default">
              {locale.profile.buttonTextDel}
            </Button>
            <Button type="default">
              {locale.profile.buttonTextChangePassword}
            </Button>
            <Button type="default" onClick={handleJumpContacts}>
              {locale.profile.buttonLoadTextToMain}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Auth>
  );
};

export default inject(({ UserStore }) => {
  const {
    userName,
    userEmail,
    userAdmin,
    userLang,
    handleEditUserInfo,
    handleEditAdminInfo,
  } = UserStore;

  return {
    userName,
    userEmail,
    userAdmin,
    userLang,
    handleEditUserInfo,
    handleEditAdminInfo,
  };
})(observer(Profile));
