import FootStepList from '../components/footstepmain/FootStepList';
import FootStepNavMenu from '../components/footstepmain/FootStepNavMenu';
import MainPageHeader from '../components/main/MainPageHeader';
import { useRecoilValue } from 'recoil';
import { FootStepListBackState } from '../store/store';
export default function FootStepMain() {
  const btnState = useRecoilValue(FootStepListBackState);
  return (
    <>
      <MainPageHeader />
      <FootStepNavMenu />
      {btnState === 1 ? <FootStepList /> : null}
    </>
  );
}
