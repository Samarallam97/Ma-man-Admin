import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

function ForgotPassword() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      setError('email', { message: 'Invalid email' });
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 140px)', background: 'linear-gradient(to bottom right, var(--background-color), var(--card-background))' }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: '500px', backgroundColor: 'var(--card-background)' }}>
        <h1 className="text-center text-primary mb-3" style={{ fontSize: '2.5rem' }}>Ma'man | مأمن</h1>

        <p className="text-center text-muted mb-4">
          {success
            ? t('reset_password.reset_password_success')
            : t('reset_password.reset_password_description')}
        </p>

        {!success && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label fw-medium text-dark">{t('reset_password.email')}</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register('email')}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn w-100 text-white ${loading ? 'btn-secondary disabled' : 'btn-primary'}`}
            >
              {loading ? t('reset_password.sending') : t('reset_password.send_reset_link')}
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <a href="/" className="text-primary text-decoration-underline">
            {t('reset_password.back_to_login')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
