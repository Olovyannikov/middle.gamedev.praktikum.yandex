export const FORUM_TAGS = {
    TOPIC: 'TOPIC',
    COMMENTS: 'COMMENTS',
} as const;

export interface ForumCreatePostRequest {
    title: string;
    text: string;
}

export interface ForumCreateTopicResponse {
    authorId: number;
    createdAt: Date | string;
    id: number;
    text: string;
    title: string;
    updatedAt: Date | string;
}

export interface TopicResponse extends ForumCreateTopicResponse {
    author: {
        name: string;
        avatar: string;
    };
}

export type CommentRequest = TopicResponse;

export interface CreateCommentRequest {
    text: string;
    parentComment: string | null;
    topicId?: string;
}
