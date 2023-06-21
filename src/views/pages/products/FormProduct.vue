<template>
  <v-sheet class="mx-auto" style="padding: 30px;">
    <v-row>
      <v-col>
        <h3>{{ pageLabels.titleForm }}</h3>
      </v-col>
    </v-row>

    <v-form fast-fail @submit.prevent>
      <v-row>
        <v-col cols="12">
          <DropZone />
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="models.title" :label="inputLabels.title" :rules="rules.title">
          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-textarea v-model="models.desc" :label="inputLabels.desc" rows="4"></v-textarea>
        </v-col>

        <v-col cols="12">
          <v-select v-model="models.cate_id" :label="inputLabels.cate_id" :items="itemSelectInput" item-title="state"
            item-value="abbr"></v-select>
        </v-col>

        <v-col cols="12">
          <v-select v-model="models.cate_id" :label="inputLabels.cate_id" :items="itemSelectInput" item-title="state"
            item-value="abbr" ></v-select>
        </v-col>

        <v-col cols="12" style="margin-top: 20px;">
          <h3>{{ pageLabels.titlePrice }}</h3>
          <v-alert type="info" :text="pageLabels.subPrice" variant="tonal">
          </v-alert>

          <template v-for="item, idx in models.prices">
            <v-row>
              <v-col cols="12">
                <v-card class="mx-auto" variant="outlined" style="margin-top: 20px;">
                  <v-card-item>
                    <v-row style="margin-top: 0;">
                      <v-col cols="6">
                        <v-text-field v-model="item.name" :disabled="idx == 0" :label="inputLabels.namePrice" :rules="rules.title" />
                      </v-col>
                      <v-col cols="6">
                        <v-text-field type="number" prepend-icon="mdi-currency-usd" v-model="item.price"
                          :label="inputLabels.price" :rules="rules.title" />
                      </v-col>
                    </v-row>
                  </v-card-item>
                  <v-card-actions v-if="idx > 0">
                    <v-btn size="small" color="error" prepend-icon="mdi-trash-can-outline" @click="actionRemoveOptionalPrice(item.pid)">
                      {{ pageLabels.btnDeletePrice }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <v-row>
            <v-col cols="12">
              <v-btn variant="plain" prepend-icon="mdi-plus" @click="actionAddOptionalPrice">
                {{ pageLabels.btnAddPrice }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" style="margin-top: 20px;">
          <h3>{{ pageLabels.titleTopPing }}</h3>

          {{ models.topPing }}
          <TopPingProduct v-model="models.topPing"/>
        </v-col>

        <v-col cols="12">
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-col>
      </v-row>


    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import DropZone from '@/components/inputs/DropZone.vue';
import { Rules, ValidationRule } from '@/plugins/custom.validate';
import TopPingProduct from '@/views/pages/products/TopPingProduct.vue';

type PidType = string | number;
interface SubModelsPriceDynamicInterface {
  pid: PidType,
  name: string,
  price: number
}
interface ModelsInterface {
  title: string,
  cate_id: any,
  menu: any,
  desc: string,
  prices: SubModelsPriceDynamicInterface[],
  topPing: any
}

const pageLabels = reactive({
  titleForm: 'รายละเอียดเมนู',
  titlePrice: 'ราคา และ ตัวเลือกราคา',
  titleTopPing: 'ตัวเลือกท็อปปิ้ง',
  subPrice: 'เพิ่มตัวเลือกราคาถ้าสินค้ามีขนาดต่าง ๆ (เช่นเล็ก กลาง ใหญ่) หรือเพิ่มตัวเลือก (เช่นน้ำ แห้ง) คำนวณ GST/VAT รวมในราคาถ้ามี',
  alertMessegeInput: 'สินค้าแต่ละรายการในเมนูจะถูกจัดเป็นหมวดหมู่เมื่อแสดงแก่ลูกค้า กรุณาตรวจสอบชื่อและคำอธิบายสินค้าให้ถูกต้องเนื่องจากเป็นข้อมูลที่ลูกค้ามองเห็น',
  itemDefaultNamePrice: 'ราคาเริ่มต้น',
  btnDeletePrice: 'ลบ',
  btnAddPrice: 'เพิ่มตัวเลือกราคา (เช่น ธรรมดา 45 บาท พิเศษ 60 บาท)'
});
const inputLabels = reactive<{ [key: string]: string }>({
  title: 'ซื่อหมวดหมู่',
  cate_id: 'หมวดหมู่',
  menu: '',
  desc: 'รายละเอียด',
  namePrice: 'ชื่อตัวเลือกราคา',
  price: 'ราคา'
});
const models = reactive<ModelsInterface>({
  title: '',
  cate_id: '',
  menu: '',
  desc: '',
  prices: [
    {
      pid: Date.now(),
      name: pageLabels.itemDefaultNamePrice,
      price: 0
    }
  ],
  topPing: []
});
const rules = reactive<{ [key: string]: ValidationRule[] }>({
  title: Rules(inputLabels.title, [{ rule: 'required', message: 'กรุณากรอก{field}' }]),
});
const itemSelectInput = ref([
  { state: 'Florida', abbr: 'FL' },
  { state: 'Georgia', abbr: 'GA' },
  { state: 'Nebraska', abbr: 'NE' },
  { state: 'California', abbr: 'CA' },
  { state: 'New York', abbr: 'NY' },
]);

const actionAddOptionalPrice = () => {
  models.prices.push(<SubModelsPriceDynamicInterface>{
    pid: Date.now(),
    name: '',
    price: 0
  });
}
const actionRemoveOptionalPrice = (pid: PidType) => {
  const index = models.prices.findIndex(item => item.pid === pid);
  models.prices.splice(index, 1);
}
</script>

<style scoped></style>
