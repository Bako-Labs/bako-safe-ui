import { Badge, chakra, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { Card } from '@/components';
import { AddressUtils } from '@/modules/core';

interface CardMemberProps {
  member: {
    nickname?: string;
    avatar: string;
    address: string;
  };
  isOwner: boolean;
}

const SignerCard = chakra(Card, {
  baseStyle: {
    w: 'full',
    py: 5,
    px: 6,
    bgColor: 'dark.300',
    flex: 1,
  },
});

const CardMember = ({ member, isOwner }: CardMemberProps) => {
  const hasNickname = member?.nickname;

  return (
    <SignerCard>
      <HStack spacing={4} w="full">
        <Image borderRadius={10} src={member?.avatar} boxSize="38px" />
        <VStack
          h="full"
          minH={51}
          maxW={600}
          spacing={0}
          justifyContent="center"
          alignItems="start"
        >
          <HStack>
            {hasNickname && (
              <Text
                fontSize="lg"
                color="grey.200"
                fontWeight="semibold"
                maxW={isOwner ? 100 : 150}
                isTruncated
              >
                {member?.nickname}
              </Text>
            )}
            {isOwner && (
              <Badge py={0} variant="success">
                owner
              </Badge>
            )}
          </HStack>

          <Text
            maxW={{ md: 200, lg: 250, '2xl': '100%' }}
            fontSize="md"
            color={hasNickname ? 'grey.500' : 'grey.200'}
            fontWeight={hasNickname ? 'regular' : 'bold'}
            textOverflow="ellipsis"
            isTruncated
          >
            {/* todo: add nickname on bsafe sdk */}
            {AddressUtils.format(member?.address ?? '')}
          </Text>
        </VStack>
      </HStack>
    </SignerCard>
  );
};

export { CardMember };