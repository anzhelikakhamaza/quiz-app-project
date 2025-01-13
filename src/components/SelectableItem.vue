<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { computed } from "vue";
import useQuestionsStore from "@/stores/questionsStore.js";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
});

const { locale } = useI18n();
const questionsStore = useQuestionsStore();

const options = computed(
    () => questionsStore.questions[props.currentPage - 1]?.answers || ""
);

const languageAlias = {
  english: "en",
  french: "fr",
  german: "de",
  spanish: "es",
};

const questionIndex = props.currentPage - 1;

const handleOptionSelection = (option) => {
  if (props.currentPage === 1) {
    const lang = option.split(".")[1];
    locale.value = languageAlias[lang];
  }

  questionsStore.questions[questionIndex].selectedValue = option;
};

const getSelectedValue = computed(
    () => questionsStore.questions[props.currentPage - 1].selectedValue
);
</script>

<template>
  <div
      v-for="(option, index) in options"
      :key="index"
      @click="handleOptionSelection(option)"
      :class="{ 'quiz-button--active': option === getSelectedValue }"
      class="quiz-button"
  >
    {{ t(option) }}
  </div>
</template>

<style scoped></style>