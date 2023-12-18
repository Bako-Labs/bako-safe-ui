import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { queryClient } from '@/config';
import {
  NotificationsQueryKey,
  NotificationSummary,
  Pages,
} from '@/modules/core';
import { useTransactionState } from '@/modules/transactions/states';

import { useNotificationsStore } from '../store/useNotificationsStore';
import { useListNotificationsRequest } from './useListNotificationsRequest';
import { useSetNotificationsAsReadRequest } from './useSetNotificationsAsReadRequest';
import { useUnreadNotificationsCounterRequest } from './useUnreadNotificationsCounterRequest';

interface UseAppNotificationsParams {
  onClose?: () => void;
  isOpen?: boolean;
  onSelect?: (vaultId: string) => void;
}

export interface TransactionRedirect {
  id?: string;
  name?: string;
}

const useAppNotifications = (props?: UseAppNotificationsParams) => {
  const navigate = useNavigate();
  const inView = useInView({ delay: 300 });
  const notificationsListRequest = useListNotificationsRequest(props?.isOpen);
  const unreadNotificationsRequest = useUnreadNotificationsCounterRequest();
  const setNotificationAsReadRequest = useSetNotificationsAsReadRequest();
  const { setSelectedTransaction } = useTransactionState();
  const { unreadCounter, setUnreadCounter } = useNotificationsStore();

  const onCloseDrawer = async () => {
    const hasUnread = !!unreadCounter;

    setUnreadCounter(0);
    props?.onClose?.();

    queryClient.invalidateQueries(NotificationsQueryKey.PAGINATED_LIST);
    queryClient.invalidateQueries(NotificationsQueryKey.UNREAD_COUNTER);

    if (hasUnread) setNotificationAsReadRequest.mutate({});
  };

  const onSelectNotification = (summary: NotificationSummary) => {
    const { transactionId, transactionName, vaultId } = summary;
    const isTransaction = summary?.transactionId;

    onCloseDrawer();

    if (isTransaction)
      setSelectedTransaction({ name: transactionName, id: transactionId });

    const page = isTransaction
      ? Pages.transactions({ vaultId })
      : Pages.detailsVault({ vaultId });

    navigate(page);
  };

  useEffect(() => {
    if (inView.inView && !notificationsListRequest.isLoading) {
      notificationsListRequest.fetchNextPage();
    }
  }, [
    inView.inView,
    notificationsListRequest.isLoading,
    notificationsListRequest.fetchNextPage,
  ]);

  useEffect(() => {
    setUnreadCounter(unreadNotificationsRequest?.data?.total ?? 0);
  }, [unreadNotificationsRequest?.data]);

  return {
    drawer: {
      onSelectNotification: props?.onSelect ?? onSelectNotification,
      onClose: onCloseDrawer,
    },
    inView,
    unreadCounter,
    setUnreadCounter,
    notificationsListRequest,
    navigate,
    onSelectNotification,
  };
};

export { useAppNotifications };