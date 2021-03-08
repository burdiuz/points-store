from flask import Flask
from os import urandom
import api

app = Flask(__name__)
app.secret_key = urandom(16)

@app.route('/')
def hello_world():
  return 'Hello World!'

import hashlib, uuid
salt = uuid.uuid4().hex
hashed_password = hashlib.sha512((password + salt + salt).encode('utf8')).hexdigest()
