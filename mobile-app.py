from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def mobile():


	return render_template('mobile.html')
   

if __name__ == "__main__":
    app.run(debug=True)