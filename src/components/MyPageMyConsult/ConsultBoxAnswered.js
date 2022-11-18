import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsultBoxAnswered({ item }) {
  const navigate = useNavigate();
  return (
    <div className="consulting-container-1" onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
      <div className="container-header">
        <div className="title-box">{item.title}</div>
        <div className="answer-icon-1">답변함</div>
      </div>
      <div className="time">{item.createdAt}</div>
      <div className="consulting-message">{item.answerMessage}</div>
    </div>
  );
}
