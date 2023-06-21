<template>
    <v-sheet class="mx-auto" style="padding: 30px;">
        <v-row>
            <v-col>
                <h3>{{ pageLabels.titleForm }}</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-alert type="info" :text="pageLabels.alertMessegeInput" variant="tonal"> </v-alert>
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

                <v-col cols="12" style="margin-top: 20px;">
                    <h3>{{ pageLabels.titleTopping }}</h3>

                    <template v-for="item, idx in models.topping">
                        <v-row>
                            <v-col cols="12">
                                <v-card class="mx-auto" variant="outlined" style="margin-top: 20px;">
                                    <v-card-item>
                                        <v-row style="margin-top: 0;">
                                        <v-col cols="6">
                                            <v-text-field v-model="item.name" :label="inputLabels.topping" :rules="rules.title" />
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

                <v-col cols="12">
                    <v-btn type="submit" block class="mt-2">Submit</v-btn>
                </v-col>
            </v-row>            
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { Rules } from '@/plugins/custom.validate';

interface ToppingOptionInter {
    pid: number;
    name: string;
    price: number;
}
interface ModelsInterface {
    title: string,
    desc: string,
    topping: ToppingOptionInter[]
}
const models = reactive<ModelsInterface>({
    title: '',
    desc: '',
    topping: [
        {
            pid: Date.now(),
            name: '',
            price: 0
        }
    ]
});
const inputLabels = reactive({
    title: 'ซื่อท็อปปิ้ง',
    desc: 'รายละเอียด',
    price: 'ราคา',
    topping: 'ท็อปปิ้ง'
});
const pageLabels = reactive({
    titleForm: 'รายละเอียดของท็อปปิ้ง',
    alertMessegeInput: 'สินค้าแต่ละรายการในเมนูจะถูกจัดเป็นหมวดหมู่เมื่อแสดงแก่ลูกค้า กรุณาตรวจสอบชื่อและคำอธิบายสินค้าให้ถูกต้องเนื่องจากเป็นข้อมูลที่ลูกค้ามองเห็น',
    titleTopping: 'ตัวเลือกท็อปปิ้ง',
    subTopping: 'เพิ่มตัวเลือกราคาถ้าสินค้ามีขนาดต่าง ๆ (เช่นเล็ก กลาง ใหญ่) หรือเพิ่มตัวเลือก (เช่นน้ำ แห้ง) คำนวณ GST/VAT รวมในราคาถ้ามี',
    btnDeletePrice: 'ลบ',
    btnAddPrice: 'เพิ่มตัวเลือกท็อปปิ้ง'
});
const rules = reactive({
    title: Rules(inputLabels.title, [{ rule: 'required', message: 'กรุณากรอก{field}' }]),
});

const actionAddOptionalPrice = () => {
    models.topping.push(<ToppingOptionInter>{
        pid: Date.now(),
        name: '',
        price: 0
    });
}
const actionRemoveOptionalPrice = (pid: number) => {
    const index = models.topping.findIndex(item => item.pid === pid);
    models.topping.splice(index, 1);
}
</script>

<style scoped>

</style>