import React from 'react';

import './ModalForm.scss';
import { Modal } from 'antd';

const ModalForm = ({
  visible, title, handleModalOk, handleModalCancel, footer, children,
}) => (
  <Modal
    visible={visible}
    title={title}
    onOk={handleModalOk}
    onCancel={handleModalCancel}
    footer={footer}
  >
    {children}
  </Modal>
);

export default ModalForm;
