import type { ConstructorPayload } from '@/entities/Comment/types';

export const commentConstructor = ({ author, content }: ConstructorPayload) => ({
	commentId: Date.now(),
	author,
	content,
	publication: Date.now(),
	statistic: {
		likes: 0,
		dislikes: 0,
	},
	replies: [],
	status: 'existing',
});
