import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLanguage } from './context/LanguageContext'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import ContentPage from './pages/Content/ContentPage.jsx'
import ContentForm from './pages/Content/ContentForm.jsx'
import ModulePage from './pages/Module/ModulePage.jsx'
import ModuleForm from './pages/Module/ModuleForm.jsx'
import CategoryPage from './pages/Category/CategoryPage.jsx'
import CategoryForm from './pages/Category/CategoryForm.jsx'

import NotFound from './pages/NotFound/NotFound'

function App() {
  const { language, dir } = useLanguage()

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = dir
    document.documentElement.lang = language
    document.body.className = language === 'ar' ? 'font-arabic' : 'font-english'
  }, [language, dir])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/content"  element={<ContentPage />} />
        <Route path="/content/add"  element={<ContentForm />} />
        <Route path="/module"  element={<ModulePage />} />
        <Route path="/module/add"  element={<ModuleForm />} />
        <Route path="/category"  element={<CategoryPage />} />
        <Route path="/category/add"  element={<CategoryForm />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Route>
    </Routes>
  )
}

export default App