import { useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Eye, EyeOff } from 'lucide-react';
import { Card } from '../../core/design-system/Card';
import { Input } from '../../core/design-system/Input';
import { Button } from '../../core/design-system/Button';
import { validateLoginForm, type LoginFormErrors } from './validation';
import { useLogin } from './useLogin';

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

    login.mutate(
      { email, password },
      { onSuccess: () => navigate({ to: '/dashboard' }) },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--color-bg-page) bg-[radial-gradient(circle_at_15%_20%,rgba(5,154,131,0.06),transparent_40%),radial-gradient(circle_at_85%_85%,rgba(5,154,131,0.07),transparent_45%)] p-(--space-6)">
      <Card padding="none" className="flex w-full max-w-[420px] flex-col items-center px-(--space-6) py-(--space-8)">
        <div className="mb-(--space-4) flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-primary) text-base font-semibold text-white">
          T
        </div>
        <h1 className="m-0 text-[19px] font-semibold">Welcome back</h1>
        <p className="mb-(--space-6) mt-1 text-(length:--font-size-body) text-(--color-text-neutral)">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-(--space-4)">
          <Input
            label="Email address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-(--space-3) top-[30px] flex cursor-pointer border-0 bg-transparent p-1 text-(--color-text-neutral)"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {login.isError && (
            <p
              className="m-0 rounded-lg bg-(--color-negative-bg) px-(--space-3) py-(--space-2) text-(length:--font-size-caption) text-(--color-negative)"
              role="alert"
            >
              {login.error instanceof Error ? login.error.message : 'Unable to sign in. Try again.'}
            </p>
          )}

          <Button type="submit" fullWidth loading={login.isPending}>
            Sign in
          </Button>
        </form>

        <a
          href="#"
          className="mt-(--space-5) block text-center text-(length:--font-size-caption) text-(--color-primary) no-underline hover:underline"
        >
          Forgot password?
        </a>

        <div className="my-(--space-5) h-px w-full bg-(--color-border)" />

        <p className="mb-(--space-3) mt-0 w-full text-center text-(length:--font-size-caption) text-(--color-text-disabled)">
          Don't have an account?
        </p>
        <Button type="button" variant="secondary" fullWidth>
          Create a Trove account
        </Button>
      </Card>
    </div>
  );
}
