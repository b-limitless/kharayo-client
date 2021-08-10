import React from "react"
import { Box } from "@chakra-ui/react";

export type WrapperVariant = "small" | "regular";

interface wrapperProps {
    variant?: WrapperVariant
}

const Wrapper: React.FC<wrapperProps> = ({ children, variant = "regular" }) => {
    return (
        <Box  
         maxW={variant === "regular" ? "800px" : "400px"} 
         w="100%" 
         mt={15} 
         mx="auto">
            {children}
        </Box>
    );
}

export default Wrapper;