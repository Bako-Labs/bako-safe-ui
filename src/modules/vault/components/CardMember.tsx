import {
  Avatar,
  Badge,
  chakra,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { AddAddressBook, AddressWithCopyBtn, Card, Handle } from '@/components';
import { useScreenSize } from '@/modules/core/hooks';
import { HandleUtils } from '@/utils/handle';

const { VITE_BAKO_ID_URL } = import.meta.env;

interface CardMemberProps {
  member: {
    nickname?: string;
    handle?: string;
    avatar: string;
    address: string;
  };
  isOwner: boolean;
  isGrid?: boolean;
}

const SignerCard = chakra(Card, {
  baseStyle: {
    w: 'full',
    p: 3,
    bg: 'dark.600',
    flex: 1,
  },
});

const CardMemberBagde = () => {
  return (
    <Badge
      py={0}
      ml={{ base: 0, sm: 8 }}
      variant="success"
      alignSelf="flex-start"
      fontSize="2xs"
    >
      Owner
    </Badge>
  );
};

const CardMember = ({ member, isOwner, isGrid = true }: CardMemberProps) => {
  const { isLitteSmall, isLargerThan680, isLargerThan1700, isExtraLarge } =
    useScreenSize();

  const hasNickname = member?.nickname;

  return (
    <SignerCard
      w="full"
      minW={{ base: 'unset', xs: 320 }}
      bg="gradients.transaction-card"
      borderColor="gradients.transaction-border"
      backdropFilter="blur(6px)"
      alignItems="center"
      display="flex"
      boxShadow="lg"
    >
      <Flex flexDir="row" gap={2} w="full" alignItems="center">
        <Avatar
          borderRadius={8}
          src={member?.avatar}
          boxSize={{ base: '32px', xs: '40px' }}
          border="1px solid"
          borderColor="grey.75"
        />

        <HStack
          w="full"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          flex={1}
        >
          <VStack
            align="flex-start"
            spacing={0}
            justifyContent="center"
            flex={1}
          >
            <HStack w="full" justifyContent="space-between" spacing={2}>
              {hasNickname ? (
                <Text
                  fontSize="xs"
                  color="grey.200"
                  fontWeight="medium"
                  maxW={isOwner ? 180 : 180}
                  isTruncated
                >
                  {member?.nickname}
                </Text>
              ) : (
                <AddAddressBook address={member.address} />
              )}

              {isOwner && <CardMemberBagde />}
            </HStack>

            <HStack w="full" justifyContent="flex-start" spacing={2}>
              {member.handle && (
                <Handle
                  value={member.handle}
                  fontSize="xs"
                  isTruncated
                  textOverflow="ellipsis"
                  maxW={
                    isGrid
                      ? {
                          base: isLitteSmall ? '70px' : '140px',
                          xs: isLargerThan680 ? '85px' : '140px',
                          md: isExtraLarge ? '85px' : '140px',
                          '2xl': isLargerThan1700 ? '90px' : '140px',
                        }
                      : '95px'
                  }
                  onClick={() => {
                    const handle = HandleUtils.fromHandle(member.handle ?? '');
                    window.open(
                      `${VITE_BAKO_ID_URL}/profile/${handle}`,
                      '_BLANK',
                    );
                  }}
                />
              )}

              <AddressWithCopyBtn
                value={member?.address ?? ''}
                isSidebarAddress
                flexDir="row-reverse"
                gap={0.5}
                textProps={{
                  fontSize: 'xs',
                  color: 'grey.250',
                }}
                copyBtnProps={{
                  iconProps: {
                    'aria-label': 'Copy',
                    fontSize: 'xs',
                  },
                }}
              />
            </HStack>
          </VStack>
        </HStack>
      </Flex>
    </SignerCard>
  );
};

export { CardMember };
