const { sendNotify } = require('./sendNotify.js'); // commonjs

/**
 * 1 0 * * * WanAndroid.js
 */
// const $ = new Env("玩安卓登录");

async function login(username, password) {
    console.log("============开始玩安卓登录请求============");
    const user = {username : username, password : password}
    const url = "https://www.wanandroid.com/user/login";

    console.log(JSON.stringify(user));

    // let response = await fetch(url,
    //         {
    //             method: 'post',
    //             headers: {
    //             'Content-Type': 'application/json;charset=utf-8;'
    //             // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    //             },
    //             body:JSON.stringify(user)
    //         }
    // );

    let response = await fetch(url,
        {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json;charset=utf-8;'
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            body: `username=${username}&password=${password}`
        }
    );
    if(response.ok) {
        let result = await response.json();
        console.log(result.errorMsg);
        if(result.errorCode == 0) {
            console.log("玩安卓登录请求成功");
            await sendNotify("玩安卓登录", "玩安卓登录请求成功");
        } else {
            await sendNotify("玩安卓登录", "玩安卓登录请求失败：" + result.errorMsg);
        }
    } else {
        console.log("玩安卓登录请求失败");
        await sendNotify("玩安卓登录", "玩安卓登录请求失败");
        return false;
    }
}

async function allTasks() {
    // 'your_username'  # 修改为你的用户名
    // 'your_password'  # 修改为你的密码
    await login('your_username', 'your_password');
}

allTasks();
