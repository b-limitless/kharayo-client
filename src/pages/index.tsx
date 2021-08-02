import NavBar from "components/NavBar"
import { usePostsQuery } from "generated/graphql";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "utils/createUrqlClient";

const Index = () => {
    const [{ data }] = usePostsQuery();

    return (<div>
        <NavBar></NavBar>

    </div>);
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
