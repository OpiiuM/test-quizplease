import type { Author } from '@/entities/Profile/types';

export type CommentStatus = 'existing' | 'deleted';

export type Comment = {
	commentId: number;
	author: Author;
  content: string;
	publication: number;
	statistic: {
    likes: number;
    dislikes: number;
  };
	replies: Array<Comment>;
	status: CommentStatus;
};

export type ConstructorPayload = Pick<Comment, 'author' | 'content'>;
export type FindCommentKey = keyof Pick<Comment, 'commentId' | 'content' | 'author'>;
export type FindCommentValue<T> = T extends 'commentId' ? number : string;
