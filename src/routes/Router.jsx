// Router.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import MainPage from './pages/mainPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/Main',
    element: <MainPage />
  },
])


export default function Router() {
  return <RouterProvider router={router} />
}
