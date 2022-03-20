import React from 'react'
import { NextPage } from 'next'
import { SimpleGrid } from '@chakra-ui/react';
import { Card, Header } from '../components'

const Home: NextPage = () => {
    const cardsList = Array(10).fill({
        title: "Title",
        description: "Hello World",
        imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    });
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

export default Home;