<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const email = ref("");
const errorMessage = ref("");

const emit = defineEmits(["updateValidationState"]);

const validateEmail = () => {
  if (!email.value) {
    errorMessage.value = "Email is required";
    return;
  }
  const isValidEmail = /\S+@\S+\.\S+/.test(email.value);
  errorMessage.value = isValidEmail
    ? null
    : "Please enter a valid email address. Example: email@mail.com";
  emit("updateValidationState", isValidEmail);
};
</script>

<template>
  <div class="email-container">
    <div class="email-row">
      <div class="email">
        <h1 class="email-title">{{ t("emailComponent.title") }}</h1>
        <p class="email-subtitle">{{ t("emailComponent.subtitle") }}</p>
      </div>

      <form>
        <input
          class="email-input"
          @input="validateEmail"
          v-model="email"
          type="email"
          :placeholder="t('emailComponent.placeholder')"
          required
        />
      </form>

      <p class="error-message" v-if="errorMessage">
        {{ t("emailComponent.errorMessage") }}
      </p>

      <p class="policy">
        {{ t("emailComponent.policy.text") }}
        <a href="#" class="link">{{ t("emailComponent.policy.privacy") }}</a>
        {{ t("emailComponent.policy.and") }}
        <br />
        <a href="#" class="link">{{ t("emailComponent.policy.terms") }}</a
        >.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/base/variables" as *;

.email-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  .email-row {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 56px;

    .email {
      text-align: center;

      .email-title {
        font-size: 30px;
        margin-bottom: 4px;
        font-weight: bold;
        color: $text-color;
      }

      .email-subtitle {
        font-size: 16px;
        color: $subtitle-color;
        margin: 0;
      }
    }

    .email-input {
      width: 100%;
      padding: 14px 16px;
      font-size: 16px;
      color: $text-color;
      border: none;
      border-radius: 12px;
      background-color: $option-button-bg-color;
      outline: none;

      &:focus {
        border: 1px solid $button-color;
      }
    }

    .error-message {
      color: $error-message-color;
      font-size: 14px;
      margin-top: -50px;
      text-align: center;
      line-height: 1.4;
    }

    .policy {
      font-size: 14px;
      color: $subtitle-color;
      text-align: center;
      line-height: 1.4;

      .link {
        color: $button-color;
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
          color: $button-hover-color;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
