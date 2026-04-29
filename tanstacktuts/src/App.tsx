import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { MainLayout } from './components/Layouts/MainLayout'
import { Home } from './pages/Home'
import { FetchOld } from './pages/FetchOld'
import { FetchRq } from './pages/FetchRq'
import { createRoute } from '@tanstack/react-router'




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/trad",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <FetchRq />,
      }
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
