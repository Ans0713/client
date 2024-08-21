import React from 'react';
import { Card, Typography, Form, Input, Button, Upload, message, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './Leave.css'; // Import your CSS file for styling

const { Title } = Typography;

const UploadLeaveApplication = () => {
  const [form] = Form.useForm();

  // Submit handler
  const handleSubmit = (values) => {
    console.log('Form values:', values);
    message.success('Leave application submitted successfully!');
  };

  // File upload change handler
  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // File validation rules
  const customRequest = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      // Simulate a file upload
      if (file) {
        onSuccess();
      } else {
        onError(new Error('File upload failed.'));
      }
    }, 1000);
  };

  return (
    <div className="upload-leave-application-container">
      <Row justify="center" align="middle" className="row">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card title="Upload Leave Application" className="card">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="form"
            >
              <Form.Item
                label="Employee Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name!' }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

              <Form.Item
                label="Leave Type"
                name="leaveType"
                rules={[{ required: true, message: 'Please select the leave type!' }]}
              >
                <Input placeholder="Sick Leave / Casual Leave" />
              </Form.Item>

              <Form.Item
                label="Reason for Leave"
                name="reason"
                rules={[{ required: true, message: 'Please provide a reason for your leave!' }]}
              >
                <Input.TextArea rows={4} placeholder="Reason for leave..." />
              </Form.Item>

              <Form.Item
                label="Upload Leave Document"
                name="document"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: 'Please upload a document!' }]}
              >
                <Upload
                  customRequest={customRequest} // Use customRequest for file validation
                  name="document"
                  action="/upload" // Replace with your actual upload URL
                  listType="picture"
                  onChange={handleFileChange}
                  showUploadList={{ showRemoveIcon: true }}
                  maxCount={1} // Limit to 1 file
                  accept=".pdf,.doc,.docx,.jpg,.png" // Allow specific file types
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="submit-button"
                  loading={form.getFieldValue('loading')} // Show loading state
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UploadLeaveApplication;
