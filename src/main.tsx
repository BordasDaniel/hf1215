import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Iroszerek from './pages/Iroszerek.tsx'
import Iroszer from './pages/Iroszer.tsx'
import NotFound from './pages/NotFound.tsx'
import IroszerPost from './pages/IroszerPost.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/iroszerek',
    element: <Iroszerek />
  },
  {
    path: '/iroszer/:id',
    element: <Iroszer />
  },
  {
    path: '/iroszerpost',
    element: <IroszerPost />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
