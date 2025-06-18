import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import remove from '../../assets/Images/remove.png';
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login: authLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authLogin(data);
      navigate('/dashboard');
    } catch (error) {
      // Use the error message from the AuthProvider
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] px-6 py-8 bg-gradient-to-br from-background to-card">
      <div className="flex flex-1 gap-6 max-w-[1200px] mx-auto flex-col md:flex-row">
        <div className="flex-1 max-w-md p-6 bg-card rounded-lg shadow-lg">
          <h1 className="text-primary text-center text-4xl font-bold mb-6">
            Ma'man | مأمن
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-text font-medium">{t('login.email')}</label>
              <input
                type="email"
                {...register('email')}
                className="p-3 border border-border rounded-md bg-background text-text focus:outline-none focus:border-primary"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-text font-medium">{t('login.password')}</label>
              <input
                type="password"
                {...register('password')}
                className="p-3 border border-border rounded-md bg-background text-text focus:outline-none focus:border-primary"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-primary-400 text-white py-3 rounded-md font-semibold transition duration-300 ${
                loading ? 'bg-border cursor-not-allowed' : 'hover:bg-primary-light'
              }`}
            >
              {loading ? t('login.signing_in') : t('login.sign_in')}
            </button>
          </form>

          <div className="flex justify-between mt-4 text-sm">
            <a href="/forgot-password" className="text-primary underline hover:text-primary-light">
              {t('login.forgot_password')}
            </a>
            <a href="/register" className="text-primary underline hover:text-primary-light">
              {t('login.register')}
            </a>
          </div>
        </div>

        <div className="flex-1 hidden md:flex items-center justify-center">
          <img src={remove} alt="Kids studying online" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}

export default Login;