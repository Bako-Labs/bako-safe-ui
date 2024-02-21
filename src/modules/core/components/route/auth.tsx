import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthStore } from '@/modules/auth/store';
import { Pages } from '@/modules/core';
//import { useWorkspace } from '@/modules/workspace/hooks';

export interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute = (props: AuthRouteProps) => {
  const { account } = useAuthStore();
  const { search, pathname } = useLocation();
  // const { workspaceId } = useParams();
  // const { handleWorkspaceSelection } = useWorkspace();

  if (!account) {
    return (
      <Navigate
        to={`${Pages.index()}${search}`}
        state={{ from: `${pathname}${search}` }}
      />
    );
  }

  // if (!workspaceId) {
  //   handleWorkspaceSelection(singleWorkspace);
  // }

  return props.children;
};

export { AuthRoute };
