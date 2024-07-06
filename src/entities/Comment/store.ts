import { defineStore, storeToRefs } from 'pinia';
import type { Comment, FindCommentKey, FindCommentValue } from './types';
import { useProfileStore } from '@/entities/Profile/store';
import { commentConstructor } from '@/utils';
import data from '@/static/data.json';

interface State {
  comments: Array<Comment>;
}

export const useCommentStore = defineStore('comment', {
	state: (): State => ({
		comments: [],
	}),

	getters: {
		getComment: ({ comments }) => (key: FindCommentKey, value: FindCommentValue<FindCommentKey>) => {
			const stack = [...comments];

			while (stack.length > 0) {
				const currentComment = stack.pop();

        if (!currentComment) break;

				if (currentComment.replies.length > 0) {
					stack.push(...currentComment.replies);
				}

        switch (key) {
          case 'author':
            if (currentComment.author.nickname === value) {
              return currentComment;
            }
            break;
          case 'content':
            if (currentComment.content === value) {
              return currentComment;
            }
            break;
          case 'commentId':
            if (currentComment.commentId === value) {
              return currentComment;
            }
            break;
        }
			}

			return undefined;
		},
	},

	actions: {
		getComments() {
			this.comments = data as Array<Comment>;
		},

		addComment(content: string) {
			const profileStore = useProfileStore();
			const { user } = storeToRefs(profileStore);
			const comment = commentConstructor({ author: user.value, content }) as Comment;

			this.comments.push(comment);
		},
	},
});
