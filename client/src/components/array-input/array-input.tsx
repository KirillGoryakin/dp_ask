'use client';

import clsx from 'clsx';
import { Dispatch, SetStateAction, useRef } from 'react';
import { nanoid } from 'nanoid';

import { Input } from '../form';

export type ArrayInputValue = { id: string; value: string };

export type ArrayInputProps = {
  className?: string;
  values: ArrayInputValue[];
  setValues: Dispatch<SetStateAction<ArrayInputValue[]>>;
};

export function ArrayInput({ className, values, setValues }: ArrayInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  return (
    <div className={clsx('flex', 'flex-col', className)} ref={wrapperRef}>
      {values.map(({ id, value }, i) => {
        return (
          <Input
            key={id}
            name={id}
            value={value}
            onChange={(e) =>
              setValues(values.map((v) => (v.id === id ? { id, value: e.target.value } : v)))
            }
            onKeyDown={(e) => {
              if (wrapperRef.current) {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  (wrapperRef.current.children[i + 1] as HTMLElement).focus();
                }
                if (e.key === 'Backspace' && value.trim() === '') {
                  e.preventDefault();
                  (wrapperRef.current.children[Math.max(i - 1, 0)] as HTMLElement).focus();
                  setValues(values.filter((v) => v.id !== id));
                }
              }
            }}
            className={clsx('rounded-r-none', i === 0 ? 'rounded-b-none' : 'rounded-none')}
          />
        );
      })}
      <Input
        onBlur={(e) => {
          if (!e.target.value.trim()) return;
          setValues([...values, { id: nanoid(), value: e.target.value }]);
          e.target.value = '';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            if (e.currentTarget.value.trim()) {
              setValues([...values, { id: nanoid(), value: e.currentTarget.value }]);
              e.currentTarget.value = '';
            }
          }
        }}
        className={clsx(values.length > 0 ? 'rounded-t-none' : null)}
      />
    </div>
  );
}
