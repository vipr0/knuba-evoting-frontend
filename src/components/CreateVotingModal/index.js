import React from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ModalWrapper from "../ModalWrapper";
import { connect } from "react-redux";
import { createVoting } from "../../redux/actions/voting";

const mapStateToProps = (state) => ({
  modal: state.modals.createVoting,
});

const mapDispatchToProps = (dispatch) => ({
  createVoting: (data) => dispatch(createVoting(data)),
});

const CreateVotingModal = ({ modal, createVoting }) => {
  return (
    <ModalWrapper
      modalName="createVoting"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title="Create a new voting"
    >
      <Form layout="vertical" onFinish={createVoting}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.List name="candidates">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    key={field.key}
                    label={index === 0 ? "Candidates" : ""}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input candidate's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="candidate name"
                        style={{ width: "85%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        style={{ margin: "0 8px" }}
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    <PlusOutlined /> Add candidate
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: "Please select end time!" }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="Do MMM YYYY, HH:mm:ss"
          />
        </Form.Item>

        <Form.Item>
          <Button loading={modal.loading} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVotingModal);
