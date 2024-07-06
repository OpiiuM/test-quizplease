import { defineStore } from 'pinia';
import type { Author } from './types';

interface State {
  user: Author;
}

export const useProfileStore = defineStore('profile', {
	state: (): State => ({
		user: {
			authorId: 1234567890,
			nickname: 'QuizPlease',
			avatarUrl: 'https://loremflickr.com/640/360?random=0',
		},
	}),
});
