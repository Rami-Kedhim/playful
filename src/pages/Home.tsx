
import { Navigate } from 'react-router-dom';
import HomePage from './HomePage';

// This file is just a redirect to HomePage to maintain backward compatibility
// Eventually we should remove this file and update all references to use HomePage directly
const Home = () => {
  return <Navigate to="/" replace />;
};

export default Home;
