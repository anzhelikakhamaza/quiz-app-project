<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import {computed, ref} from "vue";
import useQuestionsStore from "@/stores/questionsStore.js";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
});

const errorMessage = ref("");

const { locale } = useI18n();
const questionsStore = useQuestionsStore();
const questionIndex = props.currentPage - 1;

const questionOption = questionsStore.questions[questionIndex];

const options = computed(
    () => questionOption?.answers || ""
);

const languageAlias = {
  english: "en",
  french: "fr",
  german: "de",
  spanish: "es",
};

const handleOptionSelection = (option) => {
  if (props.currentPage === 1) {
    const lang = option.split(".")[1];
    locale.value = languageAlias[lang];
  }

  if (props.currentPage === 4 || props.currentPage === 5) {
    if (Array.isArray(questionOption.selectedValue)) {
      questionOption.selectedValue.push(option);
      }

      if (questionOption.selectedValue.includes(option)) {
        return;
      }

      if (props.currentPage === 5 && questionOption.selectedValue.length >= 3) {
        errorMessage.value = "Not more than 3 options are allowed to choose";
        return;
      }

    errorMessage.value = "";
  } else {
    questionOption.selectedValue = option;
  }
};

// const getSelectedValue = computed(
//     () => questionOption.selectedValue
// );

const showCheckbox = computed(() => props.currentPage === 4);
</script>

<template>
  <div
      v-for="(option, index) in options"
      :key="index"
      @click="handleOptionSelection(option)"
      :class="{ 'quiz-button--active': (props.currentPage === 4 || props.currentPage === 5) ? questionOption.selectedValue.includes(option) : questionOption.selectedValue === option, }"
      class="quiz-button"
  >
    {{ t(option) }}
    <input v-if="showCheckbox" type="checkbox" :checked="questionOption.selectedValue.includes(option)">
  </div>
  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<style scoped></style>