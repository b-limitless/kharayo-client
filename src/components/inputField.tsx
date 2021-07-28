import React, { InputHTMLAttributes } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
} from "@chakra-ui/react"
import { useField } from "formik";
import { Input } from "@chakra-ui/core";

type inputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
};

const style = {
    border: '1px solid #000000',
    padding: '5px 5px',
    height: '38px',
}

const InputField: React.FC<inputFieldProps> = ({label, size:_, ...props}) => {
    const [field, { error }] = useField(props)
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor= {field.name}>{label}</FormLabel>
            <Input {...props} {...field} id={field.name} placeholder= {props.placeholder} style = {style} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}

export default InputField;