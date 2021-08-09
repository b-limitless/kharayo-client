import { Box, Link } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import InputField from 'components/inputField';
import Wrapper from 'components/wrapper';
import { Form, Formik } from 'formik';
import { btnStyle } from "./login";
import router  from 'next/router';

const CreatePost: React.FC<{}> = ({}) => {
        return (
            <Wrapper variant="small">
            <Formik
                initialValues={
                    { title: "", text: "" }
                }
                onSubmit={async (values) => {
                    console.log(values)
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
        </Wrapper>
        );
}

export default CreatePost;