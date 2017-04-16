from flask import Flask, render_template, json, request, Response, jsonify
import urllib
import operator
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route("/")
def main():
	print request.environ['REMOTE_ADDR']
	return render_template('index.html')

@app.route('/extract', methods=['POST'])
def extract():
	if request.headers['Content-Type'] == 'application/json':	 			 	  
 		json = request.json	
		link = json.get("url")
		html = urllib.urlopen(link).read()
		soup = BeautifulSoup(html,"html.parser")

		for script in soup(["script", "style"]):
		    script.extract()    

		
		text = soup.get_text()

		
		lines = (line.strip() for line in text.splitlines())
		
		chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
		
		text = '\n'.join(chunk for chunk in chunks if chunk)

		freq = wordListToFreqDict(text);
		return jsonify({'extractResponse' : text, 'frequency': freq})
	else:
 		return jsonify({'urlResponse' : 'Cannot Find JSON type'})

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