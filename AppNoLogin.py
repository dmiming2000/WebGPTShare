import base64
import json

import time

import uuid

import tornado
from DrissionPage import WebPage, ChromiumOptions, SessionOptions

import threading

from Completions import CompletionHandler

APIKEY = "testkey"


class GptWeb(threading.Thread):
    def __init__(self, thread_id):
        threading.Thread.__init__(self)
        self.page = None
        self.port = 1030
        self.init_page()

    def on_request_paused(self, **kwargs):

        request_id = kwargs['requestId']
        request = kwargs.get('request', {})
        # print(f"Intercepted request: {request.get('url')}")
        # print(request)
        if 'responseStatusCode' not in kwargs:

            try:
                self.page.run_cdp('Fetch.continueRequest', requestId=request_id)
            except:
                pass

        elif kwargs.get('responseStatusCode') == 200 and "/_next/static/chunks/4237" in request.get('url', ''):

            print(f"Intercepted JS file: {request.get('url')}")
            with open('fe.js', 'r', encoding='utf-8') as file:
                file_content = file.read()

            encoded_body = base64.b64encode(file_content.encode('utf-8')).decode('utf-8')
            try:
                self.page.run_cdp('Fetch.fulfillRequest', requestId=request_id, responseCode=200, body=encoded_body,
                                  responseHeaders=kwargs.get('responseHeaders', []))
            except Exception as e:
                print(f"Error fulfilling request: {e}")
        else:

            try:
                self.page.run_cdp('Fetch.continueRequest', requestId=request_id)
            except:
                pass

    def init_page(self):
        if self.page:
            self.page.close()
            self.page.quit()
            self.page = None

        url = f"https://chatgpt.com/?oai-dm=1"
        co = ChromiumOptions()
        so = SessionOptions()
        # self.port = self.port + 1
        # if self.port > 1050:
        #     self.port = 1030
        # self.proxy = f'127.0.0.1:{self.port}'
        # co.set_proxy(f'http://{self.proxy}')
        co.auto_port(True)
        co.set_argument('--disable-web-security')
        co.incognito()
        # co.set_browser_path('C:\\Users\\azureuser\\Desktop\\chrome-win64\\chrome.exe')
        self.page = WebPage(chromium_options=co, session_or_options=so)
        self.replace_js()
        self.page.get(url)
        self.token = None
        self.page.wait.doc_loaded()

    def replace_js(self):
        self.page.run_cdp('Fetch.enable',
                          patterns=[{"requestStage": "Response", 'urlPattern': '*/_next/static/chunks/*'}])
        self.page._driver.set_callback('Fetch.requestPaused', self.on_request_paused)

    async def get_page_use_webpage_js_get(self, url, headers=None, data=None):
        # 将 headers 和 data 转换成 JavaScript 对象格式的字符串

        headers_js = "{}"
        if headers:
            headers_dict = dict(headers.items())

            # 将字典转换为 JSON 字符串
            headers_js = json.dumps(headers_dict)

        decoded_data = "{}"
        if data:
            decoded_data = data.decode('utf-8')

        # 确保字符串中的引号正确，以便转换为 JSON 格式
        data_js = json.dumps(json.loads(decoded_data))
        # 创建随机uid
        id = uuid.uuid4().hex
        # 执行异步 JavaScript，传入 url、headers 和 data
        self.page.run_async_js(f'''
            function gethtml(url, headers, data) {{
                console.log(url);
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, true);
                xhr.withCredentials = true;

                for (var key in headers) {{
                    if (headers.hasOwnProperty(key)) {{
                        xhr.setRequestHeader(key, headers[key]);
                    }}
                }}

                xhr.onreadystatechange = function() {{
                    if (xhr.readyState === XMLHttpRequest.DONE) {{
                        if (xhr.status === 404) {{
                            window.__{id} = "404";
                        }} else if (xhr.status >= 200 && xhr.status < 300) {{
                            window.__{id} = xhr.responseText;
                        }} else {{
                            window.__{id} = "1";
                        }}
                    }}
                }};

                xhr.onerror = function() {{
                    window.__{id} = "2";
                }};

                xhr.send(JSON.stringify(data));
            }}

            gethtml(arguments[0], JSON.parse(arguments[1]), JSON.parse(arguments[2]));
            ''', url, headers_js, data_js)

        q = ''

        while True:
            s = self.page.run_js(f'return window.__{id};')
            if s:
                q = s
                self.page.run_js(f'window.__{id} = null;')
                break
            time.sleep(1)

        return q

    async def geta_accessToken(self):
        session = await self.get_page_use_webpage_js_get("https://chatgpt.com/api/auth/session")
        session = json.loads(session)
        print(session)
        return session['accessToken']

    async def post_page_use_webpage_js_post(self, url, headers, data):
        if not self.token:
            self.token = await self.geta_accessToken()

            # 转换 headers 为字典
        headers_dict = {}
        if headers:
            headers_dict = dict(headers.items())
        if 'Host' in headers_dict:
            del headers_dict['Host']
        if 'User-Agent' in headers_dict:
            del headers_dict['User-Agent']
        if 'Content-Length' in headers_dict:
            del headers_dict['Content-Length']
        if 'Accept-Language' in headers_dict:
            del headers_dict['Accept-Language']
        if 'Accept-Encoding' in headers_dict:
            del headers_dict['Accept-Encoding']
        if 'Connection' in headers_dict:
            del headers_dict['Connection']
        # 将 headers 和 data 转换为 JSON 字符串
        headers_js = json.dumps(headers_dict)
        decoded_data = data.decode('utf-8')
        data_js = json.dumps(json.loads(decoded_data)).replace("False", "false").replace("True", "true")

        # 创建随机 uid
        id = uuid.uuid4().hex

        # 生成 JavaScript 代码
        js_code = f'''
            function posthtml(url, headers, data) {{
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.withCredentials = true;

                for (var key in headers) {{
                    if (headers.hasOwnProperty(key)) {{
                        xhr.setRequestHeader(key, headers[key]);
                    }}
                }}
                xhr.setRequestHeader("Oai-Device-Id", {self.page.local_storage("oai-did")});
                xhr.setRequestHeader("Authorization", "Bearer {self.token}");
                xhr.onreadystatechange = function() {{
                    if (xhr.readyState === XMLHttpRequest.DONE) {{
                        if (xhr.status === 404) {{
                            window.__{id} = "404";
                        }} else if (xhr.status >= 200 && xhr.status < 300) {{
                            window.__{id} = xhr.responseText;
                        }} else {{
                            window.__{id} = "1";
                        }}
                    }}
                }};

                xhr.onerror = function() {{
                    window.__{id} = "";
                }};

                xhr.send(JSON.stringify(data));
            }}

            posthtml("{url}", {headers_dict}, JSON.parse(arguments[0]));
            '''

        # 打印调试信息
        print(f"URL: {url}")
        print(f"Headers: {headers_js}")
        print(f"Data: {data_js}")
        print(f"JS Code: {js_code}")

        # 执行异步 JavaScript，传入 url、headers 和 data
        self.page.run_async_js(js_code, data_js)

        q = ''

        while True:
            s = self.page.run_js(f'return window.__{id};')
            if s:
                q = s
                self.page.run_js(f'window.__{id} = null;')
                break
            time.sleep(1)

        return q

    async def post_backend_api_conversation(self, body):
        websocket_request_id = self.page.run_js("return window.test11.Z();")

        js_code = '''
        async function post_backend_api_conversation(body,websocket_request_id) {

  let chatreq = await (0, window.test1.rS)();
  function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  let threadid = generateUUID();
  let parentMessageId = generateUUID();
  let id = generateUUID();
  let arkoseToken = await window.test2.ZP.getEnforcementToken(chatreq);
  let proofToken = await window.test4.Z.getEnforcementToken(chatreq);
  let q = {
    model: "gpt-4o",
    completionType: "next",
    historyDisabled: true,
    parentMessageId: parentMessageId,
    messages: [
      {
        id: id,
        author: {
          role: "user",
        },
        content: {
          content_type: "text",
          parts: ["那个国家最有钱？"],
        },
        metadata: {},
      },
    ],
    chatReq: chatreq,
    arkoseToken: arkoseToken,
    turnstileToken: null,
    proofToken: proofToken,
    completionMetadata: {
      suggestions: [],
      conversationMode: {
        kind: "primary_assistant",
        plugin_ids: null,
      },
    },
    forceParagen: false,
    forceParagenModel: "",
    forceNulligen: false,
    forceRateLimit: false,
    resetRateLimits: false,
  };
  function replaceValues(target, source) {
    console.log("target: ",target);
    console.log("source: ",source);
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (
          typeof source[key] === "object" &&
          source[key] !== null &&
          !Array.isArray(source[key])
        ) {
          if (!target[key]) {
            target[key] = {};
          }
          replaceValues(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  }

  replaceValues(q, body);
  console.log(q);
  await window.test10(q, null, null,websocket_request_id);
}

post_backend_api_conversation(JSON.parse(arguments[0]),arguments[1]);


        '''
        decoded_data = body.decode('utf-8')
        message = json.loads(decoded_data)
        # if 'messages' in message:
        #     for i in range(len(message['messages'])):
        #         if 'content' in message['messages'][i] and 'parts' in message['messages'][i]['content']:
        #             message['messages'][i]['content']['parts'][0] = message['messages'][i]['content']['parts'][0].encode('utf-8').decode('unicode_escape')

        data_js = json.dumps(message).replace("False", "false").replace("True", "true")
        print(data_js)

        self.page.run_js(js_code, data_js, websocket_request_id)
        q = '{}'
        i = 0
        if "Just" in self.page.title:
            self.init_page()
            return "{}"
        try:
            while True:
                s = self.page.run_js(f'return window[\'__{websocket_request_id.replace("-", "")}\'];')
                print([f'__{websocket_request_id.replace("-", "")}'])
                i += 1
                if i > 60:
                    q = "{ }"
                    break
                if s:
                    q = s
                    self.page.run_js(f'window[\'__{websocket_request_id.replace("-", "")}\'] = null;')
                    break
                time.sleep(1)
            if q == "{}":
                self.init_page()
            return q
        except:
            return "{}"


class BackendApiConversationHandler(tornado.web.RequestHandler):
    def initialize(self, gpt):
        self.gpt = gpt

    async def get(self):
        target_url = f"https://chatgpt.com/backend-api/conversation"
        json = await self.gpt.get_page_use_webpage_js_get(target_url, self.request.headers)
        print(json)
        self.set_header('Content-Type', 'application/json')
        self.write(json)

    async def post(self):
        target_url = f"https://chatgpt.com/backend-api/conversation"
        json2 = await self.gpt.post_backend_api_conversation(self.request.body)
        self.set_header('Content-Type', 'application/json')
        self.write(json2)


def make_app(gpt):
    return tornado.web.Application([
        (r"/backend-api/conversation", BackendApiConversationHandler, dict(gpt=gpt)),
        (r"/v1/chat/completions", CompletionHandler, dict(gpt=gpt, apiKey=APIKEY)),
    ])


def main():
    gpt = GptWeb(1)
    app = make_app(gpt)
    app.listen(9999)
    print("Server is running on http://0.0.0.0:9999")
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()


