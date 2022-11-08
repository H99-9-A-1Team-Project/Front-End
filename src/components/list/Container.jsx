import default_profile from '../../sources/images/default_profile.png';

export default function Container({ listState, ansState }) {
  //proops로 lists 받아서, 조건별로 다르게 필터링해야함

  console.log(window.location.pathname);

  if (window.location.pathname === '/stanbylist') {
    return (
      <>
        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>
      </>
    );
  }

  if (listState === 0) {
    return (
      <>
        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>답변함</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>대기중</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>완료</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>
      </>
    );
  }
  if (listState === 1) {
    return (
      <>
        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>대기중</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>대기중</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>대기중</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>
      </>
    );
  }
  if (listState === 2) {
    return (
      <>
        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>답변함</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>완료</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>

        <div className="consulting-container">
          <div className="container-header">
            <img src={default_profile} alt="profile-img" />
            {/* 이미지 true/false */}
            <div className="consulting-inner-container">
              <div className="consulting-box">
                <div>상담신청한 주소</div>
                <div>대기중</div>
              </div>
              <div className="consulting-box-bottom">
                <div>등기부등본</div>
                <div className="type-second">건축물대장</div>
              </div>
            </div>
          </div>
          <div>
            전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지 내용 전달된 메시지
            내용 전달된 메시지 내용
          </div>
        </div>
      </>
    );
  }
}
