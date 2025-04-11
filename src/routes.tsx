import { Home } from "@/pages/Home";
import { Profile } from "@/pages/Profile";
import { Auth } from "@/pages/Auth";
import { Livecams } from "@/pages/Livecams";
import { LivecamDetail } from "@/pages/LivecamDetail";
import { BrainHub } from "@/pages/BrainHub";
import { Wallet } from "@/pages/Wallet";
import UpdatedWallet from "@/pages/UpdatedWallet";

export interface RouteType {
  path: string;
  element: React.ReactNode;
}

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/livecams',
    element: <Livecams />,
  },
  {
    path: '/livecams/:id',
    element: <LivecamDetail />,
  },
  {
    path: '/brain-hub',
    element: <BrainHub />,
  },
  {
    path: '/wallet',
    element: <Wallet />,
  },
];

export default routes;
