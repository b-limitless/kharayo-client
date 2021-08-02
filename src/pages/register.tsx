import React from 'react'
import { Formik, Form } from 'formik';
import InputField from '../components/inputField';
import Wrapper from '../components/wrapper';
import { Box } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from 'utils/toErrorMap';
import { useRouter } from 'next/router'
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from 'utils/createUrqlClient';
interface registerProps {
}

const btnStyle = {
    backgroundColor: 'rgba(0,118,255,0.9)',
    border: '1px solid rgba(0,118,255,0.9)',
    color: '#fff',
    padding: '15px 25px',
    margin: 0,
    fontWeight: 500,
    borderRadius: '7px',

}


const Register: React.FC<registerProps> = ({ }) => {
   const router = useRouter();
   const [, register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={async(values, {setErrors}) => {
                   const response =  await register(values);
                   if(response.data?.register.errors) {
                    setErrors(toErrorMap(response.data.register.errors));
                   } else if (response.data?.register.user) {
                     router.push('/');
                   }
                }}
            >
                {({isSubmitting}) => (
                    <Form>
                         <Box mt = {4}>
                         <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        </Box>
                       
                       <Box mt = {4}>
                       <InputField
                            name="password"
                            placeholder="password"
                            label="Password"
                            type="password"
                        />
                       </Box>
                       <Box mt = {2}>
                       <Button 
                         style = {btnStyle} 
                         mt = {4} 
                         type = "submit" 
                         isLoading = {isSubmitting}
                         >
                            Register
                        </Button>
                       </Box>
                        
                    </Form>
                )}
            </Formik>
        </Wrapper>)
}
export default withUrqlClient(createUrqlClient)(Register);