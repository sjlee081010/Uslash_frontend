import { useState, useRef } from 'react';
import './Create.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Logo from '../../logo';

const defaultIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 40],
});

const SearchBox = ({ setMarkerPosition }) => {
  const inputRef = useRef();
  const map = useMap();

  const handleSearch = async () => {
    const query = inputRef.current.value;
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await res.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const latNum = parseFloat(lat);
      const lonNum = parseFloat(lon);
      map.setView([latNum, lonNum], 16); // 이동
      setMarkerPosition([latNum, lonNum]); // 마커 설정
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="모임할 장소는 입력하세요."
        ref={inputRef}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        style={{zIndex: '100'}}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

const MapClickHandler = ({ setMarkerPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPosition([lat, lng]);
    }
  });
  return null;
};

export default function Create() {
  const [title, setTitle] = useState('');
  const [descript, setDescript] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [maxMember, setMaxMember] = useState('');
  const [markerPosition, setMarkerPosition] = useState([37.5665, 126.9780]);
  const [location, setLocation] = useState('');
  const [img, setImg] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImg(files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    img.forEach((file) => formData.append('img', file));
    formData.append('title', title);
    formData.append('descript', descript);
    formData.append('date', date);
    formData.append('location', location || `${markerPosition[0]},${markerPosition[1]}`);
    formData.append('category', category);
    formData.append('price', parseInt(price));
    formData.append('maxMember', parseInt(maxMember));

    try {
      const res = await fetch('http://172.16.20.97:8000/post', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) alert('모임이 등록되었습니다!');
      else alert('등록 실패');
    } catch (err) {
      console.error(err);
      alert('에러 발생');
    }
  };

  const selectCategory = (value) => {
    setCategory(value);
    setShowCategoryModal(false);
  };

  

  return (
    <div className="create-container">
      <Logo />
      
      <label>사진첨부</label>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />

      <label>제목</label>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해 주세요" />

      <label>설명글</label>
      <textarea value={descript} onChange={(e) => setDescript(e.target.value)} placeholder="제품을 입력해 주세요" />

      <label>모임할 장소</label>
      <MapContainer center={markerPosition} zoom={14} scrollWheelZoom={false} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={markerPosition} icon={defaultIcon} />
        <SearchBox setMarkerPosition={(pos) => {
          setMarkerPosition(pos);
          setLocation(`${pos[0]},${pos[1]}`);
        }} />
        <MapClickHandler setMarkerPosition={setMarkerPosition} />
      </MapContainer>


      <label>가격</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격을 입력해주세요" />

      <label>카테고리</label>
      <input value={category} onChange={(e) => setCategory(e.target.value)} onClick={() => {
        console.log('카테고리 열림'); // 이 로그가 뜨는지 확인
        setShowCategoryModal(true);
      }}/>

      <label>기한</label>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <label>인원 수</label>
      <input type="number" value={maxMember} onChange={(e) => setMaxMember(e.target.value)} placeholder="인원 수를 입력해주세요" />

      <button onClick={handleSubmit}>게시하기</button>

      <div className="bottom-space" />
      {showCategoryModal && (
        <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
          <div className="category-modal" onClick={(e) => e.stopPropagation()}>
            <h3>카테고리</h3>
            <div className="category-section">
              <p>마트 종류</p>
              {['코스트코', '이마트', '하나로마트', '럭키마트'].map((v) => (
                <button key={v} onClick={() => selectCategory(v)}>{v}</button>
              ))}
              <p>육류</p>
              {['소고기', '돼지고기', '닭', '다짐육'].map((v) => (
                <button key={v} onClick={() => selectCategory(v)}>{v}</button>
              ))}
              <p>기타</p>
              {['쌀', '냉동식품', '샴푸', '기타(직접입력)'].map((v) => (
                <button key={v} onClick={() => selectCategory(v)}>{v}</button>
              ))}
            </div>
            <button className="close-modal" onClick={() => setShowCategoryModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}
