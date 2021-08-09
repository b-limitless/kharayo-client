import React, {useState } from 'react'
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
import { useForgotPasswordMutation } from 'generated/graphql';


const ForgotPassword: React.FC = ({}) => {
        const [complete, setComplete] = useState<boolean>(false);
        const [, forgotPassword] = useForgotPasswordMutation();
        return (<Wrapper variant="small">
        <Formik
            initialValues={
                { email: "" }
            }
            onSubmit={async (values) => {
              await forgotPassword(values);
              setComplete(true);
            }}
        >
            {({ isSubmitting }) =>  complete ? <Box color = "green">An email has been sent to you</Box> : (
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