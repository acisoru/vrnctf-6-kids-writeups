from flask import Flask, request, render_template, session, url_for, redirect, send_file
from my_math import generate_expr, eval_expr

app = Flask(__name__)
app.secret_key = "some_very_secret_key"
app.debug = False

@app.route("/index", methods=["GET", "POST"])
@app.route("/", methods=["GET", "POST"])
def index():
    if not session:
        session["count"] = 0
    if session["count"] == 1000:
        return render_template("index.html", message = "vrnctf{y0u_p4553d_7h3_7357}")
    if not session.get("captcha"):
        session["captcha"] = generate_expr()
        session["answer"] = eval_expr(session["captcha"])
    if request.method == "POST":
        answer = request.form.get("answer")
        try:
            answer = int(answer)
        except:
            session["count"] = 0
            del session["captcha"]
            return render_template("index.html", message = "You entered something bad! <a href='/'>Will you try again?</a>")
        if int(answer) == session["answer"]:
            session["count"] += 1
            session["captcha"] = generate_expr()
            session["answer"] = eval_expr(session["captcha"])
            redirect(url_for("index"))
        else:
            session["count"] = 0
            del session["captcha"]
            return render_template("index.html", message = "WRONG! <a href='/'>Will you try again?</a>")
    return render_template("index.html", captcha = session["captcha"], count = session["count"])


@app.route("/kafif.jpg", methods=["GET", "POST"])
def download():
    path = "/app/templates/kafif.jpg"
    return send_file(path, as_attachment=True)


if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
