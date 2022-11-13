import { Editor } from '@toast-ui/react-editor'; // Editor
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor css
import '@toast-ui/editor/dist/i18n/ko-kr'; // Editor 한국어
import { useRef } from 'react';
import { useState } from 'react';

export default function ToastUiEditor() {
  const [contents, setConsts] = useState({
    html: '',
  });

  const editorRef = useRef();

  const onChange = () => {
    setConsts({ ...contents, html: editorRef.current.getInstance().getHTML() });
  };

  return (
    <div className="editor">
      <Editor
        previewStyle={'tab'}
        height="400px"
        initialEditType="wysiwyg"
        initialValue={'작성해주세요.'}
        hideModeSwitch={true}
        usageStatistics={false}
        language="ko-KR"
        ref={editorRef}
        onChange={onChange}
        // toolbarItems={[['bold', 'italic', 'strike'], ['image']]}
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
      {/* <ToastUiViewer contents={contents} /> */}
    </div>
  );
}
