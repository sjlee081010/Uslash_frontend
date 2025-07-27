import React from 'react';
import { useState } from 'react';
import './Chat.css';
import { Link } from 'react-router-dom'

const Chat = () => {
  const [selectedTab, setSelectedTab] = useState('전체');

  const tabs = ['전체', '판매', '구매', '안 읽은 메시지'];

  const messages = [
    {
      title: '코스트코 소고기 다짐육 대용량 3KG',
      content: '오늘 소분모임 하기로 했는데 잊지 않으셨죠?',
      time: '1시간 전',
      unread: 1,
    },
    {
      title: '럭키마트 홍삼젤리 4묶음',
      content: '내일 소분모임 잘 부탁드려요',
      time: '1시간 전',
      unread: 4,
    },
    {
      title: '하나로마트 피자치즈 2.5KG',
      content: '내일 잘 부탁드려요~',
      time: '2일 전',
    },
    {
      title: '코스트코 카프리썬 20개입',
      content: '계좌보내드릴게요!',
      time: '4일 전',
    },
    {
      title: '코스트코 델마크 스위터장쥬스 24개입',
      content: '어디서 만나요?',
      time: '3일 전',
    },
    {
      title: '이마트 생크림 크라 12개입',
      content: '내일 봐요~!',
      time: '1일 전',
    },
  ];

  const filteredMessages = messages.filter((msg) => {
    if (selectedTab === '전체') return true;
    if (selectedTab === '안 읽은 메시지') return msg.unread;
    return msg.type === selectedTab;
  });

  return (
    <div className="chat-page">
      {/* 상단 상태 표시 */}
      <div className="status-row">
        <div className="status active">
          <img src="https://img.icons8.com/ios-glyphs/30/00c66e/headset.png" alt="진행 중" />
          <span>소분 모임 진행 중</span>
        </div>
        <div className="status inactive">
          <Link to="/Complete">
            <img src="https://img.icons8.com/ios-glyphs/30/c1c1c1/headset.png" alt="완료" />
          </Link>
          <span>소분 모임 완료</span>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="tab-row">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${selectedTab === tab ? 'selected' : ''}`}
            onClick={() => setSelectedTab(tab)}
            style={{cursor: 'pointer'}}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 메시지 리스트 */}
      <div className="message-list">
        {messages.map((msg, index) => (
          <div key={index} className="message-item">
            <div className="message-header">
              <strong>{msg.title}</strong>
              <span className="time">{msg.time}</span>
            </div>
            <div className="message-content">{msg.content}</div>
            {msg.unread && (
              <div className="unread-badge">{msg.unread}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
