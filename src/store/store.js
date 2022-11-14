import { atom } from 'recoil';

export const requireAddress = atom({ key: 'requireAddress', default: '' });
export const ChoiceMem = atom({ key: 'choiceMem', default: false });
export const GoLogIn = atom({ key: 'gologin', default: 0 });
export const NextMem = atom({ key: 'nextMem', default: 0 });
export const NextTor = atom({ key: 'nextTor', default: 0 });
export const ChangeSignUp = atom({ key: 'changesignup', default: false });
export const CloseModal = atom({ key: 'closemodal', default: false });

export const tabBarHome = atom({ key: 'tabbarhome', default: 0 });
export const tabBarPin = atom({ key: 'tabbarpin', default: 0 });
export const tabBarRequest = atom({ key: 'tabbarrequest', default: 0 });
export const tabBarUser = atom({ key: 'tabbaruser', default: 0 });
