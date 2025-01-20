<script setup>
import { ref } from "vue";
import useQuestionsStore from "@/stores/questionsStore.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let currentQuestionIndex = ref(0);
const emit = defineEmits(["update: currentPage"]);

const questionsStore = useQuestionsStore();

const onClickRetakeButton = () => {
  currentQuestionIndex.value = 0;

  questionsStore.questions.forEach((question) => {
    if (Array.isArray(question.selectedValue)) {
      question.selectedValue = [];
    } else {
      question.selectedValue = "";
    }
  });

  emit("update:currentPage", 1);
};

const rows = questionsStore.questions.map((question) => {
  const questionTitleValue = t(question.question);
  const questionAnswerValue = Array.isArray(question.selectedValue)
    ? question.selectedValue.map((optionValue) => t(optionValue)).join(", ")
    : t(question.selectedValue);

  return [questionTitleValue, questionAnswerValue];
});

let csvContent = "Question,Answer\r\n";

rows.forEach((rowArray) => {
  const row = rowArray.join(",");
  csvContent += row + "\r\n";
});

const downloadCSV = () => {
  let link = document.createElement("a");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  let url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "user_answers.csv");
  link.click();
};
</script>

<template>
  <div class="thank-you_container">
    <div class="thank-you_header">
      <h1 class="thank-you_title">{{ t("thankYou.title") }}</h1>
      <p class="thank-you_subtitle">{{ t("thankYou.subtitle") }}</p>
    </div>

    <div class="thank-you_image-wrapper">
      <img src="@/img/checkmark.svg" alt="Checkmark" class="checkmark_icon" />
    </div>

    <div class="thank-you_download">
      <img src="@/img/download.svg" alt="Download" class="download_icon" />
      <p class="thank-you_download-button" @click="downloadCSV">
        {{ t("thankYou.downloadButton") }}
      </p>
    </div>

    <button class="thank-you_button" @click="onClickRetakeButton">
      {{ t("thankYou.retakeButton") }}
    </button>
  </div>
</template>

<style lang="scss">
@use "@/assets/styles/base/variables" as *;

.thank-you_container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .thank-you_header {
    margin-bottom: 62px;
    text-align: center;

    .thank-you_title {
      font-size: 32px;
      font-weight: bold;
      color: $text-color;
    }

    .thank-you_subtitle {
      font-size: 18px;
      color: $subtitle-color;
    }
  }

  .thank-you_image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 100px;

    .checkmark_icon {
      width: 80px;
      height: 80px;
      object-fit: contain;
    }
  }

  .thank-you_download {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 29px;

    .download_icon {
      width: 24px;
      height: 24px;
    }

    .thank-you_download-button {
      font-size: 17px;
      font-weight: 500;
      color: $text-color;
    }
  }

  .thank-you_button {
    width: 90%;
    padding: 16px;
    background-color: $button-color;
    border: none;
    border-radius: 12px;
    color: $text-color;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: $button-hover-color;
      transform: scale(1.02);
    }
  }

  @media (max-width: 768px) {
    .thank-you_button {
      padding: 12px;
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    .thank-you_button {
      font-size: 12px;
      padding: 10px;
    }
  }
}
</style>