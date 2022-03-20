import React from 'react'
import { NextPage } from 'next'
import { SimpleGrid } from '@chakra-ui/react';
import { Card, Header } from '../components'

const Home: NextPage = ({ cardsList }) => {
    return <>
        <Header />
        <SimpleGrid minChildWidth='400px' spacing='40px'>
            {cardsList.map((c, i) => <Card
                key={i}
                title={c.title}
                description={c.description}
                imageUrl={c.imageUrl}
            />)}
        </SimpleGrid>
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