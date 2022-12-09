/*global kakao*/
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../../global/global.css';
import searchImg from './sources/Search.png';
import pathDown from './sources/path_down.png';
import pathUp from './sources/path_up.png';
import WriteIcon from '../../global/sources/Edit.svg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SearchFstMain } from '../../api/apiGET';
import CaroselImages from './sources/caroselImage.png';
import Marker_All from '../../global/sources/Pin_all.svg';
import Marker_FootStep from '../../global/sources/Pin_Footstep.svg';
import Marker_request from '../../global/sources/Pin_Request.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper';
import { nfsData, nfsImgData, nfsPreviewImgData, nfsrPath, nfsImgState, nfsRoadAddress, nfsDetailAddress, FstCloseModal, FullFstCloseModal, NfsToast } from '../../store/store';
import { useSetRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import BottomSheet from './BottomSheet';
import FullBottomSheet from './FullBottomSheet';
import { useRecoilState } from 'recoil';
import Toast from '../newFootStep/ToastNotification';

export default function FootstepMainArticle() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [fstData, setFstData] = useState();
  const [sortName, setSortName] = useState('전체');
  const [sortState, setSortState] = useState(true);
  const setNfshData = useSetRecoilState(nfsData);
  const setNfshImgData = useSetRecoilState(nfsImgData);
  const setNfshPreviewImgData = useSetRecoilState(nfsPreviewImgData);
  const setNfshrPath = useSetRecoilState(nfsrPath);
  const setNfshImgState = useSetRecoilState(nfsImgState);
  const setNfshRoadAddress = useSetRecoilState(nfsRoadAddress);
  const setNfshDetailAddress = useSetRecoilState(nfsDetailAddress);
  const [modalOverLab, setModalOverLab] = useState();
  const [modalId, setModalId] = useState();
  const [visible, setVisible] = useState(false);
  const [ToastState, setToastState] = useRecoilState(NfsToast);
  const [levelValue, setLevelValue] = useState(2);
  const [search, setSearch] = useState('');

  const { data: searchData, mutate: searchMutate } = useMutation([], SearchFstMain, {
    onSuccess: (response) => {},
    onError: (response) => {},
  });

  useEffect(() => {
    searchMutate('');
  }, []);

  const onSortList = () => {
    setSortState(false);
  };
  const onSorting = (sort) => {
    if (sort === '상담') {
      setSortName(sort);
      setSortState(true);
    }
    if (sort === '발품') {
      setSortName(sort);
      setSortState(true);
    }
    if (sort === '전체') {
      setSortName(sort);
      setSortState(true);
    }
  };
  const onSortHeadline = () => {
    if (sortName === '상담') {
      setSortName('상담');
      setSortState(true);
    }
    if (sortName === '발품') {
      setSortName('발품');
      setSortState(true);
    }
    if (sortName === '전체') {
      setSortName('전체');
      setSortState(true);
    }
  };
  let positions = [];
  let footstepData = [];
  let requestData = [];

  if (searchData !== undefined && searchData.length !== 0) {
    if (sortName === '전체') {
      positions = searchData.map((data) => {
        return { overLab: data.overLab, id: data.id, LatLng: new kakao.maps.LatLng(data.coordX, data.coordY) };
      });
    } else if (sortName === '발품') {
      for (let i = 0; i < searchData.length; i++) {
        if (searchData[i].overLab === 1) {
          positions.push({ overLab: searchData[i].overLab, id: searchData[i].id, LatLng: new kakao.maps.LatLng(searchData[i].coordX, searchData[i].coordY) });
          footstepData.push(searchData[i]);
        }
      }
    } else if (sortName === '상담') {
      for (let i = 0; i < searchData.length; i++) {
        if (searchData[i].overLab === 2) {
          positions.push({ overLab: searchData[i].overLab, id: searchData[i].id, LatLng: new kakao.maps.LatLng(searchData[i].coordX, searchData[i].coordY) });
          requestData.push(searchData[i]);
        }
      }
    }
  }

  const onLevelClick = (value) => {
    if (value === '+' && levelValue > 1) {
      setLevelValue(levelValue - 1);
    }
    if (value === '-' && levelValue < 14) {
      setLevelValue(levelValue + 1);
    }
  };

  useEffect(() => {
    if (ToastState) {
      setTimeout(() => setToastState(false), 1000);
    }

    const container = document.getElementById('myMap');
    let map = '';

    let ImgMarkerAll = Marker_All;
    let ImgMarkerRequest = Marker_request;
    let ImgMarkerFootstep = Marker_FootStep;

    if (searchData !== undefined) {
      let options = {};
      if (sortName === '전체' && searchData?.length !== 0) {
        setVisible(true);

        options = {
          center: new window.kakao.maps.LatLng(searchData[0]?.coordX, searchData[0]?.coordY),
          level: levelValue,
        };
      } else if (sortName === '발품' && footstepData.length !== 0) {
        setVisible(true);
        options = {
          center: new window.kakao.maps.LatLng(footstepData[0].coordX, footstepData[0].coordY),
          level: levelValue,
        };
      } else if (sortName === '상담' && requestData.length !== 0) {
        setVisible(true);
        options = {
          center: new window.kakao.maps.LatLng(requestData[0].coordX, requestData[0].coordY),
          level: levelValue,
        };
      } else {
        setVisible(false);
        options = {
          center: new window.kakao.maps.LatLng(37.497928, 127.027583),
          level: levelValue,
        };
      }

      map = new window.kakao.maps.Map(container, options);
      for (let i = 0; i < positions.length; i++) {
        let imageSize = new kakao.maps.Size(60, 70);
        let MarkerImg;
        if (positions[i].overLab === 1) {
          MarkerImg = new kakao.maps.MarkerImage(ImgMarkerFootstep, imageSize);
        } else if (positions[i].overLab === 2) {
          MarkerImg = new kakao.maps.MarkerImage(ImgMarkerRequest, imageSize);
        } else if (positions[i].overLab === 3) {
          MarkerImg = new kakao.maps.MarkerImage(ImgMarkerAll, imageSize);
        }

        let marker = new kakao.maps.Marker({
          map: map,
          position: positions[i].LatLng,
          image: MarkerImg,
        });

        let overlay = new kakao.maps.CustomOverlay({
          yAnchor: 1.5,
          position: marker.getPosition(),
        });

        let content = document.createElement('div');
        overlay.setContent(content);

        kakao.maps.event.addListener(marker, 'click', function () {
          onOpenModal();
          setModalOverLab(positions[i].overLab);
          setModalId(positions[i].id);
        });
      }
    }
  }, [searchData, sortName, ToastState, levelValue]);

  const onNewFootStep = () => {
    setNfshRoadAddress('도로명 주소 검색');
    setNfshDetailAddress('');
    setNfshData({
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
    });
    setNfshImgData([]);
    setNfshPreviewImgData([]);
    setNfshrPath({
      basic: false,
      sun: false,
      option: false,
      security: false,
      conven: false,
    });
    setNfshImgState({
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
    });
    navigate('/newfootstep');
  };

  const onContentNavigate = (overLab, id) => {
    if (overLab === 1 || overLab === 3) {
      navigate(`${id}`);
    }
    if (overLab === 2) {
      navigate(`/myconsultdetail/${id}`);
    }
  };
  const [modalOpen, setModalOpen] = useRecoilState(FstCloseModal);
  const onOpenModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => {
    setModalOpen(false);
    navigate('/footstepmain');
  };

  const [FbmodalOpen, setFbModalOpen] = useRecoilState(FullFstCloseModal);
  const onFbOpenModal = () => {
    setFbModalOpen(true);
  };
  const onFbCloseModal = () => {
    setFbModalOpen(false);
    navigate('/footstepmain');
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSearchBtn = () => {
    searchMutate(search);
  };
  return (
    <>
      <FootstepMainArticleContainer>
        {ToastState && <Toast msg="추가 완료" />}
        {modalOpen && <BottomSheet modalOverLab={modalOverLab} modalId={modalId} visible={onOpenModal} maskCloseable={true} closeable={true} onClose={onCloseModal} />}
        {FbmodalOpen && <FullBottomSheet sortName={sortName} searchData={searchData} requestData={requestData} footStepData={footstepData} Fbvisible={onFbOpenModal} FbmaskCloseable={true} Fbcloseable={true} FbonClose={onFbCloseModal} />}

        <MapContainer id="myMap" />
        <AddressSearchBox>
          <AddressSearchInput placeholder="주소로 기록을 검색해보세요" onChange={onChangeSearch} />
          <SearchImg
            src={searchImg}
            onClick={() => {
              onSearchBtn();
            }}
          />
        </AddressSearchBox>
        <ListBtn
          onClick={() => {
            onFbOpenModal();
          }}
        >
          목록
        </ListBtn>
        {sortState === false ? (
          <SortList>
            <SortHeadlineBox
              onClick={() => {
                onSortHeadline();
              }}
            >
              <SortHeadline>{sortName}</SortHeadline>
              <SortingImg src={pathUp} />
            </SortHeadlineBox>
            <SortRequest
              onClick={() => {
                onSorting('상담');
              }}
            >
              상담
            </SortRequest>
            <SortNfs
              onClick={() => {
                onSorting('발품');
              }}
            >
              발품기록
            </SortNfs>
            <SortAll
              onClick={() => {
                onSorting('전체');
              }}
            >
              전체
            </SortAll>
          </SortList>
        ) : (
          <SortBox
            onClick={() => {
              onSortList();
            }}
          >
            <SortName>{sortName}</SortName>
            <SortImg src={pathDown} />
          </SortBox>
        )}

        <WriteBox>
          <WriteBtn
            visible={visible}
            onClick={() => {
              onNewFootStep();
            }}
          >
            <WriteImg src={WriteIcon} />
          </WriteBtn>
          <CarouselWrap visible={visible}>
            <Swiper
              slidesPerView={1}
              spaceBetween={-30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {sortName === '전체'
                ? searchData?.map((data) => {
                    return (
                      <CarouselLi>
                        <SwiperSlide
                          onClick={() => {
                            onContentNavigate(data.overLab, data.id);
                          }}
                        >
                          <CarouselBox>
                            <CarouselImage src={CaroselImages} />
                            <CarouselRightBox>
                              <CarouselHeaderBox>
                                {data.overLab === 1 ? <CarouselMarkerImg src={Marker_FootStep} /> : data.overLab === 2 ? <CarouselMarkerImg src={Marker_request} /> : data.overLab === 3 ? <CarouselMarkerImg src={Marker_All} /> : null}
                                {data.overLab === 1 ? <CarouselHeaderP>발품기록</CarouselHeaderP> : data.overLab === 2 ? <CarouselHeaderP>상담</CarouselHeaderP> : data.overLab === 3 ? <CarouselHeaderP>발품기록 | 상담</CarouselHeaderP> : null}
                              </CarouselHeaderBox>
                              <CarouselAddress>{data !== undefined && data.length !== '0' ? data.title : null}</CarouselAddress>
                              <CarouselReview>{data !== undefined && data.length !== '0' ? data.review : null}</CarouselReview>
                            </CarouselRightBox>
                          </CarouselBox>
                        </SwiperSlide>
                      </CarouselLi>
                    );
                  })
                : sortName === '발품'
                ? footstepData?.map((data) => {
                    return (
                      <CarouselLi>
                        <SwiperSlide
                          onClick={() => {
                            onContentNavigate(data.overLab, data.id);
                          }}
                        >
                          <CarouselBox>
                            <CarouselImage src={CaroselImages} />
                            <CarouselRightBox>
                              <CarouselHeaderBox>
                                <CarouselMarkerImg src={Marker_FootStep} />
                                <CarouselHeaderP>발품기록</CarouselHeaderP>
                              </CarouselHeaderBox>
                              <CarouselAddress>{data !== undefined && data.length !== '0' ? data.title : null}</CarouselAddress>
                              <CarouselReview>{data !== undefined && data.length !== '0' ? data.review : null}</CarouselReview>
                            </CarouselRightBox>
                          </CarouselBox>
                        </SwiperSlide>
                      </CarouselLi>
                    );
                  })
                : sortName === '상담'
                ? requestData?.map((data) => {
                    return (
                      <CarouselLi>
                        <SwiperSlide
                          onClick={() => {
                            onContentNavigate(data.overLab, data.id);
                          }}
                        >
                          <CarouselBox>
                            <CarouselImage src={CaroselImages} />
                            <CarouselRightBox>
                              <CarouselHeaderBox>
                                <CarouselMarkerImg src={Marker_request} />
                                <CarouselHeaderP>상담</CarouselHeaderP>
                              </CarouselHeaderBox>
                              <CarouselAddress>{data !== undefined && data.length !== '0' ? data.title : null}</CarouselAddress>
                              <CarouselReview>{data !== undefined && data.length !== '0' ? data.review : null}</CarouselReview>
                            </CarouselRightBox>
                          </CarouselBox>
                        </SwiperSlide>
                      </CarouselLi>
                    );
                  })
                : null}
            </Swiper>
          </CarouselWrap>
          <LevelBar visible={visible}>
            <LevelPlus
              onClick={() => {
                onLevelClick('+');
              }}
            >
              +
            </LevelPlus>
            <LevelBr />
            <LevelMinus
              onClick={() => {
                onLevelClick('-');
              }}
            >
              -
            </LevelMinus>
          </LevelBar>
        </WriteBox>
      </FootstepMainArticleContainer>
    </>
  );
}

const LevelBar = styled.div`
  width: 40px;
  height: 65px;
  position: absolute;
  background: white;
  margin-left: 305px;
  margin-bottom: ${(props) => (props.visible ? '315px' : '180px')};
  border: 1px solid var(--gray5);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const LevelPlus = styled.div`
  width: 12px;
  height: 20px;
  margin-left: 14px;
  margin-top: 8px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  color: var(--gray3);
  cursor: pointer;
`;

const LevelMinus = styled.div`
  width: 9px;
  height: 20px;
  margin-left: 15.5px;
  margin-top: 4px;
  font-family: var(--headline-font-family);
  font-size: var(--headline_Small-font-size);
  font-weight: var(--headline_Small-font-weight);
  line-height: var(--headline_Small-line-height);
  letter-spacing: var(--headline_Small-letter-spacing);
  color: var(--gray3);
  cursor: pointer;
`;

const LevelBr = styled.div`
  width: 16px;
  height: 1px;
  margin-left: 12px;
  margin-top: 4px;
  background: #d9d9d9;
`;

const CarouselBox = styled.div`
  width: 308px;
  height: 120px;
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--Shadow2-box-shadow);
  margin-left: 16px;
  -webkit-user-drag: none;
  cursor: pointer;
`;

const CarouselImage = styled.img`
  width: 84px;
  height: 84px;
  margin-top: 18px;
  margin-left: 16px;
`;
const CarouselRightBox = styled.div`
  margin-left: 12px;
  margin-top: 16px;
`;

const CarouselHeaderBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const CarouselMarkerImg = styled.img`
  width: 24px;
  height: 24px;
`;

const CarouselHeaderP = styled.div`
  margin-left: 8px;
  margin-top: 4px;
  color: #3fb00a;
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
`;

const CarouselAddress = styled.div`
  width: 180px;
  margin-top: 4px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
`;

const CarouselReview = styled.div`
  margin-top: 4px;
  color: var(--gray4);
  font-family: var(--body-font-family);
  font-size: var(--body_Small-font-size);
  font-weight: var(--body_Small-font-weight);
  line-height: var(--body_Small-line-height);
  letter-spacing: var(--body_Small-letter-spacing);
`;

const FootstepMainArticleContainer = styled.div`
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MapContainer = styled.div`
  width: 360px;
  height: 100%;
  background: white;
  z-index: 0;
  margin-top: auto;
`;

const AddressSearchBox = styled.div`
  position: absolute;
  width: 256px;
  height: 48px;
  background-color: white;
  margin-left: 16px;
  margin-top: 24px;
  border: 1px solid var(--primary1-400);
  border-radius: 8px;
  box-shadow: var(--Shadow1-box-shadow);
`;

const AddressSearchInput = styled.input`
  position: absolute;
  width: 180px;
  height: 16px;
  margin-left: 20px;
  margin-top: 16px;
  border: none;
  outline: none;
`;

const SearchImg = styled.img`
  margin-left: 212px;
  margin-top: 13px;
  cursor: pointer;
`;

const ListBtn = styled.div`
  position: absolute;
  width: 57px;
  height: 48px;
  margin-left: 288px;
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: var(--Shadow2-box-shadow);
  background-color: var(--primary1-400);
  font-family: var(--button-font-family);
  font-size: var(--button_Medium-font-size);
  font-weight: var(--button_Medium-font-weight);
  line-height: var(--button_Medium-line-height);
  letter-spacing: var(--button_Medium-letter-spacing);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SortBox = styled.div`
  position: absolute;
  width: 70px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid var(--gray5);
  border-radius: 8px;
  margin-top: 80px;
  margin-left: 16px;
  cursor: pointer;
`;

const SortName = styled.div`
  font-family: var(--button-font-family);
  font-size: var(--button_Small-font-size);
  font-weight: var(--button_Small-font-weight);
  line-height: var(--button_Small-line-height);
  letter-spacing: var(--button_Small-letter-spacing);
  cursor: pointer;
`;

const SortList = styled.div`
  position: absolute;
  width: 70px;
  height: 135px;
  margin-top: 80px;
  margin-left: 16px;
  background-color: white;
  border: 1px solid var(--gray5);
  border-radius: 8px;
  cursor: pointer;
`;

const SortHeadlineBox = styled.div`
  width: 60px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 12px;
  margin-top: 8px;
  color: var(--gray3);
  cursor: pointer;
`;

const SortHeadline = styled.div`
  margin-top: 2px;
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;

const SortRequest = styled.div`
  width: 70px;
  height: 32px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--gray5);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;

const SortNfs = styled.div`
  width: 70px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--gray5);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;

const SortAll = styled.div`
  width: 70px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--gray5);
  font-family: var(--body-font-family);
  font-size: var(--body_Medium-font-size);
  font-weight: var(--body_Medium-font-weight);
  line-height: var(--body_Medium-line-height);
  letter-spacing: var(--body_Medium-letter-spacing);
  cursor: pointer;
`;

const SortingImg = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 4px;
`;

const SortImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
`;

const WriteBox = styled.div`
  position: absolute;
  height: 100%;
  background-color: aqua;
  display: flex;
  flex-direction: column-reverse;
`;

const WriteBtn = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  margin-left: 285px;
  margin-bottom: ${(props) => (props.visible ? '239px' : '104px')};
  display: flex;
  background-color: var(--primary2-400);
  border-radius: 8px;
  box-shadow: var(--Shadow3-box-shadow);
  cursor: pointer;
`;

const WriteImg = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 14px;
  margin-top: 14px;
`;

const CarouselWrap = styled.div`
  position: absolute;
  width: 360px;
  height: 120px;
  margin-bottom: 110px;
  overflow: hidden;
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
`;

const CarouselLi = styled.li`
  width: 308px;
  height: 120px;
  list-style: none;
  user-select: none;
  padding-right: 20px;
`;
