<script setup>
const props = defineProps({
  isNextButtonHidden: {
    type: Boolean,
    default: false,
  },
  isNextButtonDisabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["nextStepButton"]);

const onClickStepButton = () => {
  emit("nextStepButton");
};
</script>

<template>
  <button
    :disabled="props.isNextButtonDisabled"
    v-show="!props.isNextButtonHidden"
    class="step-next-button"
    @click="onClickStepButton"
  >
    Next
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/base/variables" as *;

.step-next-button {
  width: 100%;
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

  &:disabled {
    background-color: $button-disabled-color;
    color: $button-disabled-text-color;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}
</style>
