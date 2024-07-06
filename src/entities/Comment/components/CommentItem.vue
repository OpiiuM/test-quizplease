<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import type { Comment } from '@/entities/Comment/types';

import { useProfileStore } from '@/entities/Profile/store';
import { useCommentStore } from '@/entities/Comment/store';
import CommentList from '@/entities/Comment/components/CommentList.vue';
import CommentLike from '@/entities/Comment/components/CommentLike.vue';
import { commentConstructor } from '@/utils';

withDefaults(defineProps<{
  comment: Comment;
  disabled?: boolean;
}>(), {
  disabled: false,
});

const publicationLabel = (publication: number) => {
	return new Date(publication).toLocaleDateString();
};

const publicationValue = (publication: number) => { 
	return publicationLabel(publication).split('.').reverse().join('-');
};

const commentStore = useCommentStore();
const { getComment } = storeToRefs(commentStore);

const toggleLike = (id: number) => {
  const comment = getComment.value('commentId', id);

  if (!comment) return;

  comment.statistic.likes += 1;

  if (comment.statistic.dislikes !== 0) {
    comment.statistic.dislikes -= 1;
  }
};

const toggleDislike = (id: number) => {
  const comment = getComment.value('commentId', id);

  if (!comment) return;

  comment.statistic.dislikes += 1;

  if (comment.statistic.likes !== 0) {
    comment.statistic.likes -= 1;
  }
};

const isNewReply = ref(false);
const newReplyValue = ref('');

const profileStore = useProfileStore();
const { user } = storeToRefs(profileStore);

const replyComment = (comment: Comment) => {
	const reply = commentConstructor({
    author: user.value,
    content: newReplyValue.value,
  });

  newReplyValue.value = '';
  isNewReply.value = false;
	comment.replies.push(reply as Comment);
};

const isEdit = ref(false);
const editValue = ref('');

const checkAuthorComment = (id: number) => {
  return user.value.authorId !== id;
};

const editComment = (comment: Comment) => {
	if (checkAuthorComment(comment.author.authorId)) return;

	isEdit.value = true;
	editValue.value = comment.content;
};

const saveComment = (comment: Comment) => {
  if (checkAuthorComment(comment.author.authorId)) return;

  isEdit.value = false;
  comment.content = editValue.value;
};

const deleteComment = (comment: Comment) => {
	if (checkAuthorComment(comment.author.authorId)) return;

  comment.status = 'deleted';
};
</script>

<template>
  <div class="comment-item">
    <div class="comment-item__header flex items-center flex-wrap gap-x-4 mb-2">
      <img
        :src="comment.author.avatarUrl"
        :alt="`${comment.author.nickname} avatar`"
        class="comment-item__avatar w-[40px] h-[40px] rounded-full"
      />

      <p class="comment-item__author">
        {{ comment.author.nickname }}
      </p>

      <time
        :datetime="publicationValue(comment.publication)"
        class="comment-item__publication"
      >
        {{ publicationLabel(comment.publication) }}
      </time>
    </div>

    <div class="comment-item__content">
      <textarea v-if="isEdit" v-model="editValue" class="field" />
      <p v-else>{{ comment.content }}</p>
    </div>

    <div v-if="!disabled" class="comment-item__footer mt-4">
      <ul class="comment-item__actions flex flex-wrap gap-x-4 gap-y-4">
        <comment-like
          :id="comment.commentId"
          :statistic="comment.statistic"
          @like="toggleLike"
          @dislike="toggleDislike"
        />

        <li>
          <button @click="isNewReply = true">Reply</button>
        </li>

        <template v-if="user.authorId === comment.author.authorId">
          <li v-if="isEdit">
            <button @click="saveComment(comment)">Save comment</button>
          </li>       
          <li v-else>
            <button @click="editComment(comment)">Edit comment</button>
          </li>
        </template>

        <li v-if="user.authorId === comment.author.authorId">
          <button @click="deleteComment(comment)">Delete comment</button>
        </li>
      </ul>
    </div>

    <div v-if="isNewReply" class="comment-item__field mt-4">
      <textarea v-model="newReplyValue" class="field" />
      <div class="flex flex-wrap gap-x-2">
        <button @click="replyComment(comment)">Save</button>
        <button @click="isNewReply = false">Cancel</button>
      </div>
    </div>

    <div v-if="!disabled" class="comment-item__replies mt-4">
      <comment-list :data="comment.replies" />
    </div>
  </div>
</template>

<style scoped>
.comment-item__content textarea {
  width: 100%;
}
</style>
