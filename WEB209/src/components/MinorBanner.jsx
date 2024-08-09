import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import '../assets/css/style.css';
import { useEffect } from 'react';

const MinorBanner = () => {
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.mySwiper', {
      speed: 750,
      rewind: true, 
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: true,
      autoplay: {
      delay: 2000,
    },
    });
    

  },[]);
  return (
    <>
    <div className="swiper mySwiper swiper-initialized swiper-horizontal swiper-backface-hidden">
      <div
        className="swiper-wrapper"
        id="swiper-wrapper-6a4e8326a735fedc"
        aria-live="off"
      >
        <div className="swiper-slide">
          <img src="/src/assets/images/bannerto1.jpg" alt="" />
          <a href="" />
        </div>
        <div className="swiper-slide">
          <img src="/src/assets/images/bannerto2.jpg" alt="" />
          <a href="" />
        </div>
        <div className="swiper-slide">
          <img src="/src/assets/images/bannerto3.jpeg" alt="" />
          <a href="" />
        </div>
      </div>
      {/* swiper-pagination */}
      <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal swiper-pagination-lock">
        <span
          className="swiper-pagination-bullet swiper-pagination-bullet-active"
          tabIndex={0}
          role="button"
          aria-label="Go to slide 1"
          aria-current="true"
        />
      </div>
      {/* next-previous */}
      <div
        className="swiper-button-next swiper-button-lock"
        tabIndex={0}
        role="button"
        aria-label="Next slide"
        aria-controls="swiper-wrapper-6a4e8326a735fedc"
      />
      <div
        className="swiper-button-prev swiper-button-lock"
        tabIndex={0}
        role="button"
        aria-label="Previous slide"
        aria-controls="swiper-wrapper-6a4e8326a735fedc"
      />
      <span
        className="swiper-notification"
        aria-live="assertive"
        aria-atomic="true"
      />
    </div>
    <div className="minorbanner">
      <div className="minorbannerbody">
        <div className="minorbannercontent">
          <a href="">
            <img
              src="/src/assets/images/Banner Âm thanh.png"
              alt=""
              style={{ objectFit: "cover", width: "100%" }}
              height={168}
            />
          </a>
          <a href="">
            <img
              src="/src/assets/images/Banner TCDM.png"
              alt=""
              style={{ objectFit: "cover", width: "100%" }}
              height={168}
            />
          </a>
          <a href="">
            <img
              src="/src/assets/images/387x166 1.png"
              alt=""
              style={{ objectFit: "cover", width: "100%" }}
              height={168}
            />
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

export default MinorBanner