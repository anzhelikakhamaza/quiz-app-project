<script setup>
import { computed } from "vue";
import useQuestionsStore from "@/stores/questionsStore.js";
import SelectableItem from "@/components/SelectableItem.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
});

const questionsStore = useQuestionsStore();

const questionTitle = computed(
  () => questionsStore.questions[props.currentPage - 1]?.question || ""
);
const subTitle = computed(
  () => questionsStore.questions[props.currentPage - 1]?.subtitle || ""
);
</script>

<template>
  <div class="quiz-container">
    <div class="quiz-question">
      <h1 class="quiz-question-title">{{ t(questionTitle) }}</h1>
      <p class="quiz-question-subtitle">{{ t(subTitle) }}</p>
    </div>
    <div class="quiz-buttons">
      <SelectableItem :current-page="currentPage" />
    </div>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/base/variables" as *;

.quiz-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .quiz-question {
    text-align: center;
    margin-bottom: 24px;
  }
}

.quiz-question-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.quiz-question-subtitle {
  color: $subtitle-color;
  font-size: 16px;
  margin: 8px 0 0;
}

.quiz-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.quiz-button {
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  border-radius: 12px;
  background-color: $option-button-bg-color;
  color: $text-color;
  text-align: center;
  transition: background-color 0.3s ease;
}

.quiz-button:hover {
  background-color: $button-color;
}

.quiz-button--active {
  background-color: $button-color-one;
  font-weight: bold;
  border: solid $button-color;
}
</style>