<script setup>
import { computed, ref } from "vue";
import useQuestionsStore from "@/stores/questionsStore.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { locale } = useI18n();

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
});

const errorMessage = ref("");
const questionsStore = useQuestionsStore();
const questionIndex = props.currentPage - 1;
const questionOption = questionsStore.questions[questionIndex];

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

  const isMultiSelect = props.currentPage === 4 || props.currentPage === 5;

  if (isMultiSelect) {
    if (questionOption.selectedValue.includes(option)) {
      questionOption.selectedValue.splice(
        questionOption.selectedValue.indexOf(option),
        1
      );
      return;
    }
    if (props.currentPage === 5 && questionOption.selectedValue.length >= 3) {
      errorMessage.value = "Not more than 3 options are allowed to choose";
      return;
    }
    questionOption.selectedValue.push(option);
    errorMessage.value = "";
  } else {
    questionOption.selectedValue = option;
  }
};

const getSelectedValue = computed(() => questionOption.selectedValue);
const options = computed(() => questionOption?.answers || "");
const showCheckbox = computed(() => props.currentPage === 4);
</script>

<template>
  <div
    v-for="(option, index) in options"
    :key="index"
    @click="handleOptionSelection(option)"
    :class="{
      'quiz-button--active':
        props.currentPage === 4 || props.currentPage === 5
          ? questionOption.selectedValue.includes(option)
          : getSelectedValue === option,
    }"
    class="quiz-button"
  >
    <div class="quiz-button-content">
      <div class="quiz-button-option">
        {{ t(option) }}
      </div>
      <div class="quiz-button-option-checkbox">
        <input
            class="checkbox"
          v-if="showCheckbox"
          type="checkbox"
          :checked="questionOption.selectedValue.includes(option)"
        />
      </div>
    </div>
  </div>
  <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
</template>

<style lang="scss">
@use "@/assets/styles/base/variables" as *;

.quiz-button-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .quiz-button-option {
    flex-grow: 1;
    text-align: center;
  }

  .quiz-button-option-checkbox {
    margin-left: 10px;

    input[type="checkbox"] {
      cursor: pointer;
      width: 20px;
      height: 20px;
      appearance: none;
      border-radius: 4px;
      background-color: $background-color;
      transition: all 0.3s ease;

      &:checked {
        background-color: $button-color;

        &::after {
          content: "";
          display: block;
          width: 10px;
          height: 10px;
          margin: auto;
          background-color: $button-color;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>