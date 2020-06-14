import React from "react";
import { Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { push } from "connected-react-router";
import { deleteUser, resetUserPassword } from "../../redux/actions/user";

const ActionButtons = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const email = useSelector(({ user }) => user.data.email);
  const userId = useSelector(({ user }) => user.data._id);

  const handleDelete = () => {
    dispatch(deleteUser(userId));
    dispatch(push("/admin"));
  };

  return (
    <Space
      size="middle"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Button
        key="reset-password"
        type="primary"
        onClick={() => dispatch(resetUserPassword(email))}
      >
        {t("Reset password")}
      </Button>
      <Button key="delete" type="danger" onClick={handleDelete}>
        {t("Delete")}
      </Button>
    </Space>
  );
};

export default ActionButtons;
