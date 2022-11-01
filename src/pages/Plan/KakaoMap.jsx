/* global kakao */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SelectList from '../../components/Plan/SelectList';
import { useSelector } from 'react-redux';

export default function KakaoMap(props) {
  const state = useSelector((state) => state.triplog);

  // Kakao Map 사용을 위한 useEffect
  useEffect(() => {
    // tetz 각각의 카카오 지도는 서로 다른 id 를 가져야 하므로 props 로 전달 받은 idx 값을 부여
    const container = document.getElementById(`map${props.idx}`);
    // 기본이 되는 지도 중앙 위치
    const options = {
      center: new kakao.maps.LatLng(33.4, 126.5),
      // 지도 레벨(높을 수록 멀어진다)
      level: 5,
    };
    // 지도 생성을 위한 메소드
    const map = new kakao.maps.Map(container, options);

    // tetz 지도가 2개 이상 호출 되면 layout 를 새롭게 잡아줘야함
    // 카카오 권장 사항
    map.relayout();

    // 선택한 list에 대한 forEach
    if (state.planItems[props.idx]) {
      state.planItems[props.idx].forEach((el, num, arr) => {
        // 지도에 생성할 마커
        new kakao.maps.Marker({
          //마커가 표시 될 지도
          map: map,
          //마커가 표시 될 위치
          position: new kakao.maps.LatLng(el.mapy, el.mapx),
        });
        // path 를 주기 위해서 리스트에 저장 된 공간의 좌표를 pathArr 라는 배열에 푸쉬
        let pathArr = [];
        for (let i = 0; i < state.planItems[props.idx].length; i++) {
          pathArr.push(new kakao.maps.LatLng(arr[i].mapy, arr[i].mapx));
        }
        // 선을 긋기 위한 메소드
        const polyline = new kakao.maps.Polyline({
          // 지도생성
          map: map,
          // path의 배열
          path: pathArr,
          // 선을 굵기
          strokeWeight: 3,
          // 선의 색
          strokeColor: '#34A853',
          // 선의 불투명도
          strokeOpacity: 1,
          // 선의 스타일
          strokeStyle: 'solid',
        });

        // 선 생성
        polyline.setMap(map);
        // 선의 배열
        polyline.getPath();
        // 선의 길의 계산
        polyline.getLength();
      });
    }
    // list가 변경 될 때 마다 실행
  }, [state.planItems[props.idx]]);

  return (
    <>
      {/* tetz 각각의 카카오 지도는 서로 다른 id 를 가져야 하므로 props 로 전달 받은 idx 값을 부여 */}
      <KakaoDiv id={`map${props.idx}`}></KakaoDiv>
      <FlexDiv>
        {/* <RowDiv>
        <h1>선택한 여행지</h1>
        {
          // list의 map
          list.map(function (a, i) {
            return (
              <>
                <p>{i + 1}. 여행지 = {a.title}</p>
                <button onClick={() => {
                  let copy = [...list]
                  // 선택한 데이터를 삭제
                  copy.splice(i, 1)
                  setList(copy)
                }}>X</button>
              </>
            )
          })
        }
      </RowDiv> */}
        <RowDiv>
          {/* <form action="">
            <InputText type="text" placeholder='입력' ref={inputRef}/>
            <button type='button' onClick={() => {
              // input에 입력한 값 useRef
              const text = (inputRef.current.value)
              console.log(text)
              // 데이터 요청
              axios.get(`https://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=rfaoGpiapHFqOcUT6bqfERRxy1WVxzOdOpEC3ChyAFPEfONdSMdRVNETTJKRhqTbPuZ2krpG2mQJMXDbyG74RA%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TripLog&_type=json&listYN=Y&arrange=B&areaCode=39&keyword=${text}`)
              .then((결과) => {
                console.log(search)
                // 재 검색 마다 search 값을 삭제 시켜줌
                search.splice(0, search.length)
                let copy = [...search, ...결과.data.response.body.items.item];
                setSearch(copy);
              })
              .catch(() => {
                console.log('실패')
              })
            }}>검색</button>
          </form> */}
          {/* <div>
            {
              // search의 map
              search.map(function (a, i) {
                return (
                  <>
                    <p onClick={() => {
                      let copy = [...list, { title: a.title, mapx: parseFloat(a.mapx), mapy: parseFloat(a.mapy) }];
                      setList(copy);
                    }} key={i}>{a.title}</p>
                  </>
                )
              })
            }
          </div> */}
        </RowDiv>
      </FlexDiv>
    </>
  );
}

const FlexDiv = styled.div`
  display: flex;
`;
const KakaoDiv = styled.div`
  width: 25rem;
  height: 20rem;
`;
const InputText = styled.input`
  width: 200px;
  height: 50px;
`;
const RowDiv = styled.div`
  border: 1px solid black;
  width: 300px;
`;
