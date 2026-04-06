/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  #graphql\n  mutation followUser($followingId: ID!) {\n    followUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n": typeof types.FollowUserDocument,
    "\n  #graphql\n  mutation unfollowUser($followingId: ID!) {\n    unfollowUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n": typeof types.UnfollowUserDocument,
    "#graphql\n    query GetAllTweets{\n       getAllTweets {\n    id\n    content\n    imageUrl\n    author {\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n  }\n    }\n\n": typeof types.GetAllTweetsDocument,
    "\n  query getSuggestedUsers {\n    suggestedUsers {\n      id\n      email\n      firstName\n      lastName\n      profileImageUrl\n      followerCount\n      followingCount\n      isFollowing  # ✅ NEW: Added this field\n    }\n  }\n": typeof types.GetSuggestedUsersDocument,
};
const documents: Documents = {
    "\n  #graphql\n  mutation followUser($followingId: ID!) {\n    followUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n": types.FollowUserDocument,
    "\n  #graphql\n  mutation unfollowUser($followingId: ID!) {\n    unfollowUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n": types.UnfollowUserDocument,
    "#graphql\n    query GetAllTweets{\n       getAllTweets {\n    id\n    content\n    imageUrl\n    author {\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n  }\n    }\n\n": types.GetAllTweetsDocument,
    "\n  query getSuggestedUsers {\n    suggestedUsers {\n      id\n      email\n      firstName\n      lastName\n      profileImageUrl\n      followerCount\n      followingCount\n      isFollowing  # ✅ NEW: Added this field\n    }\n  }\n": types.GetSuggestedUsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation followUser($followingId: ID!) {\n    followUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation followUser($followingId: ID!) {\n    followUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  mutation unfollowUser($followingId: ID!) {\n    unfollowUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation unfollowUser($followingId: ID!) {\n    unfollowUser(followingId: $followingId) {\n      success\n      message\n      user {\n        id\n        firstName\n        lastName\n        profileImageUrl\n        followerCount\n        followingCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetAllTweets{\n       getAllTweets {\n    id\n    content\n    imageUrl\n    author {\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n  }\n    }\n\n"): (typeof documents)["#graphql\n    query GetAllTweets{\n       getAllTweets {\n    id\n    content\n    imageUrl\n    author {\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n  }\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSuggestedUsers {\n    suggestedUsers {\n      id\n      email\n      firstName\n      lastName\n      profileImageUrl\n      followerCount\n      followingCount\n      isFollowing  # ✅ NEW: Added this field\n    }\n  }\n"): (typeof documents)["\n  query getSuggestedUsers {\n    suggestedUsers {\n      id\n      email\n      firstName\n      lastName\n      profileImageUrl\n      followerCount\n      followingCount\n      isFollowing  # ✅ NEW: Added this field\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;