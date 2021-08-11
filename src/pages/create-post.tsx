import { Box } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import InputField from 'components/inputField';
import Layout from "components/Layout";
import { Form, Formik } from 'formik';
import { useCreatePostMutation } from "generated/graphql";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { createUrqlClient } from "utils/createUrqlClient";
import { useIsAuth } from "utils/useIsAuth";
import { btnStyle } from "./login";

const CreatePost: React.FC<{}> = ({}) => {
     const router = useRouter();
     
     useIsAuth();
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