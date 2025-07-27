// MainPage.tsx
import './main.css';
import Logo from '../../../logo.jsx';
import { useRef, useEffect, useState } from 'react';
import colors from '../../../styles/color.js';

import large_meat from '../../../assets/large_meat.png';
import toothpaste from '../../../assets/toothpaste.png';
import homerunball from '../../../assets/homerunball.png';
import cheese from '../../../assets/cheese.png';
import capri from '../../../assets/capri.png';

import meat from '../../../assets/meat.png'
import salmon from '../../../assets/salmon.png'
import salmon2 from '../../../assets/salmon2.png'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const daysKor = ['일', '월', '화', '수', '목', '금', '토'];



function MainPage() {
  const today = new Date();
  const scrollContainerRef = useRef(null);
  const marts = ['전체', '코스트코', '이마트', '럭키마트', '하나로마트', '우영마트', '기타'];
  const categories = ['전체', '마트 종류', '육류', '과일류', '스낵류', '채소류', '생필품'];

  const [selectedMart, setSelectedMart] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const products = [
    {
      imgSrc: large_meat,
      recruit: '현재 4명 모집중',
      deadline: '2025.8.2 까지',
      title: '코스트코 소고기 다짐육 대용량 3KG',
      price: '11,750원',
      note: '소분가격 기준',
      mart: '코스트코',
      category: '육류',
    },
    {
      imgSrc: toothpaste,
      recruit: '현재 2명 모집중',
      deadline: '2025.7.12 까지',
      title: '이마트 치약세트 묶음',
      price: '2,750원',
      note: '소분가격 기준',
      mart: '이마트',
      category: '생필품',
    },
    {
      imgSrc: homerunball,
      recruit: '현재 4명 모집중',
      deadline: '2025.7.1 까지',
      title: '럭키마트 홈런볼 4묶음',
      price: '1,650원',
      note: '소분가격 기준',
      mart: '럭키마트',
      category: '스낵류',
    },
    {
      imgSrc: cheese,
      recruit: '현재 4명 모집중',
      deadline: '2025.8.2 까지',
      title: '하나로마트 피자치즈 2.5KG',
      price: '4,970원',
      note: '소분가격 기준',
      mart: '하나로마트',
      category: '육류',
    },
    {
      imgSrc: capri,
      recruit: '현재 1명 모집중',
      deadline: '2025.8.5 까지',
      title: '코스트코 카프리썬 20개입',
      price: '4,195원',
      note: '소분가격 기준',
      mart: '코스트코',
      category: '음료',
    },
  ];

  const filteredProducts = products.filter(product => {
    const martMatch = selectedMart === '전체' || product.mart === selectedMart;
    const categoryMatch =
      selectedCategory === '전체' ||
      selectedCategory === '마트 종류' ||
      product.category === selectedCategory;
    return martMatch && categoryMatch;
  });

  const getMonday = (date) => {
    const copied = new Date(date);
    const day = copied.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    copied.setDate(copied.getDate() + diff);
    return copied;
  };

  const monday = getMonday(today);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return {
      dayName: daysKor[date.getDay()],
      dayNum: date.getDate(),
      month: date.getMonth() + 1,
      isToday:
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate(),
    };
  });

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Logo />
      <div id="container">
        <div className="title">
          <p className='semibold'>가장 최근에 올라온 모임</p>
          <p className='medium'>빠르게 원하는 제품을 확인하고 모임에 참여하세요.</p>
        </div>

        <div className="title">
          <p className="semibold">이번주 모임 일정</p>
          <p className="medium">이번주 모임일정을 빠르게 확인하세요.</p>
        </div>

        <div style={{ width: '100%', overflowX: 'auto', marginBottom: '63px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {weekDates.map((day, idx) => (
              <div key={idx} style={{ minWidth: '40px', height: '59px', boxShadow: '0px 0px 7px 0px rgba(0, 0, 0, 0.08)', borderRadius: '10px', textAlign: 'center', padding: '5.5px 12px', flexShrink: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15px', height: '48px', justifyContent: 'space-between' }}>
                  <div style={{ width: '6px', height: '6px', backgroundColor: colors.pointColor, borderRadius: '50%' }} />
                  <div style={{ fontSize: '13px', color: colors.pointColor, fontWeight: '700' }}>{day.dayName}</div>
                  <div style={{ fontSize: '12px', color: colors.pointColor, fontWeight: '700' }}>{`${day.dayNum}`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="title" id="last">
          <p className="semibold">소분모임</p>
          <p className="medium">종류에 따른 모임을 확인하세요.</p>
        </div>

        <div className="sort">
          {categories.map((category, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(category)}
              className={`sort-item ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </div>
          ))}
        </div>

        <div className="marts">
          {marts.map((mart, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMart(mart)}
              className={selectedMart === mart ? 'mart-item selected' : 'mart-item'}
            >
              {mart}
            </div>
          ))}
        </div>

        <div className="mart_lists" style={{ padding: '19px 12px', borderRadius: '10px', boxShadow: '0px 0px 6px 2px rgba(0, 0, 0, 0.06)', marginBottom: '36px' }}>
          {filteredProducts.length === 0 && (
            <p style={{ textAlign: 'center', color: '#888' }}>조건에 맞는 모임이 없습니다.</p>
          )}
          {filteredProducts.map((product, idx) => (
            <div
              key={idx}
              style={{ display: 'flex', gap: '12px', marginBottom: idx === filteredProducts.length - 1 ? '0px' : '20px', alignItems: 'flex-start' }}
            >
              <img
                src={product.imgSrc}
                alt={product.title}
                style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ border: '1px solid #2DC270', borderRadius: '20px', padding: '4px 5px', fontSize: '8px', color: '#2DC270', fontWeight: '700', height: '18px' }}>{product.recruit}</div>
                  <div style={{ border: '1px solid #2DC270', borderRadius: '20px', padding: '4px 5px', fontSize: '8px', color: '#3ECC89', fontWeight: '700', height: '18px' }}>{product.deadline}</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '4px', wordBreak: 'break-word' }}>{product.title}</div>
                <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '2px' }}>{product.price}</div>
                <div style={{ fontSize: '8px', color: '#666' }}>{product.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainPage;