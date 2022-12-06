import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsultBoxFinish({ item, setSearchState }) {
  const navigate = useNavigate();
  return (
    <div
      className="consulting-container-2"
      onClick={() => {
        navigate(`/myconsultdetail/${item.id}`);
        setSearchState(false);
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="container-header">
        <div className="title-box">{item.title}</div>
        <div className="answer-icon-2">답변함</div>
      </div>
      <div className="time">{item.createdAt}</div>
      <div className="consulting-message">{item.consultMessage}</div>
    </div>
  );
}
