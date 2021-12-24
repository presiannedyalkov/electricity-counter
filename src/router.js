import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/entries",
        name: "entries",
        meta: { guest: true },
        component: () => import("./components/EntriesList")
    },
    {
        path: "/add",
        name: "add",
        meta: { guest: true },
        component: () => import("./components/AddEntry")
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {

    if (!to.meta.guest) {
        // check if use already logged 
        // if true then go to home
        return next({ path: '/' }); // '/' is home page
        // else then continue to next()
    }

    return next();
});

export default router;