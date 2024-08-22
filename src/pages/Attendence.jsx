import React, { useState } from 'react';
import { Table, Button, Input, Space, DatePicker, Form, Typography, Row, Col, message } from 'antd';
import { SearchOutlined, ExportOutlined } from '@ant-design/icons';
import moment from 'moment';
import * as XLSX from 'xlsx'; // For exporting to CSV
import './Attendence.css'


const { RangePicker } = DatePicker;
const { Title } = Typography;

const AttendanceRecord = () => {
  const [records, setRecords] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);

  const handleAddRecord = () => {
    if (!name || !date) {
      message.error('Please enter both name and date.');
      return;
    }
    const newRecord = {
      key: Date.now(),
      name,
      date: date.format('YYYY-MM-DD'),
    };
    setRecords([...records, newRecord]);
    setName('');
    setDate(null);
    message.success('Record added successfully!');
  };

  const handleEditRecord = (record, index) => {
    setName(record.name);
    setDate(moment(record.date, 'YYYY-MM-DD'));
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    if (!name || date === null) {
      message.error('Please enter both name and date.');
      return;
    }
    const updatedRecords = [...records];
    updatedRecords[editIndex] = {
      ...updatedRecords[editIndex],
      name,
      date: date.format('YYYY-MM-DD'),
    };
    setRecords(updatedRecords);
    setIsEditing(false);
    setName('');
    setDate(null);
    setEditIndex(null);
    message.success('Record updated successfully!');
  };

  const handleDeleteRecord = (index) => {
    setRecords(records.filter((_, i) => i !== index));
    message.success('Record deleted successfully!');
  };

  const handleSearch = () => {
    const filtered = records.filter((record) =>
      record.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRecords(filtered);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    if (dates[0] && dates[1]) {
      const filtered = records.filter((record) =>
        moment(record.date).isBetween(dates[0], dates[1], 'days', '[]')
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(records);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'AttendanceRecords');
    XLSX.writeFile(wb, 'attendance_records.xlsx');
    message.success('Records exported successfully!');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record, index) => (
        <Space size="middle">
          <Button onClick={() => handleEditRecord(record, index)}>Edit</Button>
          <Button danger onClick={() => handleDeleteRecord(index)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="attendance-background">
      <div className="attendance-overlay">
        <div className="attendance-content">
          <Row>
            <Col span={24}>
              <div style={{ marginBottom: '20px' }}>
                <Title level={2}>Attendance Record</Title>
              </div>
              <Form layout="inline" style={{ marginBottom: '20px' }}>
                <Form.Item>
                  <Input
                    placeholder="Search by name"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '300px' }}
                    prefix={<SearchOutlined />}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleSearch}>
                    Search
                  </Button>
                </Form.Item>
                <Form.Item>
                  <RangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    format="YYYY-MM-DD"
                    style={{ width: '300px' }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="default" onClick={handleExport} icon={<ExportOutlined />}>
                    Export to CSV
                  </Button>
                </Form.Item>
              </Form>
              <div style={{ marginBottom: '20px' }}>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ marginRight: '10px', width: '200px' }}
                />
                <DatePicker
                  value={date}
                  onChange={(date) => setDate(date)}
                  format="YYYY-MM-DD"
                  style={{ marginRight: '10px', width: '200px' }}
                />
                {isEditing ? (
                  <Button type="primary" onClick={handleSaveEdit}>
                    Save
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleAddRecord}>
                    Add Record
                  </Button>
                )}
              </div>
              <Table
                columns={columns}
                dataSource={filteredRecords.length ? filteredRecords : records}
                rowKey="key"
                pagination={{ pageSize: 10 }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecord;
