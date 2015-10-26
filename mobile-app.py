from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def mobile():


	return render_template('mobile.html',
		                    MTN_Pay_Per_Second= {"Peak SMS Rates" : "R 0.50",
		                                         "Call Rates In Network" : "R 0.70",
		                                         "Call Rates Other Network" :"R 0.79"}

   

if __name__ == "__main__":
    app.run(debug=True)