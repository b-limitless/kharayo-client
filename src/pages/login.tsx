import React from 'react'
import { Formik, Form } from 'formik';
import InputField from 'components/inputField';
import Wrapper from 'components/wrapper';
import { Box, Link } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from 'utils/toErrorMap';
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from 'utils/createUrqlClient';
import NextLink from 'next/link';

interface loginProps {
}

export const btnStyle = {
    backgroundColor: 'rgba(0,118,255,0.9)',
    border: '1px solid rgba(0,118,255,0.9)',
    color: '#fff',
    padding: '15px 25px',
    margin: 0,
    fontWeight: 500,
    borderRadius: '7px',

}


const Login: React.FC<loginProps> = ({ }) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    console.log(router)
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={
                    { usernameOrEmail: "", password: "" }
                }
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        if(typeof router.query.next === 'string') {
                            router.push(router.query.next);
                        } else {
                            router.push('/');
                        }   
                        
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box mt={4}>
                            <InputField
                                name="usernameOrEmail"
                                placeholder="username or email"
                                label="Username or Email"
                            />
                        </Box>

                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Box mt={2}>
                            <Button
                                style={btnStyle}
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Login
                            </Button>
                        </Box>
                        <NextLink href = "/forgot-password"><Link>
                            Request Reset Password
                        </Link></NextLink>

                    </Form>
                )}
            </Formik>
        </Wrapper>)
}
export default withUrqlClient(createUrqlClient)(Login);