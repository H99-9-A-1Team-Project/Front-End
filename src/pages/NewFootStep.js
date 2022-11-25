import React from 'react';
import OverLayout from '../global/components/OverLayout';
import MainPageTabBar from '../components/main/MainPageTabBar';
import NewFootStepHeader from '../components/newFootStep/NewFootStepHeader';
import NewFootStepAddress from '../components/newFootStep/NewFootStepAddress';
import NewFootStepImg from '../components/newFootStep/NewFootStepImg';
import NewFootStepBasicState from '../components/newFootStep/NewFootStepBasicState';
import NewFootStepBasic from '../components/newFootStep/NewFootStepBasic';
import NewFootStepSunState from '../components/newFootStep/NewFootStepSunState';
import NewFootStepSun from '../components/newFootStep/NewFootStepSun';
import NewFootStepOptionState from '../components/newFootStep/NewFootStepOptionState';
import NewFootStepOption from '../components/newFootStep/newFootStepOption';
import NewFootStepSecurityState from '../components/newFootStep/NewFootStepSecurityState';
import NewFootStepSecurity from '../components/newFootStep/NewFootStepSecurity';
import NewFootStepConvenState from '../components/newFootStep/NewFootStepConvenState';
import NewFootStepConven from '../components/newFootStep/NewFootStepConven';

export default function NewFootStep() {
  return (
    <OverLayout>
      <NewFootStepHeader />
      <NewFootStepAddress />
      <NewFootStepImg />
      <NewFootStepBasicState />
      <NewFootStepBasic />
      <NewFootStepSunState />
      <NewFootStepSun />
      <NewFootStepOptionState />
      <NewFootStepOption />
      <NewFootStepSecurityState />
      <NewFootStepSecurity />
      <NewFootStepConvenState />
      <NewFootStepConven />
    </OverLayout>
  );
}
