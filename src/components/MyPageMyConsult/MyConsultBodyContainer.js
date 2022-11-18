export default function MyConsultBodyContainer({ listState, ansState }) {
  if (listState === 0) {
    return (
      <>
        <div className="consulting-container-1">
          <div className="container-header">
            <div className="title-box">상담신청한 주소 상담신청한 주소 상담신청한 주소 상담신청한 주소 </div>
            <div className="answer-icon-1">답변함</div>
          </div>
          <div className="time">2000.00.00</div>
          <div className="consulting-message">답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 </div>
        </div>

        <div className="consulting-container-0">
          <div className="container-header">
            <div className="title-box">상담신청한 주소 상담신청한 주소 상담신청한 주소 상담신청한 주소 </div>
            <div className="answer-icon-0">대기중</div>
          </div>
          <div className="time">2000.00.00</div>
          <div className="consulting-message">전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용</div>
        </div>

        <div className="consulting-container-2">
          <div className="container-header">
            <div className="title-box">상담신청한 주소 상담신청한 주소 상담신청한 주소 상담신청한 주소 </div>
            <div className="answer-icon-2">답변함</div>
          </div>
          <div className="time">2000.00.00</div>
          <div className="consulting-message">답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 </div>
        </div>
      </>
    );
  }
  if (listState === 1) {
    return (
      <>
        <div className="consulting-container-0">
          <div className="container-header">
            <div className="title-box">상담신청한 주소 상담신청한 주소 상담신청한 주소 상담신청한 주소 </div>
            <div className="answer-icon-0">대기중</div>
          </div>
          <div className="time">2000.00.00</div>
          <div className="consulting-message">전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용</div>
        </div>
      </>
    );
  }
  if (listState === 2) {
    return (
      <>
        <div className="consulting-container-1">
          <div className="container-header">
            <div className="title-box">상담신청한 주소 상담신청한 주소 상담신청한 주소 상담신청한 주소 </div>
            <div className="answer-icon-1">답변함</div>
          </div>
          <div className="time">2000.00.00</div>
          <div className="consulting-message">답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 </div>
        </div>
        <div className="consulting-container-2">
          <div className="container-header">
            <div className="title-box">상담신청한 주소 상담신청한 주소 상담신청한 주소 상담신청한 주소 </div>
            <div className="answer-icon-2">답변함</div>
          </div>
          <div className="time">2000.00.00</div>
          <div className="consulting-message">답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 답변한 내용 </div>
        </div>
      </>
    );
  }
}
