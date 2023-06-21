<template>
  <v-sheet class="mx-auto" style="padding: 30px;">
    <v-row>
      <v-col>
        <h3>{{ pageLabels.titleForm }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert v-if="false" type="info" :text="pageLabels.alertMessegeInput" variant="tonal">
        </v-alert>
      </v-col>
    </v-row>

    <v-form fast-fail @submit.prevent>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="models.title" :label="inputLabels.title" :rules="rules.title">
          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="models.desc" :label="inputLabels.desc" rows="4"></v-textarea>
        </v-col>

        <v-col cols="12">
          <h3>{{ pageLabels.times }}</h3>
          <v-switch
          color="primary"
          v-model="models.enableDateRage"
          :label="inputLabels.enableDateRage"
        ></v-switch>
          <v-date-picker-range
            :label="pageLabels.enableDateRage"
            v-model="models.time"
            :disabled="!models.enableDateRage"
            ></v-date-picker-range>
        </v-col>

        <v-col cols="12">
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { DatePickerRangeType } from '@/components/types';
import { Rules } from '@/plugins/custom.validate';

type ObjectString = { [key: string] : string };
interface ModelsInterface {
  title: string,
  desc: string,
  enableDateRage: boolean,
  time: DatePickerRangeType
}
const models = reactive<ModelsInterface>({
  title: '',
  desc: '',
  enableDateRage: false,
  time: []
});
const inputLabels = reactive<ObjectString>({
  title: 'ซื่อเมนู',
  desc: 'รายละเอียด',
  enableDateRage: 'เปิดกำหนดช่วงเวลา',
  times: 'กำหนดช่วงเวลา'
});
const pageLabels = reactive<ObjectString>({
  titleForm: 'รายละเอียดของเมนู',
  alertMessegeInput: 'สินค้าแต่ละรายการในเมนูจะถูกจัดเป็นหมวดหมู่เมื่อแสดงแก่ลูกค้า กรุณาตรวจสอบชื่อและคำอธิบายสินค้าให้ถูกต้องเนื่องจากเป็นข้อมูลที่ลูกค้ามองเห็น',
  times: 'กำหนดช่วงเวลา',
  enableDateRage: 'เลือกช่วงวันเวลา'
});
const rules = reactive({
  title: Rules(inputLabels.title, [{ rule: 'required', message: 'กรุณากรอก{field}' }]),
});

</script>

<style scoped></style>
