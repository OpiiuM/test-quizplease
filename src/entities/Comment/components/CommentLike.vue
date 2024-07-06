<script setup lang="ts">
import { ref } from  'vue';
import type { Comment } from '@/entities/Comment/types';

const props = defineProps<{
  id: number;
  statistic: Comment['statistic'];
}>();

const emit = defineEmits<{
  (e: 'like', id: number): void;
  (e: 'dislike', id: number): void;
}>();

const isLiked = ref(false);
const isDisliked = ref(false);

const handleLike = () => {
  isLiked.value = true;
  isDisliked.value = false;

  emit('like', props.id);
};

const handleDislike = () => {
  isDisliked.value = true;
  isLiked.value = false;

  emit('dislike', props.id);
};
</script>

<template>
  <li>
    <button :disabled="isLiked" class="like" @click="handleLike">
      Like {{ statistic.likes }}
    </button>
  </li>

  <li>
    <button :disabled="isDisliked" class="dislike" @click="handleDislike">
      Dislike {{ statistic.dislikes }}
    </button>
  </li>
</template>
