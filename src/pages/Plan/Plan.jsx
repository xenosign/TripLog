import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PlanList from '../../components/Plan/PlanList';
import SelectList from '../../components/Plan/SelectList';
import styled from 'styled-components';

import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Welcome from './Welcome';
import { addPlanItems } from '../../store/modules/triplog';
import { useDispatch, useSelector } from 'react-redux';

const { kakao } = window;

export default function Plan({}) {
  const params = useParams();
  const areaCode = params.areaCode;

  const dispatch = useDispatch();
  const state = useSelector((state) => state.triplog);

  // data 받아오기
  useEffect(() => {
    axios
      .get(
        `https://apis.data.go.kr/B551011/KorService/areaBasedList?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=498&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&contentTypeId=12&areaCode=${areaCode}`
      )
      .then((response) => {
        setProductItems(response.data.response.body.items.item);
      });
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // * 지도
  // 검색한 여행지 저장을 위한 State
  const [search, setSearch] = useState([]);

  // input에 입력한 값
  const inputRef = useRef();

  // 클릭 한 여행지 저장을 위한 State
  const [list, setList] = useState([]);

  const [productItems, setProductItems] = useState([]); //받아온데이터 담기
  const [planItems, setPlanItems] = useState([]);
  let [itemData] = [productItems];

  const saveToLocalStorage = () => {
    localStorage.setItem('planState', JSON.stringify(planItems));
  };

  const addPlanItem = (e) => {
    const clickItem = itemData.find(
      (item) => item.sigungucode === e.target.dataset.productid
    );
    console.log('clickItem', clickItem);
    console.log('productItems', productItems);
    // const currentItem = productItems[idx];
    // const newPlanitem = [];
    // setPlanItems(clickItem);
  };
  // if(!clickItem)

  return (
    <>
      <Nav />
      <Welcome />

      <Modal
        show={show}
        onHide={() => {
          handleClose();
        }}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title> 🍊</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="col-sm-10 col-md- overflow-auto m-auto">
            <Row className="d-flex justify-content-center">
              {/* <Col md={4} className='d-flex m-3 '>
            <p className='fw-6 fs-5 fw-bold me-2'>제주 여행 🍊</p>
          </Col> */}
              <Col
                md={{ span: 4, offset: 2 }}
                className="text-end d-block "
              ></Col>
            </Row>

            {/* 여행지 검색 기능 */}
            <Row className="m-auto py-4">
              <form action="">
                <InputText type="text" placeholder="입력" ref={inputRef} />
                <button
                  type="button"
                  onClick={() => {
                    // input에 입력한 값 useRef
                    const text = inputRef.current.value;
                    console.log(text);
                    // 데이터 요청
                    axios
                      .get(
                        `https://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&areaCode=39&keyword=${text}`
                      )
                      .then((결과) => {
                        console.log(search);
                        // 재 검색 마다 search 값을 삭제 시켜줌
                        search.splice(0, search.length);
                        let copy = [
                          ...search,
                          ...결과.data.response.body.items.item,
                        ];
                        setSearch(copy);
                      })
                      .catch(() => {
                        console.log('실패');
                      });
                  }}
                >
                  검색
                </button>
              </form>

              <div>
                {
                  // search의 map
                  search.map(function (a, i) {
                    return (
                      <>
                        {/* 검색결과나오는 UI컴포넌트 추가필요, 데이터 props받아야하나? */}
                        <Card
                          className="d-inline-block m-auto"
                          style={{ width: '9rem', border: 'none' }}
                          // data-productid={contentid}
                          onClick={() => {
                            // copy 를 사용하지 않고 선택된 장소의 정보만 전달 하도록 수정
                            const pickedPlace = {
                              title: a.title,
                              mapx: parseFloat(a.mapx),
                              mapy: parseFloat(a.mapy),
                            };
                            dispatch(
                              addPlanItems({
                                pickedPlace,
                                idx: state.planDateIdx,
                              })
                            );
                          }}
                          key={i}
                        >
                          <Card.Img variant="top" src={a.firstimage} />
                          <Card.Body>
                            <Card.Title
                              style={{ fontSize: '12px' }}
                              className="m-0 p-0 text-center"
                            >
                              {a.title}
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </>
                    );
                  })
                }
              </div>
            </Row>

            {/* 여행지 리스트 보여주기 */}

            <Row
              className="m-3 overflow-scroll"
              style={{ height: '20rem' }}
              gap={3}
            >
              {productItems.length > 0 ? (
                <SelectList
                  productItems={productItems}
                  setPlanItems={setPlanItems}
                  planItems={planItems}
                  search={search}
                  setSearch={setSearch}
                />
              ) : (
                <div>잠시만요!🏖</div>
              )}
            </Row>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            // tetz 이제 list 를 초기화 해줄 필요가 없기 때문에 setList([]) 삭제
            onClick={() => {
              handleClose();
            }}
          >
            닫기
          </Button>

          <Button
            variant="success"
            // tetz 이제 list 를 초기화 해줄 필요가 없기 때문에 setList([]) 삭제
            onClick={() => {
              handleClose();
            }}
          >
            선택 완료
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 여행계획 짜는 컴포넌트 */}
      <Container className="d-flex">
        <PlanList
          productItems={productItems}
          setPlanItems={setPlanItems}
          planItems={planItems}
          onClick={handleShow}
        />
      </Container>
      <Footer />
    </>
  );
}

// style-components
const PlanCard = styled.div`
  font-family: 'Inter';
  flex-wrap: wrap;
`;
const Title = styled.p`
  font: 2rem/1 'Inter';
`;
const InputText = styled.input`
  width: 200px;
  height: 50px;
`;
