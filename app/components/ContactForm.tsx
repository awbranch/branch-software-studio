'use client';

import React from 'react';
import { useFormik } from 'formik';
import useFormController from '@/components/useFormController';
import FormWrapper from '@/components/FormWrapper';
import contactInfoSchema from '@/utils/contactFormSchema';
import Label from '@/components/Label';
import TextField from '@/components/TextField';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

export default function ContactForm() {
  const { onSubmit, onRestart, status } = useFormController('api/contact');

  const initialValues = {
    accounting: '',
    name: '',
    email: '',
    message: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: contactInfoSchema,
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values, () => resetForm());
    },
  });

  return (
    <FormWrapper
      status={status}
      onClose={onRestart}
      successMessage={'Thank you for contacting Branch Software Studio.'}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* Move both the honeypot and form type fields offscreen */}
        <TextField
          {...getFieldProps('accounting', formik)}
          className="absolute w-1 h-1 top-auto left-[-9999px] overflow-hidden"
        />

        <div className="flex flex-col space-y-6">
          <div>
            <Label htmlFor={'name'} className={'block mb-1'}>
              name
            </Label>
            <TextField {...getFieldProps('name', formik)} />
          </div>
          <div>
            <Label htmlFor={'email'} className={'block mb-1'}>
              email
            </Label>
            <TextField {...getFieldProps('email', formik)} />
          </div>
          <div>
            <Label htmlFor={'message'} className={'block mb-1'}>
              message
            </Label>
            <TextArea {...getFieldProps('message', formik)} rows={6} />
          </div>
        </div>
        <Button type="submit" className="mt-8">
          send
        </Button>
      </form>
    </FormWrapper>
  );
}

const getFieldProps = (name: string, formik: any) => {
  return {
    id: name,
    name: name,
    autoComplete: name,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: formik.touched[name] && formik.errors[name],
  };
};
