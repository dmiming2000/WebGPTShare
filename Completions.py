import json
import time
import uuid
from tornado.web import RequestHandler


MAXTIME = 60  # Example value, set your actual config here
APISERVER = 'your_api_server_url'  # Set your actual API server URL here
PASSMODE = False  # Example value, set your actual config here
KEEPHISTORY = True  # Example value, set your actual config here

ErrNoAuth = {
    "error": {
        "message": "You didn't provide an API key...",
        "type": "invalid_request_error",
        "param": None,
        "code": None
    }
}

ErrKeyInvalid = {
    "error": {
        "message": "Incorrect API key provided...",
        "type": "invalid_api_key",
        "param": None,
        "code": "invalid_api_key"
    }
}

ChatReqStr = {
    "action": "next",
    "messages": [{"id": "", "author": {"role": "user"}, "content": {"content_type": "text", "parts": [""]}, "metadata": {}}],
    "parent_message_id": "",
    "model": "text-davinci-002-render-sha",
    "timezone_offset_min": -480,
    "suggestions": [],
    "history_and_training_disabled": True,
    "conversation_mode": {"kind": "primary_assistant"},
    "force_paragen": False,
    "force_rate_limit": False
}

Chat4ReqStr = {  # Similar structure to ChatReqStr, adjusted for GPT-4 model
    "action": "next",
    "messages": [{"id": "", "author": {"role": "user"}, "content": {"content_type": "text", "parts": [""]}, "metadata": {}}],
    "parent_message_id": "",
    "model": "gpt-4o",
    "timezone_offset_min": 420,
    "suggestions": [],
    "history_and_training_disabled": False,
    "conversation_mode": {"kind": "primary_assistant"},
    "force_paragen": False,
    "force_rate_limit": False
}

class CompletionHandler(RequestHandler):
    def initialize(self, gpt,apiKey):
        self.gpt = gpt
        self.apiKey = apiKey
    async def post(self):
        # try:
            authkey = self.request.headers.get("Authorization", "").replace("Bearer ", "").strip()

            if not authkey or authkey != self.apiKey:
                self.set_status(401)
                self.write(ErrNoAuth)
                return

            token = self.get_token(authkey)
            if not token:
                self.set_status(401)
                self.write(ErrKeyInvalid)
                return

            ChatGPTAccountID = self.request.headers.get("ChatGPT-Account-ID", "")

            decoded_data = self.request.body.decode('utf-8')
            message = json.loads(decoded_data)
            req = message
            new_messages = "\n".join([message["content"] for message in req["messages"]])

            ChatReq = ChatReqStr.copy()
            if req["model"].startswith("gpt-4"):
                ChatReq = Chat4ReqStr.copy()

            ChatReq["messages"][0]["content"]["parts"][0] = new_messages
            ChatReq["messages"][0]["id"] = str(uuid.uuid4())
            ChatReq["parent_message_id"] = str(uuid.uuid4())
            if req.get("plugin_ids"):
                ChatReq["plugin_ids"] = req["plugin_ids"]
            if KEEPHISTORY:
                ChatReq["history_and_training_disabled"] = False

            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}"
            }
            if ChatGPTAccountID:
                headers["ChatGPT-Account-ID"] = ChatGPTAccountID


            rep_data = await self.gpt.post_backend_api_conversation(json.dumps(ChatReq).encode('utf-8'))


            if req.get("stream"):
                self.set_header("Content-Type", "text/event-stream; charset=utf-8")
                self.set_header("Cache-Control", "no-cache")
                self.set_header("Connection", "keep-alive")


                response_data = rep_data
                if 'message' in response_data:
                    role = response_data['message']['author']['role']
                    if role == "assistant":
                        content = response_data['message']['content']['parts'][0]
                        if content:
                            self.write("data: {}\n\n".format(self.get_stream_response(content, req["model"])))
                            await self.flush()
                        else:
                            self.write("data: {}\n\n".format(self.get_stream_end_response()))
                            await self.flush()
                            self.finish()
                    else:
                        self.set_status(404)
                        self.write("404 Not Found")
                else:
                    self.set_status(404)
                    self.write("404 Not Found")
                self.finish()
            else:
                response_data = rep_data

                if 'message' in response_data:
                    role = response_data['message']['author']['role']
                    if role == 'assistant':
                        content = response_data['message']['content']['parts'][0]
                        self.write(self.get_completion_response(content, new_messages, req["model"]))
                        self.finish()
                    else:
                        self.set_status(404)
                        self.write("404 Not Found")
                        self.finish()
                else:
                    #404
                    self.set_status(404)
                    self.write("404 Not Found")
                    self.finish()
        # except Exception as e:
        #     self.set_status(500)
        #     self.write({"error": str(e)})

    def get_token(self, authkey):
        if PASSMODE:
            return authkey
        # Replace with your actual method to convert authkey to token
        return "your_token_here"

    def get_stream_end_response(self):
        return json.dumps({
            "id": str(uuid.uuid4()),
            "object": "chat.completion.chunk",
            "created": int(time.time()),
            "model": "apirespmodel",
            "choices": [{"delta": {}, "index": 0, "finish_reason": "stop"}]
        })

    def get_stream_response(self, content, model):
        return json.dumps({
            "id": str(uuid.uuid4()),
            "object": "chat.completion.chunk",
            "created": int(time.time()),
            "model": model,
            "choices": [{"delta": {"content": content}, "index": 0, "finish_reason": None}]
        })

    def get_completion_response(self, content, new_messages, model):
        completion_tokens = self.count_tokens(content)
        prompt_tokens = self.count_tokens(new_messages)
        total_tokens = completion_tokens + prompt_tokens

        return json.dumps({
            "id": str(uuid.uuid4()),
            "object": "chat.completion",
            "created": int(time.time()),
            "model": model,
            "usage": {
                "prompt_tokens": prompt_tokens,
                "completion_tokens": completion_tokens,
                "total_tokens": total_tokens
            },
            "choices": [{"message": {"role": "assistant", "content": content}, "finish_reason": "stop", "index": 0}]
        })

    def count_tokens(self, text):
        # Implement your token counting logic here
        # print(text)
        return len(text.split())


