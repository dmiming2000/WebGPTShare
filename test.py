


from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key='testkey',
    base_url= 'http://127.0.0.1:9999/v1'
)
# openai.api_base = 'http://127.0.0.1:5000/backend-api/conversation'
def optimize_sentence(sentence):
    # 构建请求消息
    messages = [
        {"role": "system", "content": "你是一个语言模型，帮助优化句子和扩展句子为一个自然段使其更通顺。只需要给出修改后的句子，不需要其它任何说明。"},
        {"role": "user", "content": f"请帮我优化这句话，使其更通顺：{sentence}"}
    ]

    # 调用 OpenAI API 进行聊天
    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )

    # 提取并返回优化后的句子
    optimized_sentence = response.choices[0].message.content.strip()
    return optimized_sentence


# 示例用法
sentence = "宝宝取名生辰八字免费 锦航、奕然、嘉彦、梓原、谨丞、易天、溢昕 宝宝起名网免费:八字命理学、新派五格法、占星名学、奇门名字学 新乡景名源起名中心(中华隆取名网) 用好名字 提升个人气场 发展飞速 --测名网"
optimized = optimize_sentence(sentence)
print(optimized)
