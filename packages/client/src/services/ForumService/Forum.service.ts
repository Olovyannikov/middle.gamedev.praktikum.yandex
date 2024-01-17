import { baseApi } from '@/services/baseApi';
import {
    CommentRequest,
    CreateCommentRequest,
    FORUM_TAGS,
    ForumCreatePostRequest,
    ForumCreateTopicResponse,
    TopicResponse,
} from '@/services/ForumService/Forum.dto';
import { baseLocalApi } from '@/services/settings';

const FORUM_ENDPOINTS = {
    ALL_TOPICS: baseLocalApi + '/topic',
    CREATE_TOPIC: baseLocalApi + '/topic',
    COMMENT: baseLocalApi + '/comment',
} as const;

export const ForumService = baseApi
    .enhanceEndpoints({
        addTagTypes: Object.keys(FORUM_TAGS),
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllPosts: builder.query<Array<TopicResponse>, void>({
                query: (id) => ({
                    url: FORUM_ENDPOINTS.ALL_TOPICS,
                    credentials: 'include',
                }),
                providesTags: [FORUM_TAGS.TOPIC],
            }),
            getPostById: builder.query<TopicResponse, string>({
                query: (topicId) => ({
                    url: `${FORUM_ENDPOINTS.ALL_TOPICS}/${topicId}`,
                    credentials: 'include',
                }),
            }),
            getCommentsByPostId: builder.query<Array<CommentRequest>, string>({
                query: (topicId) => ({
                    url: `${FORUM_ENDPOINTS.COMMENT}/${topicId}`,
                    credentials: 'include',
                }),
                providesTags: [FORUM_TAGS.COMMENTS],
            }),
            createTopic: builder.mutation<ForumCreateTopicResponse, ForumCreatePostRequest>({
                query: (body) => ({
                    url: FORUM_ENDPOINTS.CREATE_TOPIC,
                    method: 'POST',
                    credentials: 'include',
                    body,
                }),
                invalidatesTags: [FORUM_TAGS.TOPIC],
            }),
            createComment: builder.mutation<void, CreateCommentRequest>({
                query: (body) => ({
                    url: FORUM_ENDPOINTS.COMMENT,
                    method: 'POST',
                    credentials: 'include',
                    body,
                }),
                invalidatesTags: [FORUM_TAGS.COMMENTS],
            }),
        }),
    });

export const {
    useCreateCommentMutation,
    useGetAllPostsQuery,
    useCreateTopicMutation,
    useGetPostByIdQuery,
    useGetCommentsByPostIdQuery,
} = ForumService;
