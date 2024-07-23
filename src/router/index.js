import { createRouter, createWebHistory } from "vue-router";
import { FinishLoadingBar, StartLoadingBar } from "../utils/loadingbar.js";
import store from "../utils/stores/profile.js";

const routes = [
    {
        path: "/",
        name: "MainPage",
        meta: {
            title: "首页",
        },
        component: () => import("../components/MainFunction/MainPage.vue"),
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录",
        },
        component: () => import("../components/MainFunction/LoginPage.vue"),
    },
    {
        path: "/blacklist",
        name: "blacklist",
        meta: {
            title: "黑名单列表",
        },
        component: () => import("../components/MainFunction/LoginPage.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 检查本地存储是否存在token，若存在则直接使用
if (localStorage.getItem("token")) {
    store.commit("set_token", localStorage.getItem("token"));
}

router.beforeEach((to, from, next) => {
    StartLoadingBar();
    const token = store.getters.get_token;
    const isLoginPage = to.path === '/login';

    if (!token && !isLoginPage) {
        next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});


// from next
router.afterEach((to, from) => {
    FinishLoadingBar();
    if (to.meta.title) {
        //设置标题
        document.title = to.meta.title + " | 中国内网串通联盟联合黑名单管理系统";
    }
})

export default router;