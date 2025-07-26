import './Login.css'
import { useState } from 'react'
import colors from '../../styles/color'
import logo from '../../assets/logo.png'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [complete, setComplete] = useState(false)
  const [code, setCode] = useState('')

  const signUp = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://172.16.20.97:8000/sign_up', {
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
      if (data.message === '코드 전송') {
        setComplete(true)
      } else {
        alert(data.message)
      }
    } catch (err) {
      console.error('요청 실패:', err)
      alert('회원가입 오류')
    }
  }

  const check = async (e) => {
    e.preventDefault()
    console.log(complete)

    try {
      const response = await fetch('http://172.16.20.97:8000/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          code: code
        })
      })

      const data = await response.json()
      
      console.log('인증 결과:', data)
    } catch (err) {
      console.error('인증 실패:', err)
      alert('인증 오류')
    }
  }

  return (
    <>
    <img src={logo} alt="logo.png" className='logo'/>
    
    <form onSubmit={complete ? check : signUp} className='sign_up'>
      <h2>계정 만들기</h2>

      {!complete ? (
        <>
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
        </>
      ) : (
        <>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증 코드"
          />
        </>
      )}

      <button type="submit" style={{background: colors.pointColor}}>계속</button>
    </form>
    </>
  )
}

export default Login
