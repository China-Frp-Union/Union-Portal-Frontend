import { createRouter, createWebHistory } from "vue-router";
import { FinishLoadingBar, StartLoadingBar } from "../utils/loadingbar.js";
import { handleActiveKeyChange } from "../views/Layout/Menu.vue";
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
    // 注册
    {
        path: "/join",
        name: "join",
        meta: {
            title: "加入申请",
        },
        component: () => import("../components/MainFunction/RegisterPage.vue"),
    },
    {
        path: "/blacklist",
        name: "blacklist",
        meta: {
            title: "黑名单列表",
        },
        component: () => import("../components/BlackList/index.vue"),
    },
    {
        path: "/app",
        name: "app",
        meta: {
            title: "应用管理",
        },
        component: () => import("../components/AppCenter/index.vue"),
    },
    {
        path: "/site",
        name: "site",
        meta: {
            title: "站点管理",
        },
        component: () => import("../components/SiteCenter/index.vue"),
    },
    {
        path: "/apply",
        name: "apply",
        meta: {
            title: "申请管理",
        },
        component: () => import("../components/ApplicationCenter/index.vue"),
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
    // 判断是否需要登录 如果是首页或者登录页或者注册页则直接进入 写一个三元表达式
    const isLoginPage = to.name === "login" || to.name === "join" || to.name === "MainPage";

    if (!token && !isLoginPage ) {
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
        document.title = to.meta.title + " | 中国内网穿透联盟管理系统";
    }
    handleActiveKeyChange(to.name);
})

export default router;