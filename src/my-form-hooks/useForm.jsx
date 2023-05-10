import { useState } from 'react';
import FormState from './Form';

export default function useForm(initialValues, validation) {
  const [ form ] = useState(new FormState(initialValues, validation))
  return {form, values: form.getFieldValues()}
}
