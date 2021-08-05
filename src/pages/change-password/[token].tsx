import { NextPage } from 'next';
import React from 'react';
import { Formik, Form } from 'formik';
import InputField from 'components/inputField';
import Wrapper from 'components/wrapper';
import { Box } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import { toErrorMap } from 'utils/toErrorMap';
import { btnStyle } from 'pages/login';
import { useChangePasswordMutation } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from 'utils/createUrqlClient';

const ChagePassword: NextPage<{token: string}> = ({token}) => {
    const router = useRouter();
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState("");
    return (<Wrapper variant="small">
        <Formik
            initialValues={
                {
                    newPassword: "",
                    token: token
                }
            }
            onSubmit={async (values, { setErrors }) => {
                const {newPassword, token} = values;
                console.log('token',token);
                const response = await changePassword({ newPassword, token });
                if (response.data?.changePassword.errors) {
                    const errorMap = toErrorMap(response.data.changePassword.errors);
                    if('token' in errorMap) {
                        setTokenError(errorMap.token);
                    }
                    setErrors(errorMap);
                } else if (response.data?.changePassword.user) {
                    router.push('/');
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box mt={4}>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label="new password"
                        />
                    </Box>
                    <Box color = "red">{tokenError && tokenError}</Box>

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

                </Form>
            )}
        </Formik>
    </Wrapper>);
}

ChagePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string,
    }
}


export default withUrqlClient(createUrqlClient, {ssr:false})(ChagePassword);