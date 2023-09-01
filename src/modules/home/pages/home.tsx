import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import { MdChevronRight } from 'react-icons/md';

import { Loader } from '@/components';
import { DefaultLayout } from '@/layouts';

import { useHome } from '../hooks';

const HomePage = () => {
  const { account, request, navigate } = useHome();
  const { isLoading, predicates } = request;

  console.log('[HOME] Account:', { account });

  return (
    <DefaultLayout>
      <Flex width="100%" justifyContent="center" mt={20}>
        <Card bg="dark.500" color="white" minW={600} boxShadow="xl">
          {isLoading && !predicates ? (
            <Loader w={600} h={500} />
          ) : (
            <>
              <CardHeader>
                <Flex width="100%" justifyContent="space-between">
                  <Heading size="lg">Predicates</Heading>

                  {!!predicates?.length && (
                    <Button
                      size="xs"
                      color="brand.900"
                      variant="solid"
                      colorScheme="brand"
                      loadingText="Connecting.."
                      onClick={() => navigate('/create-predicate')}
                    >
                      Create
                    </Button>
                  )}
                </Flex>
                <Box mt={2} maxW={400}>
                  <Text fontSize="sm" color="gray">
                    Click on “Create” and start a vault for your company, family
                    or friends to perform secure transactions.
                  </Text>
                </Box>
              </CardHeader>

              <CardBody>
                {!!predicates && predicates.length > 0 ? (
                  <Box w="100%">
                    {predicates?.map((predicate) => (
                      <Flex
                        onClick={() => navigate(`/predicate/${predicate._id}`)}
                        key={predicate.name}
                        justifyContent="space-between"
                        alignItems="center"
                        py={2}
                        px={3}
                        mb={2}
                        bg="dark.100"
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{ bg: 'dark.200' }}
                      >
                        <Box>
                          <Text>{predicate.name}</Text>
                          <Text color="gray">{predicate.description}</Text>
                        </Box>

                        <Icon color="gray" fontSize="xl" as={MdChevronRight} />
                      </Flex>
                    ))}
                  </Box>
                ) : (
                  <Flex
                    flexDirection="column"
                    textAlign="center"
                    justifyContent="center"
                    w="100%"
                  >
                    <Box mb={4}>
                      <Text>Not found predicates.</Text>
                    </Box>
                    <Button
                      color="brand.900"
                      variant="solid"
                      colorScheme="brand"
                      loadingText="Connecting.."
                      onClick={() => navigate('/create-predicate')}
                    >
                      Create
                    </Button>
                  </Flex>
                )}
              </CardBody>
            </>
          )}
        </Card>
      </Flex>
    </DefaultLayout>
  );
};

export { HomePage };