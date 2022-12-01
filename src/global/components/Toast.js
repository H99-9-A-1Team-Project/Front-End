import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ToastOpen } from '../../store/store';

function Toast(props) {
  // const [toast, setToast] = useRecoilState(ToastOpen);
  // const { visible } = props;
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setToast(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    // <ToastStyle visible={visible}>
    <ToastStyle>
      <p>{props.children}</p>
    </ToastStyle>
  );
}

export default Toast;

// Toast.propTypes = {
//   visible: PropTypes.bool,
// };

const ToastStyle = styled.div`
  width: 212px;
  height: 52px;
  position: relative;
  background-color: gray;
  background: rgba(37, 40, 43, 0.6);
  border-radius: 8px;
  /* transform: translate(-50%); */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

