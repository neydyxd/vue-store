//Атомы
export {default as Button} from "./lib/components/atoms/button/Button.vue"
export {default as Input} from "./lib/components/atoms/input/Input.vue"
export {default as BaseLink } from "./lib/components/atoms/base-link/BaseLink.vue"
export {default as ListItem } from "./lib/components/atoms/list-item/ListItem.vue"
export {default as Table } from "./lib/components/atoms/table/Table.vue"
export {default as BaseCounter } from "./lib/components/atoms/base-counter/BaseCounter.vue"
export {default as BaseChips } from "./lib/components/atoms/base-chips/BaseChips.vue"

//Молеклы
export {default as DropdownMenu} from "./lib/components/molecules/dropdown-menu/DropdownMenu.vue"
export {default as List} from "./lib/components/molecules/list/List.vue"

//Организмы
export {default as AuthForm} from "./lib/components/organisms/auth-form/AuthForm.vue"
export {default as Header} from "./lib/components/organisms/header/Header.vue"
export {default as Menu} from "./lib/components/organisms/menu/Menu.vue"
export {default as Footer} from "./lib/components/organisms/footer/Footer.vue"

//Шаблоны
export {default as AuthLayout} from "./lib/components/templates/auth-layout/AuthLayout.vue"
export {default as MainLayout} from "./lib/components/templates/main-layout/MainLayout.vue"

//api
export { get } from './lib/api/index'
export { post } from './lib/api/index';
export { axiosInstance } from './lib/api/instance'
