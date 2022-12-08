import { atom } from 'recoil';

export const TabState = atom({ key: 'tabstate', default: 0 });

// 회원가입,로그인
export const ChoiceMem = atom({ key: 'choiceMem', default: false });
export const GoLogIn = atom({ key: 'gologin', default: 0 });
export const NextMem = atom({ key: 'nextMem', default: 0 });
export const NextTor = atom({ key: 'nextTor', default: 0 });
export const ChangeSignUp = atom({ key: 'changesignup', default: false });
export const CloseModal = atom({ key: 'closemodal', default: false });
export const isLogin = atom({ key: 'islogin', default: false });
export const itsNotOK = atom({ key: 'itsnotok', default: false });
export const itsNotOK2 = atom({ key: 'itsnotok2', default: false });
export const LoginDatas = atom({ key: 'logindatas', default: '' });
export const TextToast = atom({ key: 'texttoast', default: '' });
export const AutoLoginState = atom({ key: 'autologinstate', default: false });

// Tab Bar
export const tabBarHome = atom({ key: 'tabbarhome', default: 0 });
export const tabBarPin = atom({ key: 'tabbarpin', default: 0 });
export const tabBarRequest = atom({ key: 'tabbarrequest', default: 0 });
export const tabBarUser = atom({ key: 'tabbaruser', default: 0 });
export const TabAccountState = atom({ key: 'tabaccountstate', default: 1 });

// Side Tab Bar
export const sideTabBar = atom({ key: 'sidetabbar', default: false });

// 상담 요청하기 헤드라인
export const rqHeadline = atom({ key: 'rqheadline', default: '' });
export const rqHeadlinecount = atom({ key: 'rqheadlinecount', default: '' });

// 상담 요청하기
export const requireAddress = atom({ key: 'requireaddress', default: '도로명 주소 검색' });
export const rqDetailAddress = atom({ key: 'rqdetailaddress', default: '' });
export const rqInfo = atom({
  key: 'rqinfo',
  default: {
    title: '',
    coordY: '',
    coordX: '',
    check1: 0,
    check2: 0,
    check3: 0,
    check4: 0,
    check5: 0,
    check6: 0,
    consultMessage: '',
  },
});

// 상담 요청하기
export const nfsRoadAddress = atom({ key: 'nfsroadaddress', default: '도로명 주소 검색' });
export const nfsDetailAddress = atom({ key: 'nfsdetailaddress', default: '' });

// 매물 기록하기
export const nfsData = atom({
  key: 'nfsdata',
  default: {
    title: '',
    coordFX: '',
    coordFY: '',
    price: '',
    expenses: '',
    size: '',
    review: '',
    sun: false,
    mold: false,
    vent: false,
    water: false,
    ventil: false,
    drain: false,
    draft: false,
    extraMemo: '',
    option: '',
    destroy: false,
    utiRoom: false,
    securityWindow: false,
    noise: false,
    loan: false,
    cctv: false,
    hill: false,
    mart: false,
    hospital: false,
    accessibility: false,
    park: false,
  },
});

export const nfsImgData = atom({ key: 'nfsimgdata', default: [] });
export const nfsPreviewImgData = atom({ key: 'nfspreviewimgdata', default: [] });

export const nfsrPath = atom({
  key: 'nfsrpath',
  default: {
    basic: false,
    sun: false,
    option: false,
    security: false,
    conven: false,
  },
});
export const nfsImgState = atom({
  key: 'imgstate',
  default: {
    sun: false,
    mold: false,
    vent: false,
    water: false,
    ventil: false,
    drain: false,
    draft: false,
    destroy: false,
    utiRoom: false,
    securityWindow: false,
    noise: false,
    loan: false,
    cctv: false,
    hill: false,
    mart: false,
    hospital: false,
    accessibility: false,
    park: false,
    extramemo: false,
    option: false,
  },
});

export const toastVisible = atom({ key: 'toastvisible', default: false });
export const searchState = atom({ key: 'searchstate', default: false });
export const searchConsult = atom({ key: 'searchconsult', default: [] });
export const searchWait = atom({ key: 'searchwait', default: [] });
export const searchAnswered = atom({ key: 'searchanswered', default: [] });

export const FstCloseModal = atom({ key: 'fstclosemodal', default: false });

export const modalIdData = atom({ key: 'modaliddata', default: '' });

export const NfsToast = atom({ key: 'nfstoast', default: false });
export const nfsRoadEssentialState = atom({ key: 'nfsroadessentialstate', default: false });
export const nfsDetailEssentialState = atom({ key: 'nfsdetailessentialstate', default: false });
export const nfsImgEssentialState = atom({ key: 'nfsimgessentialstate', default: false });
