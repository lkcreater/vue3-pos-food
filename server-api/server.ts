import { App } from "./src/app";
import CategoryController from "./src/controllers/category.controller";
import MediaController from "./src/controllers/media.controller";

import RestaurantsModule from "./src/modules/restaurants/restaurants.module";

const app = new App([
    new CategoryController(),
    new MediaController(),
    RestaurantsModule.run()
]);

app.run({
    port: 3000,
});