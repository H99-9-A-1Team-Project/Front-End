import React from 'react';
import styled from 'styled-components';
import deco from './sources/deco.png';
import user_circle from '../MyPage/sources/userDefault.png';
import good from './sources/Good.png';
import good2 from './sources/Good2.png';
import { Editor, Viewer } from '@toast-ui/react-editor'; // Editor
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor css
import '@toast-ui/editor/dist/i18n/ko-kr'; // Editor 한국어
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useRef } from 'react';
import { useState } from 'react';

export default function ConsultDetailComment() {
  const [contents, setConsts] = useState({
    html: '',
  });

  const editorRef = useRef();

  const onChange = () => {
    setConsts({ ...contents, html: editorRef.current.getInstance().getHTML() });
  };

  // if(sessionStorage.getItem('account')==='0'&&answerstate==="ROLE_WAIT"){return(
  //     <div></div>
  // )}
  // if(sessionStorage.getItem('account')==='0'&&(answerstate==="ROLE_ANSWER"||answerstate==="ROLE_FINISH")){return(
  //     <div></div>
  // )}
  // if(sessionStorage.getItem('account')==='1'&&answerstate==="ROLE_WAIT"){return(
  //     <div></div>
  // )}
  // if(sessionStorage.getItem('account')==='1'&&(answerstate==="ROLE_ANSWER"||answerstate==="ROLE_FINISH")){return(
  //     <div></div>
  // )}
  return (
    // <ConsultDetailCommentLayout>
    //   <div className="comment_body_wrap_wait">
    //     <img src={deco} alt="deco" />
    //     <div className="content_wait">
    //       <div>공인중개사님이</div>
    //       <div>빠른 시일 내로 답변할</div>
    //       <div>예정이에요</div>
    //     </div>
    //   </div>
    // </ConsultDetailCommentLayout>
    <>
      <ConsultDetailCommentLayout>
        <div className="comment_body_wrap_answer">
          <div className="header">username님의 답변입니다.</div>
          <div className="realtor_info">
            <div className="realtor_info_left">
              <img src={user_circle} alt="user_circle" />
            </div>
            <div className="realtor_info_right">
              <div className="realtor_info_right_top">공인중개사</div>
              <div className="realtor_info_right_middle">username</div>
              <div className="realtor_info_right_bottom">소개메세지소개메세지소개메세지소개메세지소개메세지소개메세지소개메세지소개메세지소개메세지소개메세지소개메세지소개메세지</div>
            </div>
          </div>
          <div className="editor_viwer_wrap">
            <Viewer initialValue="<h3> html 헤더 <span >파란색</span></h3>" />
          </div>
          {/* <div className="like">
          <img src={good2} alt="good" />
          답변이 많은 도움이 되었어요
        </div>
        <div className="dis_like">
          <img src={good} alt="good" />
          답변이 많은 도움이 되었어요
        </div> */}
        </div>
      </ConsultDetailCommentLayout>

      <ConsultDetailCommentLayout>
        <div className="editor_wrap">
          <Editor
            previewStyle={'tab'}
            height="400px"
            initialEditType="wysiwyg"
            initialValue={'공인중개사님의 답변을 작성해 주세요.'}
            hideModeSwitch={true}
            usageStatistics={false}
            language="ko-KR"
            ref={editorRef}
            onChange={onChange}
            toolbarItems={[['image', 'link'], ['heading', 'bold'], ['hr'], ['ul', 'ol']]}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                console.log(blob); // File {name: '카레유.png', ... }

                // 1. 첨부된 이미지 파일을 서버로 전송후, 이미지 경로 url을 받아온다.
                // const imgUrl = await .... 서버 전송 / 경로 수신 코드 ...

                // 2. 첨부된 이미지를 화면에 표시(경로는 임의로 넣었다.)
                callback('http://localhost:5000/img/카레유.png', '카레유');
              },
            }}
          />
          <div className="buttons">
            <button className="cancle_button">취소</button>
            <button className="submit_button">답변 완료</button>
          </div>
        </div>
      </ConsultDetailCommentLayout>
    </>
  );
}
const ConsultDetailCommentLayout = styled.div`
  width: 360px;
  height: 320px;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .comment_body_wrap_wait {
    margin: 52px auto 68px auto;
    img {
      margin-bottom: 16px;
      width: 150px;
      height: 120px;
    }
    .content_wait {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: var(--button-font-family);
      font-size: var(--body_Medium-font-size);
      font-weight: var(--body_Medium-font-weight);
      line-height: var(--body_Medium-line-height);
      letter-spacing: var(--body_Medium-letter-spacing);
      color: var(--gray4);
    }
  }
  .comment_body_wrap_answer {
    margin: 24px 16px 44px 16px;
    .header {
      font-family: var(--button-font-family);
      font-size: var(--headline_Small-font-size);
      font-weight: var(--headline_Small-font-weight);
      line-height: var(--headline_Small-line-height);
      letter-spacing: var(--headline_Small-letter-spacing);
    }
    .realtor_info {
      display: flex;
      flex-direction: row;
      border: 1px solid var(--gray6);
      margin-top: 16px;
      img {
        margin: 12px 8px 12px 12px;
        width: 40px;
        height: 40px;
      }
      .realtor_info_right {
        display: flex;
        flex-direction: column;
        margin: 12px 12px 12px 0;
        .realtor_info_right_top {
          font-family: var(--button-font-family);
          font-size: var(--body_Small-font-size);
          font-weight: var(--body_Small-font-weight);
          line-height: var(--body_Small-line-height);
          letter-spacing: var(--body_Small-letter-spacing);
          color: var(--primary2-300);
        }
        .realtor_info_right_middle {
          font-family: var(--button-font-family);
          font-size: var(--headline_Small-font-size);
          font-weight: var(--headline_Small-font-weight);
          line-height: var(--headline_Small-line-height);
          letter-spacing: var(--headline_Small-letter-spacing);
          margin-bottom: 8px;
        }
        .realtor_info_right_bottom {
          white-space: nomal;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-family: var(--button-font-family);
          font-size: var(--body_Small-font-size);
          font-weight: var(--body_Small-font-weight);
          line-height: var(--body_Small-line-height);
          letter-spacing: var(--body_Small-letter-spacing);
          color: var(--gray4);
        }
      }
    }
    .like,
    .dis_like {
      width: 328px;
      height: 48px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border: 1.5px solid var(--primary2-400);
      border-radius: 8px;
      box-shadow: var(--Shadow2-box-shadow);
      margin: 44px 0;
      gap: 4px;
      font-family: var(--button-font-family);
      font-size: var(--button_Medium-font-size);
      font-weight: var(--button_Medium-font-weight);
      line-height: var(--button_Medium-line-height);
      letter-spacing: var(--button_Medium-letter-spacing);
      color: var(--primary2-400);
    }
    .like {
      background-color: var(--primary2-400);
      color: white;
    }
  }
  .editor_wrap {
    padding: 32px 0 0 0;
    width: 328px;
    display: flex;
    flex-direction: column;
    .buttons {
      width: 328px;
      height: 52px;
      display: flex;
      flex-direction: row;
      gap: 8px;
      margin-top: 32px;
      margin-bottom: 24px;
      button {
        width: 160px;
        border-radius: 8px;
        font-family: var(--button-font-family);
        font-size: var(--button_Large-font-size);
        font-weight: var(--button_Large-font-weight);
        line-height: var(--button_Large-line-height);
        letter-spacing: var(--button_Large-letter-spacing);
      }
      .cancle_button {
        border: 1.5px solid var(--gray4);
        color: var(--gray4);
        background-color: white;
      }
      .submit_button {
        border: 1px solid var(--primary2-400);
        color: white;
        background-color: var(--primary2-400);
      }
    }
  }
`;
