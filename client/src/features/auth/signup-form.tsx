'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Field, Form, Input, SubmitButton } from '@/components/form';

import { signUp, signIn, useUser, updateUser } from '../user';
import { Spinner } from '../spinner';

export type SignupFormProps = {
  className?: string;
};

export function SignupForm({ className }: SignupFormProps) {
  const { replace } = useRouter();
  const { user } = useUser();
  const [isNewAccount, setIsNewAccount] = useState<boolean>(false);

  if (user === undefined) {
    return <Spinner />;
  }

  if (user && !user?.displayName) {
    return (
      <Form
        className={clsx('flex', 'flex-col', 'space-y-4', 'w-80', className)}
        action={async (data) => {
          const displayName = data.get('name') as string;
          await updateUser({ displayName });
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
    return null;
  }

  return (
    <Form
      className={clsx('flex', 'flex-col', 'space-y-4', 'w-80', className)}
      action={async (data) => {
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        try {
          await signUp(email, password);
        } catch (e) {
          if (e instanceof Error && e.message.includes('email-already-in-use')) {
            await signIn(email, password);
            setIsNewAccount(true);
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
    </Form>
  );
}
