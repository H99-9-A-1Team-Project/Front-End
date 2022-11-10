import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ToastUiViewer({ contents }) {
  //   const [a, seta] = useState('');
  //   useEffect(() => {
  //     seta(contents.html);
  //   }, [contents]);
  //   console.log('부어', a);
  return (
    <div>
      <Viewer initialValue={contents.html} />
    </div>
  );
}
