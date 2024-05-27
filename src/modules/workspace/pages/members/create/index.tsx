import { PlusSquareIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Card,
  Center,
  Flex,
  HStack,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import {
  Dialog,
  FeedbackDelete,
  FeedbackSuccess,
  FeedbackUpdate,
  RemoveIcon,
  StepProgress,
} from '@/components';
import { RefreshIcon } from '@/components/icons/refresh-icon';
import { UserPlusIcon } from '@/components/icons/user-add-icon';
import { CreateContactDialog, useAddressBook } from '@/modules/addressBook';
import { AddressUtils, useScreenSize } from '@/modules/core';
import { MemberAddressForm } from '@/modules/workspace/components';
import { MemberPermissionForm } from '@/modules/workspace/components/form/MemberPermissionsForm';
import { useGetWorkspaceRequest } from '@/modules/workspace/hooks';
import {
  MemberTabState,
  useChangeMember,
} from '@/modules/workspace/hooks/members';
import { WorkspacePermissionUtils } from '@/modules/workspace/utils';

const MemberTab = () => {
  const { workspaceId, memberId } = useParams();
  const { contactByAddress } = useAddressBook();

  const { workspace } = useGetWorkspaceRequest(workspaceId ?? '');

  const member = workspace?.members.find((member) => member.id === memberId);

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const contactNickname = contactByAddress(member?.address!)?.nickname;

  const permission = WorkspacePermissionUtils.getPermissionInWorkspace(
    workspace!,
    member!,
  );

  return (
    <Card
      w="full"
      bgColor="grey.850"
      p={4}
      mb={5}
      border="1px"
      borderRadius="xl"
      borderColor="grey.400"
      key={member?.id}
    >
      <HStack w="full" justifyContent="space-between">
        <Center w="full" gap={4}>
          <Avatar
            size="md"
            fontSize="md"
            color="white"
            bg="grey.900"
            variant="roundedSquare"
            src={member?.avatar}
            name={contactNickname ?? member?.address}
          />
          <Flex
            w="full"
            mr={1}
            h="14"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex flexDir="column">
              {contactNickname && (
                <Text fontWeight="semibold" color="grey.200">
                  {contactNickname}
                </Text>
              )}
              <Text
                fontWeight={!contactNickname ? 'semibold' : 'normal'}
                color={!contactNickname ? 'grey.200' : 'grey.500'}
              >
                {AddressUtils.format(member?.address ?? '')}
              </Text>
            </Flex>
            <Badge
              fontSize="xs"
              rounded="xl"
              p={1}
              px={3}
              variant={permission?.variant}
            >
              {permission?.title}
            </Badge>
          </Flex>
        </Center>
      </HStack>
    </Card>
  );
};

const CreateMemberPage = () => {
  const { form, handleClose, tabs, addressBook, dialog, isEditMember } =
    useChangeMember();
  const { formState, memberForm, permissionForm } = form;
  const { isMobile, isExtraSmallDevice } = useScreenSize();

  const TabsPanels = (
    <TabPanels>
      {/* <TabPanel p={0}>
        <MemberAddressForm form={memberForm} addressBook={addressBook} />
      </TabPanel> */}
      <TabPanel p={0}>
        <MemberPermissionForm form={permissionForm} formState={formState} />
      </TabPanel>
      <TabPanel p={0}>
        {tabs.is(MemberTabState.SUCCESS) && (
          <FeedbackSuccess
            showAction
            title={formState.title}
            description="To view all the members added to your workspace, click on members on the workspace home page"
            primaryAction={formState.primaryAction}
            secondaryAction={formState.secondaryAction}
            onPrimaryAction={formState.handlePrimaryAction}
            onSecondaryAction={formState.handleSecondaryAction}
            membersFormIcon={UserPlusIcon}
          />
        )}
      </TabPanel>
      <TabPanel p={0}>
        {tabs.is(MemberTabState.UPDATE) && (
          <FeedbackUpdate
            title={formState.title}
            showAction
            primaryAction={formState.primaryAction}
            secondaryAction={formState.secondaryAction}
            onPrimaryAction={formState.handlePrimaryAction}
            onSecondaryAction={formState.handleSecondaryAction}
            newPermission={
              WorkspacePermissionUtils.permissions[
                formState.newPermission ?? ''
              ].title
            }
            oldPermission={
              WorkspacePermissionUtils.permissions[
                formState.oldPermission ?? ''
              ].title
            }
          />
        )}
      </TabPanel>
      <TabPanel p={0}>
        {tabs.is(MemberTabState.DELETE) && (
          <FeedbackDelete
            title={formState.title}
            showAction
            primaryAction={formState.primaryAction}
            secondaryAction={formState.secondaryAction}
            onPrimaryAction={formState.handlePrimaryAction}
            onSecondaryAction={formState.handleSecondaryAction}
          />
        )}
      </TabPanel>
    </TabPanels>
  );

  return (
    <Dialog.Modal
      isOpen
      onClose={handleClose}
      size={{
        base:
          // formState.isEditMember && tabs.is(MemberTabState.FORM) ? 'xl' : 'md',
          'full',
        sm: 'xl',
      }}
      closeOnOverlayClick={false}
      autoFocus={false}
      blockScrollOnMount={isMobile}
      hideContentOverflow
    >
      <CreateContactDialog
        form={addressBook.form}
        dialog={addressBook.contactDialog}
        isLoading={addressBook.createContactRequest.isLoading}
        isEdit={false}
      />
      <Dialog.Header
        maxW={480}
        title={dialog.title}
        mb={0}
        mt={{
          base: -4,
          xs: 0,
        }}
        onClose={handleClose}
        description={dialog.description}
        descriptionFontSize="md"
        descriptionColor="grey.200"
        hidden={!tabs.is(MemberTabState.FORM)}
      />
      {formState.isEditMember && (
        <Tabs maxW={480} w="full" hidden={!tabs.is(MemberTabState.FORM)}>
          <MemberTab />
        </Tabs>
      )}
      {!formState.isEditMember && tabs.is(MemberTabState.FORM) && (
        <>
          <Box maxW={480} w="full" mt={{ base: 2, sm: 0 }} mb={8}>
            <StepProgress length={tabs.length - 2} value={tabs.tab} />
          </Box>
          <MemberAddressForm form={memberForm} addressBook={addressBook} />
        </>
      )}
      <Dialog.Body
        mb={{ base: formState.isEditMember ? 6 : 2, sm: 1 }}
        maxW={480}
        maxH={{ base: isExtraSmallDevice ? 330 : 'full', sm: 520 }}
        overflowY="scroll"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
            width: '5px',
            height: '5px' /* Adjust the height of the scrollbar */,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#2C2C2C',
            borderRadius: '20px',
            height: '20px' /* Adjust the height of the scrollbar thumb */,
          },
        }}
      >
        <Tabs index={tabs.tab} maxH="full" isLazy colorScheme="green">
          {TabsPanels}
        </Tabs>
      </Dialog.Body>
      {tabs.is(MemberTabState.FORM) && (
        <>
          <Dialog.Actions
            sx={{
              '&>hr': {
                marginTop:
                  isExtraSmallDevice && formState.isEditMember ? '0' : 4,
              },
            }}
            maxW={480}
            mt={{ base: isExtraSmallDevice ? -6 : 'auto', xs: 'unset' }}
            p={0}
          >
            {!isEditMember ? (
              <Dialog.SecondaryAction
                w="25%"
                onClick={formState?.handleSecondaryAction}
              >
                {formState?.secondaryAction}
              </Dialog.SecondaryAction>
            ) : (
              <Dialog.TertiaryAction
                onClick={formState.handleTertiaryAction}
                leftIcon={<RemoveIcon color="error.500" />}
                isDisabled={!formState?.tertiaryAction}
                isLoading={formState?.isLoading}
                w="50%"
                _hover={{
                  opacity: 0.8,
                }}
              >
                {formState.tertiaryAction}
              </Dialog.TertiaryAction>
            )}
            <Dialog.PrimaryAction
              w={isEditMember ? '50%' : '75%'}
              _hover={{
                opacity: 0.8,
              }}
              onClick={formState?.handlePrimaryAction}
              leftIcon={!isEditMember ? <PlusSquareIcon /> : <RefreshIcon />}
              isDisabled={!formState?.isValid}
              isLoading={formState?.isLoading}
            >
              {formState.primaryAction}
            </Dialog.PrimaryAction>
          </Dialog.Actions>
        </>
      )}
    </Dialog.Modal>
  );
};

export { CreateMemberPage };
