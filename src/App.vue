<script setup>
import { computed, ref } from "vue";

import Stepper from "@/components/Stepper.vue";
import LanguageSelect from "@/components/QuestionsWrapper/LanguageSelect.vue";
import GenderSelect from "@/components/QuestionsWrapper/GenderSelect.vue";
import AgeSelect from "@/components/QuestionsWrapper/AgeSelect.vue";
import BookPreferences from "@/components/QuestionsWrapper/BookPreferences.vue";
import FavoriteTopics from "@/components/QuestionsWrapper/FavoriteTopics.vue";
import CircleLoader from "@/components/CircleLoader.vue";
import EmailVerification from "@/components/EmailVerification.vue";
import ThankYou from "@/components/ThankYou.vue";

const pageObject = {
  1: LanguageSelect,
  2: GenderSelect,
  3: AgeSelect,
  4: BookPreferences,
  5: FavoriteTopics,
  6: CircleLoader,
  7: EmailVerification,
  8: ThankYou,
};

const currentPage = ref(4);
const totalPage = ref(8);

const getQuestionsComponent = () => {
  return pageObject[currentPage.value];
};

const nextStepButton = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++;
  }
};

const previousStepButton = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleProgressComplete = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++;
  }
};

const isHeaderHidden = computed(() => currentPage.value > 5);

const isNextButtonHidden = computed(
    () => currentPage.value === 6 || currentPage.value === 8
);

let isDefaultValidEmail = ref(false);

const updateValidationState = (isValidEmail) => {
  isDefaultValidEmail.value = isValidEmail;
}
</script>

<template>
  <div class="quiz-page">
    <Stepper
        @nextStepButton="nextStepButton"
        @PreviousStepButton="previousStepButton"
        :currentPage="currentPage"
        :totalPage="totalPage"
        :isHeaderHidden="isHeaderHidden"
        :isNextButtonHidden="isNextButtonHidden"
        :isDefaultValidEmail="isDefaultValidEmail"
    >
      <component
          :is="getQuestionsComponent()"
          :currentPage="currentPage"
          @update:currentPage="currentPage = $event"
          @progressComplete="handleProgressComplete"
          @updateValidationState="updateValidationState"
      />
    </Stepper>
  </div>
</template>

<style lang="scss">
.quiz-page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}
</style>