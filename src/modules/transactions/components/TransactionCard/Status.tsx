interface TransactionCardStatusProps {
  status: TransactionState;
  transaction: Transaction;
}
import { Badge, Text, VStack } from '@chakra-ui/react';

import { Transaction, TransactionState, WitnessStatus } from '@/modules/core';

const Status = ({ transaction, status }: TransactionCardStatusProps) => {
  const { isReproved, isCompleted, isError } = status;

  const signaturesCount = transaction.witnesses.filter(
    (w) => w?.status === WitnessStatus.DONE,
  ).length;

  const signatureStatus = `${signaturesCount}/${transaction.predicate.minSigners} Sgd`;

  return (
    <VStack spacing={0}>
      <Badge
        h={5}
        variant={
          isReproved || isError ? 'error' : isCompleted ? 'success' : 'warning'
        }
      >
        {isError && 'Error'}
        {isReproved && 'Declined'}
        {isCompleted && !isError && 'Completed'}
        {!isCompleted && !isReproved && !isError && signatureStatus}
      </Badge>
      <Text variant="description" fontSize="sm" color="grey.500">
        Transfer status
      </Text>
    </VStack>
  );
};

export { Status };
