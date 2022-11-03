import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Carousel,
} from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

const Slogan = styled.h2`
  position: absolute;
  left: 50%;
  top: 400px;
  scale: 5;
  color: white;
`;

const Empty = styled.div`
  height: 1000px;
`;

export default function Main() {
  const navigator = useNavigate();
  const wrap = useRef();
  const slide = useRef();
  const empty = useRef();

  window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    if (window.scrollY >= 2500) {
      wrap.current.style.display = 'block';
      slide.current.style.display = 'none';
      empty.current.style.display = 'none';
    }

    if (window.scrollY >= 2600) {
      slide.current.style.display = 'none';
      empty.current.style.display = 'none';
    }
  });

  useLayoutEffect(() => {
    wrap.current.style.display = 'none';

    // const ctx = gsap.context(() => {
    //   gsap.to('#slogan', {
    //     duration: 4,
    //     scale: 10,
    //     rotate: 360,
    //   });
    // });
    const slide = gsap.timeline();
    slide.to('#slogan', {
      scale: 10,
      rotate: 360,
    });
    ScrollTrigger.create({
      animation: slide,
      trigger: '#slide',
      start: 'top top',
      end: '+=3000 bottom',
      scrub: true,
      markers: true,
      pin: true,
    });
  });

  return (
    <>
      <section id="slide" ref={slide}>
        <Image src="/images/mainBeach.jpg" fluid />
        <Slogan id="slogan">Triplog</Slogan>
      </section>
      <Empty ref={empty} />
      <wrap id="wrap" ref={wrap}>
        <Nav id="nav" />
        <Container>
          <h1 className="fw-bold lh-base mt-5 mb-5">
            Trip님,<br></br>환영합니다!
          </h1>

          <div className="d-flex justify-content-center col-8 mx-auto mb-4">
            <Button
              variant="dark mx-2 col-5"
              onClick={() => {
                navigator('/budget');
              }}
            >
              💸 가계부
            </Button>
            <Button
              variant="dark col-5"
              onClick={() => {
                navigator('/checklist');
              }}
            >
              📝 여행체크리스트
            </Button>
          </div>

          <Row className="d-flex col-8 mx-auto text-center">
            <Col
              onClick={() => {
                navigator('/submain/1');
              }}
            >
              <p className="fs-2 mb-1">🌆</p>
              <p className="fw-bold">서울</p>
            </Col>
            <Col
              onClick={() => {
                navigator('/submain/6');
              }}
            >
              <p className="fs-2 mb-1">🌅 </p>
              <p className="fw-bold">부산</p>
            </Col>
            <Col
              onClick={() => {
                navigator('/lists/32');
              }}
            >
              <p className="fs-2 mb-1">🌄</p>
              <p className="fw-bold">강원</p>
            </Col>
            <Col
              onClick={() => {
                navigator('/lists/35');
              }}
            >
              <p className="fs-2 mb-1">🎢</p>
              <p className="fw-bold">경주</p>
            </Col>
            <Col
              onClick={() => {
                navigator('/lists/37');
              }}
            >
              <p className="fs-2 mb-1">🍚</p>
              <p className="fw-bold">전주</p>
            </Col>
            <Col
              onClick={() => {
                navigator('/lists/39');
              }}
            >
              <p className="fs-2 mb-1">🍊</p>
              <p className="fw-bold">제주</p>
            </Col>
          </Row>

          <Row xs={2} md={2} lg={4} className="g-4 mt-5">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col>
                <Card>
                  <Card.Img variant="top" src="/images/mainCard.jpg" />
                  <Card.Body>
                    <Card.Text className="fw-bold">홍보 Card 제목 ✨</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="d-flex justify-content-center">
            <Image src="/images/gridImg.jpg" />
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="dark col-6"> 공지사항</Button>
            <Button variant="primary col-6">쿠폰 및 이벤트</Button>
          </div>

          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/mountain.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h5>First slide label</h5>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/mainImg.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="./images/sea.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h5>Third slide label</h5>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
        <Footer />
      </wrap>
    </>
  );
}
