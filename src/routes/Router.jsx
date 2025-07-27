import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import MainPage from './pages/main/mainPage.jsx'
import SignUp from './pages/SignUp.jsx'
import Create from './pages/Create.jsx'
import Nav from '../Nav.jsx'
import SearchPage from './pages/search/SearchPage.jsx'
import Chat from './pages/chat/chat.jsx'
import Complete from './pages/complete/complete.jsx'
import Mypage from './pages/mypage/myPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/sign_up',
    element: <SignUp />
  },
  {
    // MainPage 아래에 Nav를 추가합니다.
    path: '/Main',
    element: (
      <>
        <MainPage />
        <Nav />
      </>
    )
  },
  {
    path: '/Search',
    element: (
      <>
        <SearchPage />
        <Nav />
      </>
    )
  },
  {
    path: '/Chat',
    element: (
      <>
        <Chat />
        <Nav />
      </>
    )
  },
  {
    path: '/MyPage',
    element: (
      <>
        <Mypage />
        <Nav />
      </>
    )
  },
  {
    path: '/Create',
    element: (
      <>
        <Create />
        <Nav />
      </>
    )
  },
  {
    path: '/Complete',
    element: (
      <>
        <Complete />
        <Nav />
      </>
    )
  }
]);

export default function Router() {
  return <RouterProvider router={router} />
}
