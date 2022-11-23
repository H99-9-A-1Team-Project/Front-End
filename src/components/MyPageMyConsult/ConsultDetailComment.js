import React, { useEffect } from 'react';
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
import { RequestConsultComment, RequestConsultCommentImage } from '../../api/apiPOST';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReadConsultDetail } from '../../api/apiGET';

export default function ConsultDetailComment({ id }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [buttonActive, setbuttonActive] = useState(false);
  const [contents, setContents] = useState({
    answerMessage: '',
  });
  const editorRef = useRef();

  const onChange = () => {
    setContents({ ...contents, answerMessage: editorRef.current.getInstance().getHTML() });
  };

  const { mutate: requestConsultComment } = useMutation((arg) => RequestConsultComment(arg), {
    onSuccess: () => {
      queryClient.invalidateQueries(['consultdetail']);
      navigate('/answeredlist');
    },
  });
  const { data } = useQuery(['consultdetail'], () => ReadConsultDetail(id), {
    refetchOnWindowFocus: false,
    onSuccess: (config) => {
      console.log(config.comments.length);
      if (config.comments.length !== 0 && config.comments[0].introMessage === null) {
        config.comments[0].introMessage = '소개메세지가 없습니다.';
      }
    },
  });
  useEffect(() => {
    if (contents.answerMessage !== '') setbuttonActive(true);
    else setbuttonActive(false);
  }, [contents]);

  if (sessionStorage.getItem('accountstate') === '0' && data?.answerState === 'WAIT') {
    return (
      <ConsultDetailCommentLayout>
        <div className="comment_body_wrap_wait">
          <img src={deco} alt="deco" />
          <div className="content_wait">
            <div>공인중개사님이</div>
            <div>빠른 시일 내로 답변할</div>
            <div>예정이에요</div>
          </div>
        </div>
      </ConsultDetailCommentLayout>
    );
  } else if (sessionStorage.getItem('accountstate') === '1' && data?.answerState === 'WAIT') {
    return (
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
                let formData = new FormData();
                formData.append('file', blob);
                const imgUrl = await RequestConsultCommentImage({ formData, id });
                callback(imgUrl.url, '');
              },
            }}
          />
          <div className="buttons">
            <button className="cancle_button" onClick={() => navigate(-1)}>
              취소
            </button>
            <button
              className={buttonActive ? 'submit_button' : 'cancle_button'}
              onClick={() => {
                requestConsultComment({ id, contents });
              }}
            >
              답변 완료
            </button>
          </div>
        </div>
      </ConsultDetailCommentLayout>
    );
  } else {
    return (
      data && (
        <ConsultDetailCommentLayout>
          <div className="comment_body_wrap_answer">
            <div className="header">{data.comments[0].nickname}님의 답변입니다.</div>
            <div className="realtor_info">
              <div className="realtor_info_left">
                <img src={data.comments[0].profile ? data.comments[0].profile : user_circle} alt="user_circle" />
              </div>
              <div className="realtor_info_right">
                <div className="realtor_info_right_top">공인중개사</div>
                <div className="realtor_info_right_middle">{data.comments[0].nickname}</div>
                <div className="realtor_info_right_bottom">{data.comments[0].introMessage}</div>
              </div>
            </div>
            <div className="editor_viwer_wrap">
              <Viewer initialValue={data.comments[0].answerMessage} />
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
      )
    );
  }
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
    width: 328px;
    margin: 24px 16px 44px 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .header {
      font-family: var(--button-font-family);
      font-size: var(--headline_Small-font-size);
      font-weight: var(--headline_Small-font-weight);
      line-height: var(--headline_Small-line-height);
      letter-spacing: var(--headline_Small-letter-spacing);
    }
    .realtor_info {
      width: 100%;
      display: flex;
      flex-direction: row;
      border: 1px solid var(--gray6);
      margin-top: 16px;
      margin-bottom: 12px;
      border-radius: 8px;
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
      .editor_viwer_wrap {
        width: 100%;
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
