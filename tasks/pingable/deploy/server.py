from flask import Flask, request, render_template
import subprocess, os

app = Flask(__name__)

@app.route('/')
def index():
    output = "Сканнер внутренних сервисов. Введите ip для проверки."
    if request.args.get('ip'):
        output = ping(request.args.get('ip'))
    return render_template('page.html', output=output)


def ping(ip):
    return subprocess.check_output(f"ping -c 4 {ip}", shell=True).decode("utf-8")



app.run(host='0.0.0.0', port=5000)