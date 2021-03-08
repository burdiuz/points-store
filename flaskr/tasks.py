from flask import Flask, request

app = Flask(__name__)

def api_tasks_read():
  return ''

def api_tasks_create():
  return ''

def api_tasks_update():
  return ''

def api_tasks_delete():
  return ''

methods = {
  'GET': api_tasks_read,
  'POST': api_tasks_create,
  'PUT': api_tasks_update,
  'DELETE': api_tasks_delete,
}

@app.route('/api/tasks', methods=['GET', 'POST', 'PUT', 'DELETE'])
def api_tasks():
  return methods[request.method]()
