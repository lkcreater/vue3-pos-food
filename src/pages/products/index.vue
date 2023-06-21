<template>
  <v-row>
    <v-col cols="12" class="d-flex justify-end">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" prepend-icon="mdi-form-dropdown">
            {{ PageLabels.btnDropDawn }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in MenuItems" :key="index" :value="index" :prepend-icon="item.icon"
            :title="item.title" @click="openDrawerForm(item.form as TypeChooseFormDrawer)">
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12"></v-col>
  </v-row>

  <div class="lk-drawer-form">
    <v-navigation-drawer v-model="drawer" location="right" width="520" temporary>

      <v-list-item :title="defaultDrawerForm?.title" @click.stop="drawer = !drawer" prepend-icon="mdi-arrow-right" style="margin: 10px; " />
      <v-divider />
      <FormProduct v-if="defaultDrawerForm?.form == <TypeChooseFormDrawer>'product'" />
      <FormCategory v-if="defaultDrawerForm?.form == <TypeChooseFormDrawer>'category'" />
      <FormMenu v-if="defaultDrawerForm?.form == <TypeChooseFormDrawer>'menu'" />
      <FormTopping v-if="defaultDrawerForm?.form == <TypeChooseFormDrawer>'topping'" />

    </v-navigation-drawer>
  </div>
</template>

<script setup lang="ts">
import FormCategory from '@/views/pages/products/FormCategory.vue';
import FormMenu from '@/views/pages/products/FormMenu.vue';
import FormProduct from '@/views/pages/products/FormProduct.vue';
import FormTopping from '@/views/pages/products/FormTopping.vue';

type TypeChooseFormDrawer = 'product' | 'category' | 'menu' | 'topping';
interface MenuItemInterface {
  title: string,
  icon?: string | undefined,
  form: TypeChooseFormDrawer
}
type SetupFormDrawer = MenuItemInterface | null;
const MenuItems = ref<MenuItemInterface[]>([
  { title: 'เพิ่มรายการอาหาร', form: 'product', icon: 'mdi-cart-plus' },
  { title: 'เพิ่มหมวดหมูอาหาร', form: 'category', icon: 'mdi-format-list-group-plus' },
  { title: 'เพิ่มท็อปปิ้ง', form: 'topping', icon: 'mdi-shaker-outline' },
  { title: 'เพิ่มเมนูใหม่', form: 'menu', icon: 'mdi-menu' },  
]);
const PageLabels = ref<{ [key: string]: string }>({
  btnDropDawn: 'เมนูเพิ่มรายการอาหาร'
});
const drawer = ref<boolean>(false);
const defaultDrawerForm = ref<SetupFormDrawer>(null);

const openDrawerForm = (choose: TypeChooseFormDrawer) => {
  switch (choose) {
    case <TypeChooseFormDrawer>'product':
      drawer.value = true;
      defaultDrawerForm.value = objectDrawerForm(<TypeChooseFormDrawer>'product')
      break;
    case <TypeChooseFormDrawer>'category':
      drawer.value = true;
      defaultDrawerForm.value = objectDrawerForm(<TypeChooseFormDrawer>'category');
      break;
    case <TypeChooseFormDrawer>'menu':
      drawer.value = true;
      defaultDrawerForm.value = objectDrawerForm(<TypeChooseFormDrawer>'menu');
      break;
    case <TypeChooseFormDrawer>'topping':
      drawer.value = true;
      defaultDrawerForm.value = objectDrawerForm(<TypeChooseFormDrawer>'topping');
      break;
    default:
      drawer.value = false;
  }
}
const objectDrawerForm = (choose: TypeChooseFormDrawer): MenuItemInterface => {
  return MenuItems.value.find(item => item.form === choose) as MenuItemInterface;
}
</script>

<style lang="scss">
.lk-drawer-form {
  .v-navigation-drawer {
    z-index: 999 !important;
    top: 0 !important;
    height: 100% !important;
  }

  .v-navigation-drawer__scrim {
    z-index: 950 !important;
  }
}
</style>
