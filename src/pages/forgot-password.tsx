import React from 'react'
import { Formik, Form } from 'formik';
import InputField from 'components/inputField';
import Wrapper from 'components/wrapper';
import { Box, Link } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import { toErrorMap } from 'utils/toErrorMap';
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from 'utils/createUrqlClient';
import { btnStyle } from 'pages/login';


const ForgotPassword: React.FC = ({}) => {
        return (<Wrapper variant="small">
        <Formik
            initialValues={
                { usernameOrEmail: "", password: "" }
            }
            onSubmit={async (values, { setErrors }) => {
                // const response = await login(values);
                // if (response.data?.login.errors) {
                //     setErrors(toErrorMap(response.data.login.errors));
                // } else if (response.data?.login.user) {
                //     router.push('/');
                // }
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Box mt={4}>
                        <InputField
                            name="email"
                            placeholder="email"
                            label="Email"
                            type="text"
                        />
                    </Box>
                    <Box mt={2}>
                        <Button
                            style={btnStyle}
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            forgot password
                        </Button>
                    </Box>
                    

                </Form>
            )}
        </Formik>
    </Wrapper>);
}

export default withUrqlClient(createUrqlClient)(ForgotPassword);