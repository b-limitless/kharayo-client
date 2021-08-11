import { useMeQuery } from "generated/graphql";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login");
    }
  }, [data, fetching, router]);
};
