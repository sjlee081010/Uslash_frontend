import './Login.css'
import kakao_login from '../../assets/kakao_login.png'
import naver_login from '../../assets/naver_login.png'
import google_login from '../../assets/google_login.png'
import logo from '../../assets/logo.png'

function Login() {
  const login = () => {
    window.location.href = 'https://905e24806edf.ngrok-free.app/oauth'
  }

  return (
    <>
      <div id="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="login_btn">
          <img src={kakao_login} alt='kakao' />
          <img src={naver_login} alt='naver' />
          <img src={google_login} alt='naver'/>
        </div>
      </div>
    </>
  )
}

export default Login
