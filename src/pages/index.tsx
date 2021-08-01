import  NavBar  from "components/NavBar"
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "utils/createUrqlClient";
const Index = () => (
 <div>
     <NavBar></NavBar>
     H
 </div>
)

export default withUrqlClient(createUrqlClient)(Index);
