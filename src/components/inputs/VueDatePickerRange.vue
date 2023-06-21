<template>
  <VueDatePicker ref="datePickerRef" range :dark="switchThemeClass" v-model="props.modelValue" :disabled="props.disabled"
    @update:model-value="handleDate">
    <template #trigger>
      <v-btn block variant="tonal" prepend-icon="mdi-calendar-clock" :disabled="props.disabled">
        {{ props.label }}
      </v-btn>
    </template>
  </VueDatePicker>

  <tran-slide>
    <v-card v-show="!props.disabled" class="mx-auto mt-3" variant="outlined">
      <v-card-text>
        <v-text-field :label="pageLabels.dateStartLabel" prepend-icon="mdi-calendar-outline" v-model="models.start" disabled></v-text-field>
        <v-text-field :label="pageLabels.dateEndLabel" prepend-icon="mdi-calendar-multiple" v-model="models.end" class="mt-4" disabled></v-text-field>
      </v-card-text>
    </v-card>
  </tran-slide>
</template>

<script setup lang="ts">
import type { DatePickerRangeType } from '@/components/types';
import DayJs from 'dayjs';
import { useTheme } from 'vuetify';

interface PropDatePicker {
  disabled?: boolean,
  label?: string,
  modelValue?: DatePickerRangeType
}
type ThemeName = 'light' | 'dark';
const switchThemeClass = ref<boolean>(false);
const theme = useTheme();
const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<PropDatePicker>(), {
  label: 'Choose date picker',
  disabled: false
});
const models = reactive({
  start: '',
  end: ''
});
const pageLabels = reactive({
  dateStartLabel: 'เริ่มวันที่',
  dateEndLabel: 'ถึงวันที่'
});

watch(theme.global.name, (newModel, oldModel) => {
  switchThemeClass.value = <boolean>(theme.global.name.value == <ThemeName>'dark');
});
const handleDate = (dateModels: any) => {
  models.start = displayDateTime(dateModels[0]);
  models.end = displayDateTime(dateModels[1]);
  emit('update:modelValue', dateModels)
}
const displayDateTime = (date: Date | null | string | undefined ) => {
  if(date == null || date == undefined){
    return 'ยังไม่กำหนด';
  }
  return DayJs(date).format('DD MMM YYYY เวลา H:mm');
}
</script>

<style scoped></style>
