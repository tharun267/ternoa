import Image from 'next/image';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  HStack,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

type Props = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

const Card: React.FC<Props> = ({ title, description, imageUrl, id }) => {
  const router = useRouter();
  const handleDeleteSignature = async () => {
    // setLoading(true);
    const response = await fetch(`http://localhost:3000/signature/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    await response.json();
    // setLoading(false);
    // onClose();
    router.replace(router.asPath);
}


  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}>
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-6}
          mx={-6}
          mb={6}
          pos={'relative'}>
          <Image
            src={imageUrl}
            layout={'fill'}
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {title}
          </Heading>
          <Text color={'gray.500'}>
            {description}
          </Text>
        </Stack>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <div />
          <HStack mt={4}>
            <Button colorScheme='green'>Update</Button>
            <Button colorScheme='red' onClick={handleDeleteSignature}>Delete</Button>
          </HStack>
        </Flex>
      </Box>
    </Center>
  );
}

export default Card;