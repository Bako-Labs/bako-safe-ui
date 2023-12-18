import { Route } from 'react-router-dom';

import { Container } from '@/layouts/dapp/container';
import { AuthRoute, Pages } from '@/modules/core';

import { TransactionConfirm, VaultConnector } from './pages';

const dappRoutes = (
  <>
    <Route path={Pages.dappAuth()}>
      <Route
        index
        element={
          <Container>
            <VaultConnector />
          </Container>
        }
      />
    </Route>

    <Route
      path={Pages.dappTransaction()}
      element={
        <AuthRoute>
          <Container>
            <TransactionConfirm />
          </Container>
        </AuthRoute>
      }
    />
  </>
);

export { dappRoutes };