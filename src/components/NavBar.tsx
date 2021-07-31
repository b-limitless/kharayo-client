import React from 'react'
import { Box, Link, Flex } from '@chakra-ui/core';
import NextLink from 'next/link';
import { useMeQuery } from 'generated/graphql';

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ data, fetching }] = useMeQuery();
    let body = null;

    if (fetching) {
        body = null;
    } else if (!data?.me) {
        body = (
            <><NextLink href="/login">
                <Link mr={2} color="black">
                    Login
                </Link>
            </NextLink>
                <NextLink href="/reigster">
                    <Link color="black">
                        Register
                    </Link>
                </NextLink></>
        )
    } else {
        body = (
            <Flex>
                <Box mr = "2">{data?.me.username}
                </Box>
                <Box>
                <button>Logout</button>
                </Box>
            </Flex>
            
        );
    }
    return (
        <Flex bg="gray" padding={2} ml="auto">

            <Box ml={"auto"}>
                {body}
            </Box>

        </Flex>
    );
}

export default NavBar;