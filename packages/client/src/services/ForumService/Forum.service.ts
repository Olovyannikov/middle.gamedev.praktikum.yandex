import { baseApi } from '@/services/baseApi';
import { FORUM_TAGS } from '@/services/ForumService/Forum.dto';

// TODO: contract-first! replace all unknowns to correct Interfaces

export const ForumService = baseApi
    .enhanceEndpoints({
        addTagTypes: Object.keys(FORUM_TAGS),
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getPostById: builder.query<unknown, string>({
                query: (id) => `/${id}`,
                providesTags: [FORUM_TAGS.POST],
            }),
        }),
    });

export const { useGetPostByIdQuery } = ForumService;
