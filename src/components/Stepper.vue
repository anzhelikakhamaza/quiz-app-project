<script setup>
import { computed } from "vue";
import useQuestionsStore from "@/stores/questionsStore.js";
import NextStepButton from "@/components/NextStepButton.vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
  isHeaderHidden: {
    type: Boolean,
    default: false,
  },
  isNextButtonHidden: {
    type: Boolean,
    default: false,
  },
  isDefaultValidEmail: {
    type: Boolean,
    default: false,
  },
});

const questionsStore = useQuestionsStore();
const emit = defineEmits(["nextStepButton", "previousStepButton"]);

const isNextButtonDisabled = computed(() =>
  props.currentPage === 7
    ? !props.isDefaultValidEmail
    : !questionsStore.questions[questionIndex.value].selectedValue
);

const questionIndex = computed(() => props.currentPage - 1);
const isHidden = computed(() => props.currentPage < 2);
const progressBarIndex = computed(
  () => `${(props.currentPage / props.totalPage) * 100}%`
);

const onClickPreviousButton = () => {
  emit("previousStepButton");
};

const onClickNextButton = () => {
  emit("nextStepButton");
};
</script>

<template>
  <div class="step-container">
    <header v-if="!isHeaderHidden" class="step-header">
      <div class="step-header-wrapper">
        <div class="step-header-button-wrapper">
          <div
            v-show="!isHidden"
            class="step-back-button"
            @click="onClickPreviousButton"
          >
            <img
              src="@/img/previousIcon.svg"
              alt="previous icon"
              class="button-icon"
            />
          </div>
        </div>
        <div class="step-page-indicator">
          <span class="step-current-page">{{ currentPage }}</span
          >/{{ totalPage }}
        </div>
      </div>
      <div class="step-progress-bar">
        <div
          class="step-progress-bar-fill"
          :style="{ width: progressBarIndex }"
        ></div>
      </div>
    </header>

    <slot></slot>

    <NextStepButton
      :disabled="isNextButtonDisabled"
      v-if="!isNextButtonHidden"
      @click="onClickNextButton"
      :current-page="currentPage"
    />
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/base/variables" as *;

.step-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 16px;

  .step-header {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .step-header-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .step-header-button-wrapper {
        display: flex;
        align-items: center;

        .step-back-button {
          background: none;
          border: none;
          color: $button-color;
          font-size: 24px;
          cursor: pointer;
          transition: transform 0.2s ease;

          &:hover {
            transform: scale(1.1);
          }

          .button-icon {
            width: 24px;
            height: 24px;
          }
        }
      }

      .step-page-indicator {
        font-size: 16px;
        color: $subtitle-color;
        display: flex;
        align-items: center;
        font-weight: 500;

        .step-current-page {
          color: $button-color;
          font-weight: bold;
        }
      }
    }

    .step-progress-bar {
      width: 100%;
      height: 6px;
      background-color: $progress-bar-bg;
      border-radius: 4px;
      overflow: hidden;

      .step-progress-bar-fill {
        height: 6px;
        background-color: $progress-bar-fill;
        transition: width 0.3s ease;
      }
    }
  }
}
</style>