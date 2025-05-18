import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLanguage } from './context/LanguageContext'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import TodoPage from './pages/Todo/TodoPage'
import TodoForm from './pages/Todo/TodoForm'
import TimeLimitExceeded from './pages/TimeLimitExceeded/TimeLimitExceeded'
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
        <Route path="todos" element={<TodoPage />} />
        <Route path="todos/add" element={<TodoForm />} />
        <Route path="todos/edit/:id" element={<TodoForm />} />
        <Route path="time-exceeded" element={<TimeLimitExceeded />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

export default App