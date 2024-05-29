**使用说明：**



本逆向API仅仅是为了满足我个人使用。没有图片等接口。仅实现了文字接口。
使用前请确保安装了chrome.
然后执行：

    pip install -r requirements.txt
没有安装python的请自行安装。

**一切完成后你就可以执行。**

    python App.py
**免登陆执行：**

    python AppNoLogin.py

程序默认使用9999端口。可根据自己的需求更改。
**如果需要代理修改以下代码，把注释去了。改为你的代理：**

    # self.port = self.port + 1
    # if self.port > 1050:
    #     self.port = 1030
    # self.proxy = f'127.0.0.1:{self.port}'
    # co.set_proxy(f'http://{self.proxy}')

目前只有一个接口实现可用：

http://127.0.0.1:9999/v1/chat/completions


程序执行行会自动打开浏览器，你需要自己登陆你的GPT帐号使用。



  **测试：**

    python test.py
