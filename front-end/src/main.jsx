import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import HomePage from './components/Homepage.jsx'
import Upload from './components/Upload.jsx'
import Channels from './components/Channels.jsx'
import Video from './components/Video.jsx'
import Channel from './components/Channel.jsx'
import Edit from './components/Edit.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children:[
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/upload',
        element: <Upload />
      },
      {
        path: '/channels',
        element: <Channels />
      },
      {
        path: '/:videoId',
        element: <Video />
      },
      {
        path: '/channel/:channelId',
        element: <Channel />
      },
      {
        path: '/edit/:videoId',
        element: <Edit />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
