<script setup lang="ts">
import CommentItem from './CommentItem.vue';

interface Props {
  data: Array<Comment>;
}

defineProps<Props>();
</script>

<template>
  <ul class="comment-list">
    <template
      v-for="comment in data"
      :key="comment.commentId"
    >
      <li 
        v-if="comment.status === 'existing'"
        class="comment-list__item"
      >
        <comment-item :comment="comment" />
      </li>
    </template>
  </ul>
</template>

<style scoped>
.comment-list .comment-list {
  padding-left: .75rem;
}

@media (min-width: 768px) {
  .comment-list .comment-list {
    padding-left: 1rem;
  }
}

@media (min-width: 1024px) {
  .comment-list .comment-list {
    padding-left: 2rem;
  }
}

.comment-list__item {
  margin-bottom: 2rem;
}

.comment-list__item:last-child {
  margin-bottom: 0;
}
</style>
