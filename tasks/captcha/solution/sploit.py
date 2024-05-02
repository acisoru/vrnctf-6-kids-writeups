import requests
from my_math import eval_expr

curl = requests.session()
i = 0
url = <url>
port = <port>
req = curl.get(f"http://{url}:{port}")
expr = req.text.split('<div style="text-align: center;">\n')[1].split("\n")[0].strip()
while i != 1000:
    req = curl.post(f"http://{url}:{port}", data={"answer": eval_expr(expr)})
    expr = req.text.split('<div style="text-align: center;">\n')[1].split("\n")[0].strip()
    i += 1
req = curl.post(f"http://{url}:{port}", data={"answer": eval_expr(expr)})
print(req.text)