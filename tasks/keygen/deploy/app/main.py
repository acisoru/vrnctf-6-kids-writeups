from flask import Flask, request, render_template

app = Flask(__name__)

app.config.from_object(__name__)


def generate_key(login: str):
    length = len(login)
    login = (length * 32)
    v2 = 37
    v3 = 1
    key = 0

    while(length > 0):
        key = v2 ^ ((v2 * login - v2) - v3 + 70595907 + v2 * (login - v2))
        v3 = 4
        v2 = 101
        length -= 1
    
    return key


def check_login(login: str):
    ln = len(login)
    if ln < 5 or ln > 16:
        return False
    
    if login[0] != 'e' or login[5] != 'e':
        return False
    
    return True


@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if password.isdigit() == False:
            return "f1f_1Ssue"

        password = int(password)

        generated = generate_key(username)

        if check_login(username) == False:
            return "f1f_1Ssue"

        if generated == password:
            return "vrnctf{p3rs3v3raNc3_k3y_t0_d1sc0v3ry}"
        else:
            return "f1f_1Ssue"
    else:
        return render_template('login.html')


if __name__ == '__main__':
    app.run(host="0.0.0.0")