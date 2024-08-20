import { createContext, useContext } from 'react';

import { useWorkspaceDetails } from './hooks/details/useWorkspaceDetails';
import { BakoLoading } from '@/components';

export type IWorkspaceContext = ReturnType<typeof useWorkspaceDetails>;

const WorkspaceContext = createContext<IWorkspaceContext | null>(null);

const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  const workspaceDetails = useWorkspaceDetails();

  return (
    <WorkspaceContext.Provider value={workspaceDetails}>
      {workspaceDetails.isWorkspaceReady ? children : <BakoLoading />}
    </WorkspaceContext.Provider>
  );
};
export default WorkspaceProvider;

const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error(
      'useWorkspaceContext must be used within WorkspaceProvider',
    );
  }

  return context;
};

export { WorkspaceProvider, useWorkspaceContext };