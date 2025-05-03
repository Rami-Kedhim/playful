
import { Navigate } from 'react-router-dom';
import { AppPaths } from '@/routes';

// This file is just a redirect to HomePage to maintain backward compatibility
const Home = () => {
  return <Navigate to={AppPaths.HOME} replace />;
};

export default Home;
