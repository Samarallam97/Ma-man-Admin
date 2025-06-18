import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import ContentPage from './pages/Content/ContentPage.jsx';
import ContentForm from './pages/Content/ContentForm.jsx';
import ModulePage from './pages/Module/ModulePage.jsx';
import ModuleForm from './pages/Module/ModuleForm.jsx';
import CategoryPage from './pages/Category/CategoryPage.jsx';
import CategoryForm from './pages/Category/CategoryForm.jsx';
import UserPage from './pages/User/UserPage.jsx';
import UserForm from './pages/User/UserForm.jsx';
import AgeGroupPage from './pages/AgeGroup/AgeGroupPage.jsx';
import AgeGroupForm from './pages/AgeGroup/AgeGroupForm.jsx';
import Login from './pages/Auth/Login.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import AuthLayout from './components/Layout/AuthLayout.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import NotFound from './pages/NotFound/NotFound';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Use a ref or state to prevent multiple toasts
  useEffect(() => {
    if (!user || (roles && !roles.includes(user?.role))) {
      toast.dismiss(); // Clear previous toasts
      toast.error('Access denied: Admin role required', {
        toastId: 'auth-error', // Unique ID to prevent duplicates
      });
    }
  }, [user, roles, location.pathname]);

  if (!user || (roles && !roles.includes(user?.role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { language, dir } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
    document.body.className = language === 'ar' ? 'font-arabic' : 'font-english';
  }, [language, dir]);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/" element={<Layout />}>
          {/* <Route
            path="/dashboard"
            element={
              <PrivateRoute roles={['parent', 'root-admin']}>
                <Dashboard />
              </PrivateRoute>
            }
          /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/content/add" element={<ContentForm />} />
          <Route path="/content/edit/:id" element={<ContentForm />} />
          <Route path="/module" element={<ModulePage />} />
          <Route path="/module/add" element={<ModuleForm />} />
          <Route path="/module/edit/:id" element={<ModuleForm />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/add" element={<CategoryForm />} />
          <Route path="/category/edit/:id" element={<CategoryForm />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/add" element={<UserForm />} />
          <Route path="/user/edit/:id" element={<UserForm />} />
          <Route path="/ageGroup" element={<AgeGroupPage />} />
          <Route path="/ageGroup/add" element={<AgeGroupForm />} />
          <Route path="/ageGroup/edit/:id" element={<AgeGroupForm />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;