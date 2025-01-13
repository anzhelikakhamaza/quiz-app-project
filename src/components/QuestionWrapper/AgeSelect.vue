<script setup>
import QuestionTemplate from "@/components/QuestionTemplate.vue";

defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <QuestionTemplate :currentPage="currentPage"/>
</template>

<style scoped></style>