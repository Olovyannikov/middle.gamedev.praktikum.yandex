import { baseApi } from '@/services/baseApi';
import {
    FORUM_TAGS,
    ForumCreatePostRequest,
    ForumCreateTopicResponse,
    TopicResponse,
} from '@/services/ForumService/Forum.dto';
import { baseLocalApi } from '@/services/settings';

const FORUM_ENDPOINTS = {
    ALL_TOPICS: baseLocalApi + '/topic',
    CREATE_TOPIC: baseLocalApi + '/topic',
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
            createTopic: builder.mutation<ForumCreateTopicResponse, ForumCreatePostRequest>({
                query: (body) => ({
                    url: FORUM_ENDPOINTS.CREATE_TOPIC,
                    method: 'POST',
                    credentials: 'include',
                    body,
                }),
                invalidatesTags: [FORUM_TAGS.TOPIC],
            }),
        }),
    });

export const { useGetAllPostsQuery, useCreateTopicMutation } = ForumService;
