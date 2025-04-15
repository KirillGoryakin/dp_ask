import * as RadixForm from '@radix-ui/react-form';

import { Button } from '../button';

export type SubmitButtonProps = RadixForm.FormSubmitProps;

export function SubmitButton({ children, asChild: _, ...props }: SubmitButtonProps) {
  return (
    <RadixForm.Submit {...props} asChild>
      <Button type="submit" primary>
        {children}
      </Button>
    </RadixForm.Submit>
  );
}
