import Layout from "components/Layout";
import NavBar from "components/NavBar"
import { usePostsQuery } from "generated/graphql";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "utils/createUrqlClient";
import { Link } from "@chakra-ui/core";
import NextLink from "next/link";

const Index = () => {
    const [{ data }] = usePostsQuery();

    return (<Layout>
        <NextLink href = "/create-post">
        <Link>
            Create Post
        </Link>
        </NextLink>
        <br/>
        {!data ? (<div>Loading....</div>): (
            data.posts.map((post) => <div key = {post.id}>
                {post.title}
            </div>)
        )}

    </Layout>);
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
