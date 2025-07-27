import './Login.css'
import { useState, useEffect } from 'react'
import colors from '../../styles/color'
import Logo from '../../logo'
import { Link, useNavigate } from 'react-router'
import useAuthStore from '../store/authStore'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [complete, setComplete] = useState(false)
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const setLogin = useAuthStore((state) => state.setLogin)
  const navigate = useNavigate()

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('signup_email')
    const completed = sessionStorage.getItem('signup_complete') === 'true'
    
    if (savedEmail) setUsername(savedEmail)
    if (completed) setComplete(true)
  }, [])

  const signUp = async (e) => {
    e.preventDefault()
    setErrorMessage('')

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

      sessionStorage.setItem('signup_email', username)
      sessionStorage.setItem('signup_complete', 'true')
      } else {
        setErrorMessage(data.message || '회원가입 실패')
      }
    } catch (err) {
      console.error('요청 실패:', err)
      setErrorMessage('회원가입 오류')
    }
  }

  const check = async (e) => {
    e.preventDefault()
    setErrorMessage('')

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

      if (data.message === '인증 완료') {
        setLogin(username)
        sessionStorage.removeItem('signup_email')
        sessionStorage.removeItem('signup_complete')
        navigate('/')
      } else {
        setErrorMessage(data.message || '인증 실패')
      }
    } catch (err) {
      console.error('인증 실패:', err)
      setErrorMessage('인증 오류')
    }
  }

  return (
    <>
      <Logo className="logo" />

      <form onSubmit={complete ? check : signUp} className="sign_up">
        <h2>계정 만들기</h2>

        {errorMessage && <p className="error">{errorMessage}</p>}

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
              placeholder="비밀번호(10자 이상)"
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

        <button type="submit" style={{ background: colors.pointColor }}>계속</button>

        <p>
          이미 계정이 있으신가요? <Link to="/">로그인</Link>
        </p>
      </form>
    </>
  )
}

export default SignUp
