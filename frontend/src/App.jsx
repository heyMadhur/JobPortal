import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'

const appRouter= createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/jobs',
    element: <Jobs />,
  },
  // {
  //   path: '/login',
  //   element: <Navbar />,
  // },
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
