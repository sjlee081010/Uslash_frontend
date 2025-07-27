import './myPage.css';

function Mypage() {
    return(
    <div class="container">
    <header className="header">
      <div className="profile">
        <div className="profile-info">
          <div className="profile-name">홍길동<span>님</span></div>
          <div className="keywords-title">가장 좋아하는 키워드</div>
          <div className="keywords">
            <div className="keyword">코스트코</div>
            <div className="keyword">계란 소분</div>
            <div className="keyword">스낵류</div>
          </div>
        </div>
        <div className="profile-picture">
          <img src="https://placehold.co/79x79" alt="프로필 사진" />
          <div className="camera-icon">
          </div>
        </div>
      </div>
    </header>

    <main className="main-content">
      <div className="card">
        <div className="card-header">
          <div className="card-title">소분페이</div>
          <div className="card-amount">17,400원</div>
        </div>
        <div className="card-actions">
          <div className="button">충전하기</div>
          <div className="button">돈 꺼내기</div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-item">
          <span>나의 모임 내역</span>
          <div className="arrow-icon"></div>
        </div>
        <div className="menu-item">
          <span>내 찜 목록</span>
          <div className="arrow-icon"></div>
        </div>
        <div className="menu-item">
          <span>나의 모임 참여 후기</span>
          <div className="arrow-icon"></div>
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-item">
          <span>이체하기</span>
          <div className="arrow-icon"></div>
        </div>
        <div className="menu-item">
          <span>이체내역</span>
          <div className="arrow-icon"></div>
        </div>
        <div className="menu-item">
          <span>구매비용 계산기</span>
          <div className="arrow-icon"></div>
        </div>
      </div>
    </main>
  </div>
  )
}

export default Mypage