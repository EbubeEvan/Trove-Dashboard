import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { type FormEvent, useState } from 'react';

import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Input } from '../../../components/ui/Input';
import { useLogin } from '../hooks/useLogin';
import { validateLoginForm } from '../lib/validation';
import type { LoginFormErrors } from '../types/login';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const login = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateLoginForm(email, password);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    login.mutate({ email, password }, { onSuccess: () => navigate({ to: '/dashboard' }) });
  }

  return (
    <div className='bg-bg-page flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_15%_20%,rgba(5,154,131,0.06),transparent_40%),radial-gradient(circle_at_85%_85%,rgba(5,154,131,0.07),transparent_45%)] p-6'>
      <Card padding='none' className='flex w-full max-w-[420px] flex-col items-center px-6 py-8'>
        <div className='animate-[slideUp_300ms_ease-out_both]'>
          <div className='bg-primary mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-base font-semibold text-white'>
            T
          </div>
        </div>
        <h1
          className='m-0 animate-[slideUp_300ms_ease-out_both] text-[19px] font-semibold'
          style={{ animationDelay: '50ms' }}
        >
          Welcome back
        </h1>
        <p
          className='text-body text-text-neutral mt-1 mb-6 animate-[slideUp_300ms_ease-out_both]'
          style={{ animationDelay: '100ms' }}
        >
          Sign in to your account
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className='flex w-full animate-[slideUp_300ms_ease-out_both] flex-col gap-4'
          style={{ animationDelay: '150ms' }}
        >
          <Input
            label='Email address'
            type='email'
            placeholder='name@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete='email'
          />

          <div className='relative'>
            <Input
              label='Password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete='current-password'
            />
            <button
              type='button'
              className='text-text-neutral hover:text-text-default absolute top-[30px] right-3 flex cursor-pointer border-0 bg-transparent p-1 transition-colors duration-180 ease-in-out active:scale-90'
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              <span
                key={showPassword ? 'show' : 'hide'}
                className='inline-flex animate-[fadeIn_150ms_ease-out]'
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </span>
            </button>
          </div>

          {login.isError && (
            <p
              className='bg-negative-bg text-caption text-negative m-0 animate-[shake_400ms_ease-out] rounded-lg px-3 py-2'
              role='alert'
            >
              {login.error instanceof Error ? login.error.message : 'Unable to sign in. Try again.'}
            </p>
          )}

          <Button type='submit' fullWidth loading={login.isPending}>
            Sign in
          </Button>
        </form>

        <div className='animate-[slideUp_300ms_ease-out_both]' style={{ animationDelay: '250ms' }}>
          <a
            href='/forgot-password'
            className='text-caption text-primary mt-5 block text-center no-underline transition-all duration-180 ease-in-out hover:underline active:opacity-70'
          >
            Forgot password?
          </a>
        </div>

        <div
          className='flex w-full animate-[slideUp_300ms_ease-out_both] flex-col items-center'
          style={{ animationDelay: '300ms' }}
        >
          <div className='bg-border my-5 h-px w-full' />

          <p className='text-caption text-text-disabled mt-0 mb-3 w-full text-center'>
            Don{"'"}t have an account?
          </p>
          <Button type='button' variant='secondary' fullWidth>
            Create a Trove account
          </Button>
        </div>
      </Card>
    </div>
  );
}
