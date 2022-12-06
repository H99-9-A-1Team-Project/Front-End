import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateConsultAnswerState } from '../../api/apiUPDATE';

export default function ConsultBoxAnswered({ item, setSearchState }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const state = { answerState: 'FINISH' };
  const { mutate: updateConsultAnswerState } = useMutation((arg) => UpdateConsultAnswerState(arg), {
    onSuccess: () => {
      queryClient.invalidateQueries(['consultdetail']);
    },
  });
  const onClickHandler = (id) => {
    navigate(`/myconsultdetail/${item.id}`);
    updateConsultAnswerState({ id, state });
  };
  return (
    <div
      className="consulting-container-1"
      onClick={() => {
        onClickHandler(item.id);
        setSearchState(false);
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="container-header">
        <div className="title-box">{item.title}</div>
        <div className="answer-icon-1">답변함</div>
      </div>
      <div className="time">{item.createdAt}</div>
      <div className="consulting-message">{item.comments[0]}</div>
    </div>
  );
}
