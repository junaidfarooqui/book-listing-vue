<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import BookDetailsBox from "@/components/BookDetailsBox.vue";
import CommentsBox from "@/components/CommentsBox.vue";

const route = useRoute();
const router = useRouter();
const book = ref({});
const errorMessage = ref('');



onMounted(async () => {
  const slug = route?.params?.slug; // Log this to ensure it's correct
  const bookURL = `http://localhost:3000/books/${slug}`;

  try {
    const response = await axios.get(bookURL);
    book.value = response.data; // Ensure this is correctly updating your component's state
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'Book not found!';
    } else {
      errorMessage.value = 'An error occurred while fetching the book';
    }
  }
});


const goBack = async () => {
  await router.back();
}
</script>

<template>
  <div class="container my-4 book-page">
    <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    <div v-else>
      <!-- Book display section -->
      <div class="row">
        <div class="col-12 mb-3">
          <a href="javascript:;" @click="goBack" class="btn-back btn btn-primary">Back</a>
        </div>
        <BookDetailsBox :book="book" />
      </div>
      <!-- Comment form section -->
      <CommentsBox />
    </div>
  </div>
</template>

