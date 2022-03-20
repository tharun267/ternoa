import React from 'react'
import { NextPage } from 'next'
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Card, Form, Header } from '../components'
import { Signature } from '../components/Form/Form';

const Home: NextPage<{ cardsList: Signature[] }> = ({ cardsList }: { cardsList: Signature[] }) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [currentSignature, setCurrentSignature] = React.useState<Signature>();
    return <>
        <Header onFormOpen={onOpen} />
        <SimpleGrid minChildWidth='400px' spacing='40px'>
            {cardsList.map((signature, i) => <Card
                key={i}
                signature={signature}
                onFormOpen={onOpen}
                setCurrentSignature={setCurrentSignature}
            />)}
        </SimpleGrid>
        <Form
            modalProps={{ isOpen, onClose }}
            signature={currentSignature}
            setCurrentSignature={setCurrentSignature}
        />
    </>
}

export async function getServerSideProps({ req }) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
    const response = await fetch(baseUrl + '/signature');
    const cardsList = await response.json();
    return { props: { cardsList } }
}

export default Home;