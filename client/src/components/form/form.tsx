'use client';

import * as RadixForm from '@radix-ui/react-form';
import clsx from 'clsx';
import { FormEvent, forwardRef, useState } from 'react';

import { createContext } from '@/lib/react-utils';

export type FormContext = {
  pending: boolean;
};
const defaultFormContextValue: FormContext = {
  pending: false,
};
const [FormProvider, useFormContext] = createContext<FormContext>(
  'FormContext',
  defaultFormContextValue,
);

export { useFormContext };

export type FormProps = Omit<RadixForm.FormProps, 'action' | 'onSubmit'> & {
  onSubmit?: (e: FormEvent<HTMLFormElement>, data: FormData) => void | Promise<void>;
};
export const Form = forwardRef(function Form(props: FormProps, ref: React.Ref<HTMLFormElement>) {
  const [state, setState] = useState<FormContext>(defaultFormContextValue);
  return (
    <FormProvider value={state}>
      <RadixForm.Root
        {...props}
        ref={ref}
        onSubmit={async (e) => {
          e.preventDefault();
          if (state.pending) {
            return;
          }
          const result = props.onSubmit?.(e, new FormData(e.currentTarget));
          if (typeof result?.then === 'function') {
            setState({ ...state, pending: true });
            try {
              await result;
            } finally {
              setState({ ...state, pending: false });
            }
          }
        }}
      />
    </FormProvider>
  );
});

export type FieldProps = RadixForm.FormFieldProps & { label?: string };
export function Field({ label, children, ...props }: FieldProps) {
  return (
    <RadixForm.Field {...props} className={clsx('w-full', props.className)}>
      {label && (
        <RadixForm.Label asChild>
          <label className={clsx('block', 'mb-1', 'pl-1')}>{label}</label>
        </RadixForm.Label>
      )}
      <RadixForm.Control asChild>{children}</RadixForm.Control>
    </RadixForm.Field>
  );
}
