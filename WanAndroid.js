/*
33 8,11 * * * WanAndroid.js
*/
const { sendNotify } = require('./sendNotify.js'); // commonjs

async function login(username, password) {
    console.log("============开始玩安卓登录请求============");
    const url = "https://www.wanandroid.com/user/login";

    try {
        const controller = new AbortController();
        const signal = controller.signal;

        setTimeout(() => controller.abort(), 20000); // 超时时间为 20 秒

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            signal
        });

        if (!response.ok) {
            console.log("玩安卓登录请求失败");
            await sendNotify("玩安卓登录", "玩安卓登录请求失败");
            return false;
        }

        let result = await response.json();
        console.log(result.errorMsg);

        if (result.errorCode === 0) {
            console.log("玩安卓登录请求成功");
            await sendNotify("玩安卓登录", "玩安卓登录请求成功");
        } else {
            console.log("玩安卓登录请求失败：" + result.errorMsg);
            await sendNotify("玩安卓登录", "玩安卓登录请求失败：" + result.errorMsg);
        }
    } catch (error) {
        console.error("玩安卓登录请求发生错误:", error.message);
        await sendNotify("玩安卓登录", "玩安卓登录请求发生错误：" + error.message);
    }
}

async function allTasks() {
    // 'your_username'  # 修改为你的用户名
    // 'your_password'  # 修改为你的密码
    await login('your_username', 'your_password');
}

allTasks();