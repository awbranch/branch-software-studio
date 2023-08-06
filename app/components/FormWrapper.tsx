import { Status } from './useFormController';
import Text from '@/components/Text';
import Button from '@/components/Button';
import BarLoader from 'react-spinners/BarLoader';

interface FormWrapperProps {
  status: Status;
  onClose: () => void;
  successMessage: string;
  children: JSX.Element;
}

const FormWrapper = ({
  onClose,
  status,
  successMessage,
  children,
}: FormWrapperProps): JSX.Element => {
  return (
    <>
      <div className={status === 'start' ? 'block' : 'hidden'}>{children}</div>
      {status === 'processing' ? (
        <div>
          <Text className="mb-1">Submitting. Please Wait.</Text>
          <BarLoader width={240} color="white" loading={true} />
        </div>
      ) : status === 'error' ? (
        <div>
          <Text>
            We apologize, but there was an error attempting to contact our
            server.
          </Text>
          <Button className="mt-8" onClick={onClose}>
            Retry
          </Button>
        </div>
      ) : status === 'ok' ? (
        <div>
          <Text>{successMessage}</Text>
          <Button className="mt-8" onClick={onClose}>
            close
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormWrapper;
