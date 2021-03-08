from flask import Flask

app = Flask(__name__)

@app.route('/api/points', methods=['GET'])
def api_points():
  return ''
