import React from 'react';
import './mypage_detail.css';

const Mypage_detail = () => {
  return (
    <div className="mypage-container">
      <div className="profile-section">
        <div className="location">도봉구</div>
        <div className="user-name">홍길동님</div>
        <button className="edit-button">프로필 편집</button>
      </div>

      <div className="balance-section">
        <div className="balance-top">
          <span className="label">소분페이</span>
          <span className="amount">17,400원</span>
        </div>
        <div className="balance-buttons">
          <button className="charge">충전하기</button>
          <button className="withdraw">돈 꺼내기</button>
        </div>
      </div>

      <div className="menu-section">
        <ul>
          <li>찜 목록</li>
          <li>생성 내역</li>
          <li>참여 내역</li>
          <li>나의 후기</li>
          <li>최근 본 모임</li>
        </ul>
        <hr />
        <ul>
          <li>이체하기</li>
          <li>이체내역</li>
          <li>구매비용 계산기</li>
          <li>키워드 알림 설정</li>
        </ul>
      </div>
    </div>
  );
};

export default Mypage_detail;
