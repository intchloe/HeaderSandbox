import base64
import os
from flask import request
import flask

app = flask.Flask(__name__)

@app.route('/', methods = ['GET'])
def index():

        response = flask.render_template('index.html')
        return response, 200

@app.route('/sandbox/', methods = ['GET', 'POST'])
def sandbox():

        all = {}

        if request.method == 'POST':
                response = flask.render_template('sandbox.html')

                #We search through all submitted forms and insert them in our "all" dict which will be used as response headers
                #if request.method == 'POST': for key, value in request.args.get.iteritems(): all.update({key: str(value)})
                for key, value in request.form.iteritems(): all.update({key: str(value)})

                #We seek after not set Headers and remove them if they are empty.
                for x in list(all.keys()):
                        if all[x] == '':
                                del all[x]
                all.pop("payload", None) #We need to manually remove the HTML-key from the headers, otherwise we would have the HTML in the headers. We do not want that

                #Here we decode the HTML-data that was sent via POST. We will insert this in the response body.
                response += base64.b64decode(request.form['payload'].encode('utf-8'))
                response += str('\n</body>\n</html>')
                sleep(1)
        return response, 200, all

@app.route('/examples/', methods = ['GET'])
def examples():
        response = flask.render_template('examples.html')
        return response, 200, {'server': 'chloe'}

@app.route('/info/', methods = ['GET'])
def info():
        response = flask.render_template('info.html')
        return response, 200, {'Content-Security-Policy': "default-src 'none' ; script-src 'none' ; style-src https://fonts.googleapis.com:443/css 'self'; img-src data: ; font-src https://fonts.gstatic.com:443/s/worksans/v2/ https://fonts.googleapis.com:443/css; connect-src 'none' ; media-src 'none' ; object-src 'none' ; child-src 'none' ; frame-ancestors 'none' ; form-action 'none' ; manifest-src 'none' ; referrer no-referrer;"}

port = int(os.environ.get('PORT', '1337'))
app.run(host='0.0.0.0', port=port, debug=False)
