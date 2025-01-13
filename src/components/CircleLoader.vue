<script setup>
import { ref, computed, onMounted } from 'vue'
import {useI18n} from "vue-i18n";
const { t } = useI18n();

const percentage = ref(0);
const circumference = 2 * Math.PI * 45;

const dashOffset = computed(() => {
  return circumference - (circumference * (percentage.value / 100));
});

const emit = defineEmits(['progressComplete']);

onMounted(() => {
  const interval = setInterval(() => {
    if (percentage.value < 100) {
      percentage.value += 10;
    } else {
      clearInterval(interval);
      emit('progressComplete');
    }
  }, 200);
});
</script>

<template>
  <div class="progress-circle">
    <div class="circle">
      <svg viewBox="0 0 100 100">
        <circle
            class="circle-bg"
            cx="50"
            cy="50"
            r="45"
        />
        <circle
            class="circle-progress"
            cx="50"
            cy="50"
            r="45"
            :style="{ strokeDashoffset: dashOffset }"
        />
        <text class="percentage-title" x="50" y="50" text-anchor="middle" dy=".3em">
          {{ percentage }}%
        </text>
      </svg>
      <p class="collections-title">{{ t('progressCircle.findingCollections') }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 250px;
  margin: 5% auto;
  text-align: center;

  svg {
    width: 100%;
    height: auto;
    transform: rotate(-90deg);

    .circle-bg {
      fill: none;
      stroke: #cccccc;
      stroke-width: 10;
    }

    .circle-progress {
      fill: none;
      stroke: var(--button-color, #ff0099);
      stroke-width: 10;
      stroke-linecap: round;
      stroke-dasharray: 282.743;
      stroke-dashoffset: 282.743;
      transition: stroke-dashoffset 0.5s ease;
    }

    .percentage-title {
      font-size: 20px;
      fill: var(--text-color, white);
      transform: rotate(90deg);
      transform-origin: center;
    }
  }

  .collections-title {
    font-size: 18px;
    margin-top: 1rem;
    font-weight: bold;
    color: var(--text-color, white);
  }
}
</style>