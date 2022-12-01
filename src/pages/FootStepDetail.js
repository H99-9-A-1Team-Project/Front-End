import React from 'react';
import OverLayout from '../global/components/OverLayout';
import Header from '../components/footstepdetail/Header';
import ImageList from '../components/footstepdetail/ImageList';
import Address from '../components/footstepdetail/Address';
import Tab from '../components/footstepdetail/Tab';
import Basic from '../components/footstepdetail/Basic';
import CheckList from '../components/footstepdetail/CheckList';

export default function FootStepDetail() {
  return (
    <OverLayout>
      <>
        <Header />
        <ImageList />
        <Address />
        <Tab />
        <CheckList />
        <Basic />
      </>
    </OverLayout>
  );
}
