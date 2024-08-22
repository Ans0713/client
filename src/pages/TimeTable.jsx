import React, { useState } from 'react';
import { Table, Typography, Row, Col, Button, Collapse } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './TimeTable.css';

const { Title } = Typography;
const { Panel } = Collapse;

const columns = [
  { title: 'Time', dataIndex: 'time', key: 'time', width: '20%' },
  { title: 'Monday', dataIndex: 'monday', key: 'monday', width: '15%' },
  { title: 'Tuesday', dataIndex: 'tuesday', key: 'tuesday', width: '15%' },
  { title: 'Wednesday', dataIndex: 'wednesday', key: 'wednesday', width: '15%' },
  { title: 'Thursday', dataIndex: 'thursday', key: 'thursday', width: '15%' },
  { title: 'Friday', dataIndex: 'friday', key: 'friday', width: '15%' },
];

const timetableData = {
  mba: [
    { key: '1', time: '9:00 - 10:00', monday: 'Economics', tuesday: 'Marketing', wednesday: 'Finance', thursday: 'HR', friday: 'Strategy' },
    { key: '2', time: '10:00 - 11:00', monday: 'Finance', tuesday: 'Economics', wednesday: 'HR', thursday: 'Marketing', friday: 'Strategy' },
    // Add more rows as needed
  ],
  mca: [
    { key: '1', time: '9:00 - 10:00', monday: 'Data Structures', tuesday: 'Algorithms', wednesday: 'Database Systems', thursday: 'Software Engineering', friday: 'Web Development' },
    { key: '2', time: '10:00 - 11:00', monday: 'Database Systems', tuesday: 'Data Structures', wednesday: 'Software Engineering', thursday: 'Algorithms', friday: 'Web Development' },
    // Add more rows as needed
  ],
  btech: [
    { key: '1', time: '9:00 - 10:00', monday: 'Mathematics', tuesday: 'Physics', wednesday: 'Chemistry', thursday: 'Computer Science', friday: 'Engineering Drawing' },
    { key: '2', time: '10:00 - 11:00', monday: 'Physics', tuesday: 'Mathematics', wednesday: 'Computer Science', thursday: 'Chemistry', friday: 'Engineering Drawing' },
    // Add more rows as needed
  ],
  msc: [
    { key: '1', time: '9:00 - 10:00', monday: 'Quantum Mechanics', tuesday: 'Statistical Mechanics', wednesday: 'Electrodynamics', thursday: 'Thermodynamics', friday: 'Mathematical Methods' },
    { key: '2', time: '10:00 - 11:00', monday: 'Statistical Mechanics', tuesday: 'Quantum Mechanics', wednesday: 'Thermodynamics', thursday: 'Electrodynamics', friday: 'Mathematical Methods' },
    // Add more rows as needed
  ],
};

const TimetablePage = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleDownloadPdf = async (className) => {
    const input = document.getElementById(`${className}-timetable`);
    const canvas = await html2canvas(input, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${className}-timetable.pdf`);
  };

  return (
    <div className="timetable-page-container">
      <Title level={2} className="page-title">Class Timetables</Title>
      <img src='../assets/timetable.jpeg' alt="Timetable Background" className="background-image" />
      {Object.keys(timetableData).map((className) => (
        <Row key={className} className="timetable-row" justify="center">
          <Col span={18}>
            <div className="timetable-card">
              <Collapse
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key === activeKey ? null : key)}
                expandIconPosition="right"
                style={{ marginBottom: '16px' }}
              >
                <Panel
                  header={`${className.toUpperCase()} Timetable`}
                  key={className}
                  extra={
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      className="download-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadPdf(className);
                      }}
                    >
                      Download PDF
                    </Button>
                  }
                >
                  <div className="timetable-card-content" id={`${className}-timetable`}>
                    <Table
                      columns={columns}
                      dataSource={timetableData[className]}
                      pagination={false}
                      bordered
                    />
                  </div>
                </Panel>
              </Collapse>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default TimetablePage;

