import { initUserPermissionsLifecycle } from "./user-permissions"

export const initLifeCycles = (strapi) => {
    initUserPermissionsLifecycle(strapi)
}