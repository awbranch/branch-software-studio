import { useState } from 'react';

export type Status = 'start' | 'processing' | 'ok' | 'error';

export default function useFormController(endPoint: string) {
  const [status, setStatus] = useState<Status>('start');

  const onRestart = () => {
    setStatus('start');
  };

  const onSubmit = async (values: object, resetForm: () => void) => {
    setStatus('processing');
    let res = await fetch(endPoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    try {
      if (res.ok) {
        resetForm();
        setStatus('ok');
      } else {
        setStatus('error');
      }
      let json = await res.json();
      if (json && json.message) {
        console.error(json.message);
      }
    } catch (err: any) {
      setStatus('error');
      console.error(err.toString());
    }
  };

  return { status, onSubmit, onRestart };
}
