<template>
  <v-sheet class="mx-auto" style="padding: 30px;">
    <v-row>
      <v-col>
        <h3>{{ pageLabels.titleForm }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert type="info" :text="pageLabels.alertMessegeInput" variant="tonal">
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
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { Rules } from '@/plugins/custom.validate';

interface ModelsInterface {
  title: string,
  desc: string
}
const models = reactive<ModelsInterface>({
  title: '',
  desc: ''
});
const inputLabels = reactive<ModelsInterface>({
  title: 'ซื่อหมวดหมู่',
  desc: 'รายละเอียด'
});
const pageLabels = reactive({
  titleForm: 'รายละเอียดของหมวดหมู่',
  alertMessegeInput: 'สินค้าแต่ละรายการในเมนูจะถูกจัดเป็นหมวดหมู่เมื่อแสดงแก่ลูกค้า กรุณาตรวจสอบชื่อและคำอธิบายสินค้าให้ถูกต้องเนื่องจากเป็นข้อมูลที่ลูกค้ามองเห็น'
});
const rules = reactive({
  title: Rules(inputLabels.title, [{ rule: 'required', message: 'กรุณากรอก{field}' }]),
});

</script>

<style scoped></style>
