
import VueDatePickerRange from '@/components/inputs/VueDatePickerRange.vue';
import TranSlideUpDown from '@/components/transitions/TranSlideUpDown.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { App } from 'vue';

const CLoader = (app: App) => {
  app.component('VueDatePicker', VueDatePicker); //-- https://vue3datepicker.com/props/modes/
  app.component('VDatePickerRange', VueDatePickerRange);

  //-- transition
  app.component('TranSlide', TranSlideUpDown);
}

export default CLoader;
