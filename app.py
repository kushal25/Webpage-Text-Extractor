from flask import Flask, render_template, json, request, Response, jsonify
import urllib
import operator
from flask.ext.pymongo import PyMongo
from bs4 import BeautifulSoup
import datetime

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://52.40.203.182:27017/cushion'
# app.config['MONGO_URI'] = 'mongodb://localhost:27017/cushion'
app.config['MONGO_USERNAME'] = 'admin'
app.config['MONGO_PASSWORD'] = 'cushion321!'
mongo = PyMongo(app, config_prefix='MONGO')

@app.route("/")
def main():
	reqJson = {"ip address" : request.environ['REMOTE_ADDR'], "time" : datetime.datetime.now()}	
	mongo.db.statistics.save(reqJson)
	return render_template('index.html')

@app.route("/home")
def home():
	print request.environ['REMOTE_ADDR']
	return render_template('home.html')

@app.route('/showSignUp')
def showSignUp():
	return render_template('signup.html')

@app.route('/showSignIn')
def showSignIn():
	return render_template('signin.html')

@app.route('/signUp',methods=['POST'])
def signUp():	
	if request.headers['Content-Type'] == 'application/json':
		json = request.json			
		_name = json.get("inputName")
		_email = json.get("inputEmail")
		_password = json.get("inputPassword")
		reqJson = {"name" : _name,"email" : _email, "password" : _password}		
		if _email and _password and _name:		
			res = mongo.db.users.find({'email' : _email})								
			if(res.count()>0):			
				return jsonify({'commandResponse' : 'user already exists'})
			else:						
				abc = mongo.db.users.save(reqJson)			
				return jsonify({'commandResponse' : 'user successfully registered','flag' : 1})			
		else:
			return jsonify({'commandResponse' : 'Enter the required fields'})
	else:
	 	return jsonify({'commandResponse' : 'Cannot Find JSON type'})


@app.route('/signIn',methods=['POST'])
def signIn(): 		 
	 if request.headers['Content-Type'] == 'application/json':	 			 	  
		  json = request.json	 	 	
		  _email = json.get("inputEmail")
		  _password = json.get("inputPassword")		  		
		  if _email and _password:
			res = mongo.db.users.find({'email' : _email})
			if(res.count()>0):
				if(res[0].get("email") == _email and res[0].get("password") == _password):
					return jsonify({'commandResponse' : 'user loggedin successfully', 'flag' : 1})
				else:
					return jsonify({'commandResponse' : 'Incorrect Credentials'})
			else:
				return jsonify({'commandResponse' : 'No User Found'})
		  else:
			return jsonify({'commandResponse' : 'Enter the required fields'})
	 else:
		return jsonify({'commandResponse' : 'Cannot Find JSON type'})

@app.route('/logout', methods=['GET'])
def logout():   
	return render_template('signin.html') 

@app.route('/extract', methods=['POST'])
def extract():
	if request.headers['Content-Type'] == 'application/json':	 			 	  
 		json = request.json	
		link = json.get("url")
		try:
			html = urllib.urlopen(link).read()
		except:
			return jsonify({'extractResponse' : 'Invalid URL', 'statusCode' : 400})
		soup = BeautifulSoup(html,"html.parser")

		for script in soup(["script", "style", '[document]', 'head', 'title']):
		    script.extract()    

		
		text = soup.get_text()
		lines = (line.strip() for line in text.splitlines())
		chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
		text = '\n'.join(chunk for chunk in chunks if chunk)

		freq = wordListToFreqDict(text);
		return jsonify({'extractResponse' : text, 'frequency': freq})
	else:
 		return jsonify({'extractResponse' : 'Cannot Find JSON type'})

def wordListToFreqDict(word):
	wordlist = word.split()
	wordfreq = [wordlist.count(p) for p in wordlist]
	hmap = dict(zip(wordlist, wordfreq))
	resultList = [];
	for key, value in sorted(hmap.iteritems(), key=lambda (k,v): (v,k), reverse=True):
		resultMap = {}
		resultMap['word'] = key
		resultMap['freq'] = value
		resultList.append(resultMap)
		# print "%s: %s" % (key, value)
	return resultList[:10]     

if __name__ == "__main__":
	app.run()