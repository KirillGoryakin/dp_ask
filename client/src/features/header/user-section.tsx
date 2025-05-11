'use client';

import { MdLogout } from 'react-icons/md';
import clsx from 'clsx';

import { Button } from '@/components/button';

import { useUser } from '../user';
import { signOut } from '../user/singout';

export function UserSection() {
  const { user } = useUser();
  if (user) {
    return (
      <div className={clsx('flex', 'items-center', 'space-x-4')}>
        {/* <span>Здравствуйте, {user.displayName || user.email}</span> */}
        <Button primary onClick={signOut}>
          <MdLogout />
        </Button>
      </div>
    );
  }
  return null;
}
