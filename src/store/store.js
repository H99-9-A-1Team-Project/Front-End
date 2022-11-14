import { atom } from 'recoil';

export const requireAddress = atom({ key: 'requireAddress', default: '' });
export const ChoiceMem = atom({ key: 'choiceMem', default: false });
export const GoLogIn = atom({ key: 'gologin', default: 0 });
export const NextMem = atom({ key: 'nextMem', default: 0 });
export const NextTor = atom({ key: 'nextTor', default: 0 });
export const ChangeSignUp = atom({ key: 'changesignup', default: false });
export const CloseModal = atom({ key: 'closemodal', default: false });
export const FootStepListBackState = atom({ key: 'footsteplistbackstate', default: 0 });
