<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

interface Comment {
  name: string;
  email: string;
  comment: string;
}

const route = useRoute();
const comments = ref<Comment[]>([]);
const name = ref('');
const email = ref('');
const commentText = ref('');

const submitComment = () => {
  const newComment = { name: name.value, email: email.value, comment: commentText.value };
  comments.value.push(newComment);
  localStorage.setItem(`comments-${route.params.slug}`, JSON.stringify(comments.value));
  name.value = '';
  email.value = '';
  commentText.value = '';
}

const loadComments = () => {
  const storedComments = localStorage.getItem(`comments-${route.params.slug}`);
  if (storedComments) {
    comments.value = JSON.parse(storedComments);
  }
}

onMounted( ()=> {
  loadComments(); // Load comments after the book data is set
})
</script>

<template>
  <div class="row mt-3 comments-section">
    <div class="col-12">
      <h2>Add a Comment</h2>
      <form @submit.prevent="submitComment">
        <input v-model="name" name="name" type="text" placeholder="Name" required class="form-control mb-2">
        <input v-model="email" name="email" type="email" placeholder="Email" required class="form-control mb-2">
        <textarea v-model="commentText" name="comment" placeholder="Comment" required class="form-control mb-2"></textarea>
        <button type="submit" class="btn btn-success">Submit</button>
      </form>
    </div>
    <div v-if="comments.length > 0" class="col-12 mt-5">
      <h2>Comments</h2>
      <div v-for="(comment, index) in comments" :key="index" :class="['shadow-sm card mb-3 p-3', index % 2 === 0 ? 'even' : 'odd']">
        <p class="mb-3 text-primary">{{ comment.name }} - <i>{{ comment.email }}</i></p>
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>