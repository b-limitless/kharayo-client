import { NextPage } from 'next';
import React from 'react';
import { Formik, Form } from 'formik';
import InputField from 'components/inputField';
import Wrapper from 'components/wrapper';
import { Box } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import { toErrorMap } from 'utils/toErrorMap';
import { btnStyle } from 'pages/login';

const ChagePassword: NextPage<{token: string}> = ({token}) => {

        return (<Wrapper variant="small">
        <Formik
            initialValues={
                { newPassword: ""}
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
                            name="newPassword"
                            placeholder="new password"
                            label="new password"
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

                </Form>
            )}
        </Formik>
    </Wrapper>);
}

ChagePassword.getInitialProps = ({query}) => {
    return {
        token: query.token as string,
    }
}


export default ChagePassword;