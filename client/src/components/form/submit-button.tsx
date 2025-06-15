'use client';

import * as RadixForm from '@radix-ui/react-form';

import { LoadableButton } from '../button';
import { useFormContext } from './form';

export type SubmitButtonProps = RadixForm.FormSubmitProps;

export function SubmitButton({ children, asChild: _, ...props }: SubmitButtonProps) {
  const { pending } = useFormContext();
  return (
    <RadixForm.Submit {...props} asChild>
      <LoadableButton type="submit" primary loading={pending}>
        {children}
      </LoadableButton>
    </RadixForm.Submit>
  );
}
