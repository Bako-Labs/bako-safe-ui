import { Icon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  CardProps,
  Divider,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Card } from '@/components';
import { HandbagIcon } from '@/components/icons/handbag';
import { useAuth } from '@/modules';
import { PredicateMember } from '@/modules/core/models/predicate';
import {
  Member,
  PermissionRoles,
  Workspace,
} from '@/modules/core/models/workspace';
import { WorkspacePermissionUtils } from '@/modules/workspace/utils';

interface VaultCardProps extends CardProps {
  id: string;
  name: string;
  members: PredicateMember[];
  workspace: Workspace;
}
export const VaultCard = ({
  id,
  name,
  workspace,
  members,
  ...rest
}: VaultCardProps) => {
  const auth = useAuth();
  const role = WorkspacePermissionUtils.getPermissionInWorkspace(workspace!, {
    id: auth.userId,
  } as Member);

  const permissions =
    WorkspacePermissionUtils.permissions[role?.title?.toUpperCase()];

  const isSigner = workspace.permissions[auth.userId].SIGNER.includes(id);

  const _role =
    permissions?.title ===
      WorkspacePermissionUtils.permissions[PermissionRoles.VIEWER].title &&
    isSigner
      ? PermissionRoles.SIGNER
      : role?.title?.toUpperCase() ?? PermissionRoles.SIGNER;

  return (
    <Card bg="grey.800" w="100%" cursor="pointer" zIndex={100} {...rest}>
      <VStack alignItems="flex-start">
        <HStack w="100%" justifyContent="space-between" mb={1}>
          <HStack>
            <Avatar
              variant="roundedSquare"
              name={name}
              color="white"
              bg="grey.600"
            />
            <VStack ml={2} alignItems="flex-start" spacing={1}>
              {!workspace.single && (
                <HStack>
                  <Icon
                    w={4}
                    h={4}
                    as={HandbagIcon}
                    fontSize={14}
                    color="grey.200"
                  />
                  <Text maxW={48} color="grey.400" fontSize="sm" isTruncated>
                    {workspace?.name}
                  </Text>
                </HStack>
              )}
              <Heading
                maxW={{ sm: 28, md: 28, lg: 28, xl: 130, '2xl': 180 }}
                variant="title-md"
                color="grey.200"
                isTruncated
              >
                {name}
              </Heading>
            </VStack>
          </HStack>
        </HStack>

        <Divider borderColor="grey.600" my={1} />

        <HStack w="full">
          <Box>
            <Text variant="description">Signers</Text>
            <AvatarGroup
              variant="roundedSquare"
              max={5}
              mt={1}
              size="sm"
              spacing={-2}
            >
              {members.map(({ avatar, address }) => (
                <Avatar variant="roundedSquare" src={avatar} key={address} />
              ))}
            </AvatarGroup>
          </Box>

          <Spacer />

          <VStack spacing={1} alignItems="flex-end">
            <Text variant="description">Role</Text>
            <Badge
              h={6}
              variant={
                WorkspacePermissionUtils.permissions[_role].variant ?? 'warning'
              }
            >
              {WorkspacePermissionUtils.permissions[_role]?.title}
            </Badge>
          </VStack>
        </HStack>
      </VStack>
    </Card>
  );
};
