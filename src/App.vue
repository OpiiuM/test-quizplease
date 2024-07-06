<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import type { Comment } from '@/entities/Comment/types'; 

import { useCommentStore } from '@/entities/Comment/store';
import CommentList from '@/entities/Comment/components/CommentList.vue';
import CommentItem from '@/entities/Comment/components/CommentItem.vue';

const commentStore = useCommentStore();
const { comments, getComment } = storeToRefs(commentStore);
const { getComments, addComment } = commentStore;

onMounted(() => {
	getComments();
});

const commentValue = ref('');

const handleSubmit = () => {
  if (commentValue.value === '') return;

  addComment(commentValue.value);
	commentValue.value = '';
};

const findUserComment = ref('');
const findComment = ref<Comment | undefined>(undefined);
const handleFind = () => {
  if (findUserComment.value === '') return;

  findComment.value = getComment.value('author', findUserComment.value);
};
</script>

<template>
  <div class="page">
    <main>
      <section class="py-4">
        <div class="container">
          <h1 class="text-4xl mb-3 pt-4">QuizPlease</h1>

          <form class="mb-4" @submit.prevent="handleSubmit">
            <input v-model="commentValue" type="text" class="field" />
            <button type="submit">Add comment</button>
          </form>

          <comment-list :data="comments" />

          <section class="mt-4 p-6 border-2 border-gray-100 rounded-lg">
            <h2 class="text-3xl mb-2">Find Comment by user</h2>
            
            <form @submit.prevent="handleFind">
              <input v-model="findUserComment" type="text" class="field" />
              <button type="submit">Find Comment By User</button>
            </form>

            <div v-if="findComment" class="mt-4">
              <comment-item :comment="findComment" disabled />
            </div>
          </section>
        </div>
      </section>
    </main>
  </div>
</template>
