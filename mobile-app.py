from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def main():
    return render_template('mobile.html')

@app.route("/mtn_plan1")
def MTN_Pay_Per_Second():


	return render_template('plans.html',
		                    MTN_Pay_Per_Second={"Peak SMS Rates" : "R 0.50",
		                                         "Call Rates In Network" : "R 0.70",
		                                         "Call Rates Other Network" :"R 0.79",
		                                         "Data Per MB" :"R 0.99"

		                                         })

@app.route("/plan1")	                        
def MTN_zone():
 return render_template('plan1.html',
	                    MTN_Zone_Per_Second={"Peak SMS Rates" : "R 0.75",
		                                         "Call Rates In Network" : "R 2.50",
		                                         "Call Rates Other Network" : "R 2.50",
		                                         "Data Per MB" : "R 2.00"
		                                         })	       

   

if __name__ == "__main__":
    app.run(debug=True)
