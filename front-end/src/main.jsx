import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import './App.css'

const Register = lazy(() => import('./components/Register.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const Homepage = lazy(() => import('./components/Homepage.jsx'));
const Upload = lazy(() => import('./components/Upload.jsx'));
const Channels = lazy(() => import('./components/Channels.jsx'));
const Edit = lazy(() => import('./components/Edit.jsx'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./components/TermsofService.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));
const Channel = lazy(()=> import('./components/Channel.jsx'));
const Video = lazy(()=> import('./components/Video.jsx'));


const fallback = <div className="text-center py-10 text-lg">Loading...</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: '/',
        element: <Suspense fallback={fallback}>
        <Homepage />
        </Suspense>
      },
      {
        path: '/login',
        element: <Suspense fallback={fallback}>
        <Login />
        </Suspense>
      },
      {
        path: '/register',
        element: <Suspense fallback={fallback}>
        <Register />
        </Suspense>
      },
      {
        path: '/upload',
        element: <Suspense fallback={fallback}>
        <Upload />
        </Suspense>
      },
      {
        path: '/channels',
        element: <Suspense fallback={fallback}>
        <Channels />
        </Suspense>
      },
      {
        path: '/:videoId',
        element: <Suspense fallback={fallback}>
        <Video />
        </Suspense>
      },
      {
        path: '/channel/:channelId',
        element: <Suspense fallback={fallback}>
        <Channel />
        </Suspense>
      },
      {
        path: '/edit/:videoId',
        element: <Suspense fallback={fallback}>
        <Edit />
        </Suspense>
      },
      {
        path: '/privacy',
        element: <Suspense fallback={fallback}>
        <PrivacyPolicy />
        </Suspense>
      },
      {
        path: '/terms',
        element: <Suspense fallback={fallback}>
        <TermsOfService />
        </Suspense>
      },
      {
        path: '/contact',
        element: <Suspense fallback={fallback}>
        <Contact />
        </Suspense>
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
