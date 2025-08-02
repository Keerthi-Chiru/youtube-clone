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
import PrivacyPolicy from './components/PrivacyPolicy.jsx'
import TermsOfService from './components/TermsofService.jsx'
import Contact from './components/Contact.jsx'
import ErrorPage from './components/ErrorPage.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
      },
      {
        path: '/privacy',
        element: <PrivacyPolicy />
      },
      {
        path: '/terms',
        element: <TermsOfService />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
