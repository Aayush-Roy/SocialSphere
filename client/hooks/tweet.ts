import { graphqlClient } from "@/gqlClients/api";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { CreateTweetData, CreateTweetMutationVariables } from "@/src/gql/graphql";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCreateTweet=()=>{
    const queryClient=useQueryClient();
    const mutation = useMutation({
        mutationFn:(payload:CreateTweetData)=>graphqlClient.request(createTweetMutation,{payload}),
        onSuccess:async(payload)=>{
           await queryClient.invalidateQueries(["all-tweets"])
           toast.success('Post Created');
        }
    });
    return mutation;

}
// export const useCreateTweet = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: CreateTweetData) =>
//       graphqlClient.request(createTweetMutation, { payload }),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["all-tweets"],
//       });
//     },
//   });
// };



// export const useCreateTweet = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (payload: CreateTweetMutationVariables["payload"]) =>
//       graphqlClient.request(createTweetMutation as any, { payload }),

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["all-tweets"],
//       });
//     },
//   });
// };
export const useGetAllTweets = ()=>{
    const query = useQuery({
        queryKey:['all-tweets'],
        queryFn:()=>graphqlClient.request(getAllTweetsQuery)
    })
    return {...query, tweets:query.data?.getAllTweets}
}