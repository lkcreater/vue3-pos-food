<template>
  <v-card variant="outlined">
    <v-card-text>
      <v-list density="compact">
        <v-list-item v-for="item, idx in data as TopPingValueInterface[]">
          <v-switch v-model="model" color="primary" :label="item.name" :value="item" hide-details></v-switch>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { TopPingValueInterface } from '@/views/pages/products/product.interface';

interface PropsTopPingInterface{
  data?: TopPingValueInterface[],
  modelValue: TopPingValueInterface[] | []
}
const props = withDefaults(defineProps<PropsTopPingInterface>(), {
  data: (): TopPingValueInterface[] => [{id: 1,name: 'jonh'}, {id: 2,name: 'gogo'}]    
});
const emit = defineEmits(['update:modelValue'])

const model = ref(props.modelValue);
watch(model, (newModel, oldModel) => {
  emit('update:modelValue', newModel)
});
</script>

<style scoped></style>
