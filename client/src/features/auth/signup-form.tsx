'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Field, Form, Input, SubmitButton } from '@/components/form';
import { Spinner } from '@/components/spinner';

import { signUp, signIn, useUser, updateUser } from '../user';

export type SignupFormProps = {
  className?: string;
};

export function SignupForm({ className }: SignupFormProps) {
  const { replace } = useRouter();
  const { user } = useUser();
  const [error, setError] = useState<string>();
  const [isNewAccount, setIsNewAccount] = useState<boolean>(false);

  if (user === undefined) {
    return <Spinner />;
  }

  if (user && !user?.displayName) {
    return (
      <Form
        className={clsx('flex', 'flex-col', 'space-y-4', 'w-80', className)}
        onSubmit={async (_, data) => {
          const displayName = data.get('name') as string;
          await updateUser({ displayName });
          replace('/topics');
        }}
      >
        <h2 className={clsx('text-center', 'text-2xl', 'font-bold')}>
          {isNewAccount ? 'Новая учётная запить' : 'Завершите настройку учётной записи'}
        </h2>
        <div>Введите имя, которое будут видеть другие пользователи.</div>
        <Field name="name" label="Имя">
          <Input type="text" required />
        </Field>
        <SubmitButton>Завершить</SubmitButton>
      </Form>
    );
  }

  if (user) {
    replace('/topics');
    return <Spinner />;
  }

  return (
    <Form
      className={clsx('flex', 'flex-col', 'space-y-4', 'w-80', className)}
      onSubmit={async (_, data) => {
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        setError(undefined);
        try {
          await signUp(email, password);
        } catch (e) {
          if (e instanceof Error) {
            if (e.message.includes('email-already-in-use')) {
              // Attempt to sign in
              await signIn(email, password)
                .then(() => setIsNewAccount(true))
                .catch((err) => {
                  if (err instanceof Error && err.message.includes('invalid-credential')) {
                    setError('Неверный пароль.');
                  }
                });
            } else if (e.message.includes('weak-password')) {
              setError('Длина пароля должна быть не менее 6 символов.');
            } else {
              setError(e.message || 'Неизвестная ошибка при регистрации.');
            }
          } else {
            throw e;
          }
        }
      }}
    >
      <Field name="email" label="Email">
        <Input type="email" required />
      </Field>
      <Field name="password" label="Пароль">
        <Input type="password" required />
      </Field>
      <SubmitButton>Авторизоваться</SubmitButton>
      {error && (
        <div className={clsx('text-red-500', 'animate-in', 'slide-in-from-top-2')}>
          Ошибка: {error}
        </div>
      )}
    </Form>
  );
}
