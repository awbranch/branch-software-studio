'use client';

import React from 'react';
import { useFormik } from 'formik';
import useFormController from '@/components/useFormController';
import FormWrapper from '@/components/FormWrapper';
import contactInfoSchema from '@/utils/contactFormSchema';
import TextField from '@/components/TextField';
import TextArea from '@/components/TextArea';
import Button from '@/components/Button';

const successMessage =
  'Thank you for contacting Branch Software Studio. I look forward to talking with you.';

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
      successMessage={successMessage}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* Move both the honeypot and form type fields offscreen */}
        <TextField
          {...getFieldProps('accounting', formik)}
          className="absolute w-1 h-1 top-auto left-[-9999px] overflow-hidden"
        />

        <div className="flex flex-col space-y-6">
          <TextField {...getFieldProps('name', formik)} />
          <TextField {...getFieldProps('email', formik)} />
          <TextArea {...getFieldProps('message', formik)} />
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
    placeholder: name,
    autoComplete: name,
    value: formik.values[name],
    onChange: formik.handleChange,
    error: formik.touched[name] && formik.errors[name],
  };
};
