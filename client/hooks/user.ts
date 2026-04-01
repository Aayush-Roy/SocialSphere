import { graphqlClient } from "@/gqlClients/api";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";
export const useCurrentUser =()=>{
    // const query = useQuery({
    //     queryKey:["current-user"],
    //     queryFn:()=>graphqClient.request(getCurrentUserQuery)
    // })
    //  return { ...query, user: query.data?.getCurrentUser };
     const query = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: () => graphqlClient.request(getCurrentUserQuery),
  });
  return { ...query, user: query.data?.getCurrentUser };
}

