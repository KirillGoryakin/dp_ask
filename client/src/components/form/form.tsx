import * as RadixForm from '@radix-ui/react-form';
import clsx from 'clsx';

export type FormProps = RadixForm.FormProps;
export function Form(props: FormProps) {
  return <RadixForm.Root {...props} />;
}

export type FieldProps = RadixForm.FormFieldProps & { label?: string };
export function Field({ label, children, ...props }: FieldProps) {
  return (
    <RadixForm.Field {...props} className={clsx('w-full', props.className)}>
      {label && (
        <RadixForm.Label asChild>
          <label className={clsx('block', 'mb-1')}>{label}</label>
        </RadixForm.Label>
      )}
      {children}
    </RadixForm.Field>
  );
}
