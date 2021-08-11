import { Box, Link } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import InputField from 'components/inputField';
import Wrapper from 'components/wrapper';
import { Form, Formik } from 'formik';
import { btnStyle } from "./login";
import router  from 'next/router';
import { useCreatePostMutation, useMeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "utils/createUrqlClient";
import Layout from "components/Layout";
import { useEffect } from "react";
const CreatePost: React.FC<{}> = ({}) => {
     const [{data, fetching}] = useMeQuery();
     const router = useRouter();
     useEffect(() => {
        if(!fetching && !data?.me) {
            router.replace("/login");
        }
     }, [data, fetching])
     const [, createPost] = useCreatePostMutation();
   
        return (
            <Layout variant="small">
            <Formik
                initialValues={
                    { title: "", text: "" }
                }
                onSubmit={async (values) => {
                   const {error} = await createPost({input: values});
                   if(!error) {
                    router.push("/")
                   }
                   
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box mt={4}>
                            <InputField
                                name="title"
                                placeholder="Title"
                                label="Title"
                            />
                        </Box>

                        <Box mt={4}>
                            <InputField
                                textare= {true}
                                name="text"
                                placeholder="Body"
                                label="Body"
                                
                            />
                        </Box>
                        <Box mt={2}>
                            <Button
                                style={btnStyle}
                                mt={4}
                                type="submit"
                                isLoading={isSubmitting}
                            >
                                Create Post
                            </Button>
                        </Box>
                        

                    </Form>
                )}
            </Formik>
        </Layout>
        );
}

export default withUrqlClient(createUrqlClient)(CreatePost) ;