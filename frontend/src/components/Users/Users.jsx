import './Users.scss';
import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {
  Table, Button, Popconfirm, Typography,
} from 'antd';
import { localize } from '../../utils/constants/locales/localize';

import ModalForm from '../../ui/Modal/ModalForm/ModalForm';
import UserAdd from './UserAdd/UserAdd';
import UserEdit from './UserEdit/UserEdit';

const Users = ({
  handleAllUsers,
  usersObj,
  userLang,
  handleDellUserUnderAdmin,
}) => {
  const [dataSource, setDataSource] = useState();
  const [visibleModalAddUser, setVisibleModalAddUser] = useState(false);
  const [visibleModalEditUser, setVisibleModalEditUser] = useState(false);
  const [oneUser, setOneUser] = useState(null);
  const locale = localize(userLang);

  useEffect(() => {
    const token = localStorage.getItem('token');
    handleAllUsers(token);
  }, [handleAllUsers]);

  useEffect(() => {
    if (usersObj) {
      setDataSource(usersObj);
    }
  }, [usersObj]);

  const handleModalAddUserCancel = () => {
    setVisibleModalAddUser(false);
  };

  const handleModalEditUserCancel = () => {
    setVisibleModalEditUser(false);
    setOneUser(null);
  };

  const handleDelete = async (_id) => {
    const token = localStorage.getItem('token');
    await handleDellUserUnderAdmin(token, _id)
      .then(() => {
        const newData = dataSource.filter((item) => item._id !== _id);
        setDataSource(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const defaultColumns = [
    {
      title: locale.users.titleLogin,
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: locale.users.titleEmail,
      dataIndex: 'email',
      width: '30%',
    },
    {
      title: locale.users.titleLang,
      dataIndex: 'lang',
      width: '15%',
    },
    {
      title: locale.users.titleAdmin,
      dataIndex: 'admin',
      width: '15%',
      render: (_, record) => (
        <span>
          {record.admin
            ? locale.boolenVariable.trueVar
            : locale.boolenVariable.falseVar}
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '30%',
      render: (_, record) => (dataSource.length >= 1 ? (
        <div className="userTable__operation">
          <Typography.Link
            onClick={() => {
              setVisibleModalEditUser(true);
              setOneUser(record);
            }}
          >
            {locale.users.buttonTextEditUser}
          </Typography.Link>
          <Popconfirm
            title={locale.users.popconfirmTitleResetPassUser}
            onConfirm={() => handleDelete(record._id)}
          >
            <Typography.Link>
              {locale.users.buttonTextResetPass}
            </Typography.Link>
          </Popconfirm>
          <Popconfirm
            title={locale.users.popconfirmTitleDeleteUser}
            onConfirm={() => handleDelete(record._id)}
          >
            <Typography.Link>
              {locale.users.buttonTextDelUser}
            </Typography.Link>
          </Popconfirm>
        </div>
      ) : null),
    },
  ];

  const columns = defaultColumns.map((col) => ({
    ...col,
    onCell: (record) => ({
      record,
      dataindex: col.dataIndex,
      title: col.title,
    }),
  }));

  return (
    <>
      <div className="content__users">
        <Button
          onClick={() => setVisibleModalAddUser(true)}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          {locale.users.buttonTextAddUser}
        </Button>
        {visibleModalAddUser && (
          <ModalForm
            visible={visibleModalAddUser}
            title={locale.users.buttonTextAddUser}
            handleModalCancel={handleModalAddUserCancel}
            footer={null}
          >
            <UserAdd />
          </ModalForm>
        )}

        {oneUser && (
          <ModalForm
            visible={visibleModalEditUser}
            title={locale.users.buttonTextAddUser}
            handleModalCancel={handleModalEditUserCancel}
            footer={null}
          >
            <UserEdit oneUser={oneUser} />
          </ModalForm>
        )}

        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          rowKey={(record) => record._id}
        />
      </div>
    </>
  );
};

export default inject(({ UserStore }) => {
  const {
    usersObj,
    handleAllUsers,
    userLang,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  } = UserStore;

  return {
    usersObj,
    handleAllUsers,
    userLang,
    handleEditUserInfoAdmin,
    handleDellUserUnderAdmin,
  };
})(observer(Users));
