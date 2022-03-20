import React from 'react'
import { NextPage } from 'next'
import { Box } from '@chakra-ui/react'
import { Header } from '../components'

const Home: NextPage = () => {
    return <>
        <Header />
        <Box p={4}>Main Content Here</Box>
    </>
}

export default Home;