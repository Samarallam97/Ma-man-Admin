import { useTranslation } from 'react-i18next'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-140px)] flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default AuthLayout
