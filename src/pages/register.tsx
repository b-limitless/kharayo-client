import React from 'react'
import { Formik, Form } from 'formik';
import InputField from '../components/inputField';
import Wrapper from '../components/wrapper';
import { Box } from "@chakra-ui/core";
import { Button } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
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
   const [, register] = useRegisterMutation();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                onSubmit={async(values) => {
                   const response =  await register(values);
                   response.data?.register?.user?.id;
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
export default Register;