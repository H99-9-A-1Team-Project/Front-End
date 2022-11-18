import { useNavigate } from 'react-router-dom';

export default function MyConsultBodyContainer({ listState, item }) {
  const navigate = useNavigate();
  if (listState === 0) {
    if (item.answerState === 'ROLE_WAIT') {
      return (
        <div className="consulting-container-0" onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
          <div className="container-header">
            <div className="title-box">{item.title}</div>
            <div className="answer-icon-0">대기중</div>
          </div>
          <div className="time">{item.createdAt}</div>
          <div className="consulting-message">{item.consultMessage}</div>
        </div>
      );
    }
    if (item.answerState === 'ROLE_ANSWER') {
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
    if (item.answerState === 'ROLE_FINISH') {
      return (
        <div className="consulting-container-2" onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
          <div className="container-header">
            <div className="title-box">{item.title}</div>
            <div className="answer-icon-2">답변함</div>
          </div>
          <div className="time">{item.createdAt}</div>
          <div className="consulting-message">{item.answerMessage}</div>
        </div>
      );
    }
  }

  if (listState === 1) {
    if (item.answerState === 'ROLE_WAIT')
      return (
        <div className="consulting-container-0" onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
          <div className="container-header">
            <div className="title-box">{item.title}</div>
            <div className="answer-icon-0">대기중</div>
          </div>
          <div className="time">{item.createdAt}</div>
          <div className="consulting-message">{item.consultMessage}</div>
        </div>
      );
  }

  if (listState === 2) {
    if (item.answerState === 'ROLE_ANSWER') {
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
    if (item.answerState === 'ROLE_FINISH') {
      return (
        <div className="consulting-container-2" onClick={() => navigate(`/myconsultdetail/${item.id}`)}>
          <div className="container-header">
            <div className="title-box">{item.title}</div>
            <div className="answer-icon-2">답변함</div>
          </div>
          <div className="time">{item.createdAt}</div>
          <div className="consulting-message">{item.answerMessage}</div>
        </div>
      );
    }
  }
}
