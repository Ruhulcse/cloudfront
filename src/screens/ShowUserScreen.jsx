import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../Utils/Config';

export default function ShowUserScreen() {
  const { isLoading, error, data } = useQuery('userData', () =>
    axios.get('http://localhost:5000/api/v1/users', config)
  );

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  console.log(data);
  console.log(data.data);

  return <div>show</div>;
}
