import { Container } from 'react-bootstrap';
import BounceLoader from 'react-spinners/BounceLoader';

export function LoadingSpinner() {
  return <Container className='d-flex align-items-center justify-content-center h-100'>
    <BounceLoader
      color={"#36d7b7"}
      loading={true}
      size={60}
      aria-label="Loading Spinner"
      data-testid="loader" />
  </Container>;
}
