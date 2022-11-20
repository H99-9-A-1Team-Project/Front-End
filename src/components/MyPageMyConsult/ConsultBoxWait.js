import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsultBoxWait({ item }) {
  const navigate = useNavigate();
  return (
    <div className="consulting-container-0" onClick={() => navigate(`/myconsultdetail/${item.id}`)} style={{ cursor: 'pointer' }}>
      <div className="container-header">
        <div className="title-box">{item.title}</div>
        <div className="answer-icon-0">대기중</div>
      </div>
      <div className="time">{item.createdAt}</div>
      <div className="consulting-message">{item.consultMessage}</div>
    </div>
  );
}
