import React from 'react';
import Logo from '../../../logo';
import './SearchPage.css';

const SearchPage = () => {
  const tagKeywords = [
    '코스트코', '계란 소분', '스낵류', '생활용품', '하나로마트', '계란 소분',
  ];

  const rankedKeywords = [
    { rank: 1, keyword: '코스트코', trend: 'up' },
    { rank: 2, keyword: '생필품', trend: 'up' },
    { rank: 3, keyword: '계란' },
    { rank: 4, keyword: '쌀포대', trend: 'down' },
    { rank: 5, keyword: '돼지고기' },
    { rank: 6, keyword: '대용량', trend: 'down' },
    { rank: 7, keyword: '치약 세트' },
    { rank: 8, keyword: '냉동제품' },
    { rank: 9, keyword: '햇반' },
    { rank: 10, keyword: '그릇 세트' },
  ];

  return (
    <div className="container">
      <Logo className="logo"/>
      <div className="search-bar">
        <input type="text" placeholder="검색어를 입력하세요." />
      </div>

      <div className="section">
        <div className="section-header">
          <span>최근 검색어</span>
          <span className="clear-all">전체삭제</span>
        </div>
        <div className="recent-empty">최근 검색어가 없습니다.</div>
      </div>

      <div className="section">
        <div className="section-header">추천 검색어</div>
        <div className="tags">
          {tagKeywords.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">추천 검색어</div>
        <div className="keyword-rank">
          <div className="keyword-list">
            {rankedKeywords.map((item) => (
              <div key={item.rank} className="keyword-item">
                <span className="rank-number">{item.rank}</span>
                {item.keyword}
                {item.trend === 'up' && <span className="arrow-up">▲</span>}
                {item.trend === 'down' && <span className="arrow-down">▼</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
