import * as yup from 'yup';

const required = 'required';
const invalidEmail = 'valid email address required';

const contactInfoSchema = yup.object({
  accounting: yup.string(),
  name: yup.string().trim().required(required),
  email: yup.string().trim().required(required).email(invalidEmail),
  message: yup.string().trim().required(required),
});

export default contactInfoSchema;
