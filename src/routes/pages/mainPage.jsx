import './main.css'
import logo from '../../assets/logo.png'
import { useRef } from 'react';
import { useEffect } from 'react';
import colors from '../../styles/color';
import { useNavigate } from 'react-router-dom';

const daysKor = ['일', '월', '화', '수', '목', '금', '토'];

function MainPage() {
  const today = new Date();
  const scrollContainerRef = useRef(null);

  // 월요일 기준 주 시작일 계산
  const getMonday = (date) => {
    const copied = new Date(date);
    const day = copied.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    copied.setDate(copied.getDate() + diff);
    return copied;
  };

  const monday = getMonday(today);

  // 월~일 날짜 배열 생성
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

  // 컴포넌트 마운트 시 스크롤을 왼쪽으로 이동
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
    
  }, []);

  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div id="container">
        <div className="title">
          <p className='semibold'>가장 최근에 올라온 모임</p>
          <p className='medium'>빠르게 원하는 제품을 확인하고 모임에 참여하세요.</p>
        </div>
        <div className="images">

        </div>
        <div className="schedule">

        </div>
        <div className="title">
          <p className="semibold">이번주 모임 일정</p>
          <p className="medium">이번주 모임일정을 빠르게 확인하세요.</p>
        </div>
        <div
          style={{
            display: 'inline-flex',
            gap: '12px'
          }}
        >
          {weekDates.map((day, idx) => (
            <div
              key={idx}
              style={{
                minWidth: '40px',
                height: '59px',
                boxShadow: '0px 0px 7px 0px rgba(0, 0, 0, 0.08)',
                borderRadius: '10px',
                textAlign: 'center',
                boxSizing: 'border-box',
                padding: '5.5px 12px',
                flexShrink: 0
              }}
            >
              <div className="flex" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '15px', justifySelf: 'center', height: '48px', justifyContent: 'space-between' }}>
                <div style={{ width: '6px', height: '6px', backgroundColor: colors.pointColor, borderRadius: '50%', display: 'block'}}></div>
                <div style={{ fontSize: '13px', width: '15px', color: colors.pointColor, height: '16px', fontWeight: '700' }}>{day.dayName}</div>
                <div style={{ fontSize: '12px', color: colors.pointColor, fontWeight: '700' }}>{`${day.dayNum}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MainPage