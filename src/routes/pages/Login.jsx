import './Login.css'
import { useState } from 'react'
import colors from '../../styles/color'
import Logo from '../../logo'
import { Link, useNavigate } from 'react-router'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    try {
      const response = await fetch('http://172.16.20.97:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password
        })
      })

      const data = await response.json()
      console.log('서버 응답:', data)

      if (data.success) {
        navigate('/Main')
      } else {
        setErrorMessage(data.message || '로그인 실패')
      }
    } catch (err) {
      console.error('로그인 요청 실패:', err)
      alert('로그인 오류')
    }
  }

  return (
    <>
      <Logo className="logo"/>

      <form onSubmit={login} className='sign_up'>
        {errorMessage && <p className='error'>{errorMessage}</p>}
        <h2>이메일로 로그인</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="이메일 주소"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />

        <button type="submit" style={{ background: colors.pointColor }}>
          계속
        </button>
        <p>계정이 없으신가요? <Link to={"/sign_up"}>회원가입</Link></p>
      </form>
    </>
  )
}

export default Login
