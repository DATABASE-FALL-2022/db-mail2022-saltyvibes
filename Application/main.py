import psycopg2 as psycopg2
from flask import Flask, jsonify, request
# Import Cross-Origin Resource Sharing to enable
# services on other ports on this machine or on other
# machines to access this app
from flask_cors import CORS, cross_origin

from handler.email import EmailHandler
from handler.users import UserHandler

# Activate
app = Flask(__name__)
# Apply CORS to this app
CORS(app)

@app.route('/')
def greeting():
    return 'Hello, this is the parts DB App!'

@app.route('/EmailService/email')
def getAllEmail():
    return EmailHandler().getAllParts()

@app.route('/EmailService/inbox/<int:pid>')
def getInbox(pid):
    return EmailHandler().getInbox(pid)

@app.route('/EmailService/outbox/<int:pid>')
def getOutbox(pid):
    return EmailHandler().getOutbox(pid)

@app.route('/EmailService/users')
def getAllUsers():
    return UserHandler().getAllUsers()



if __name__ == '__main__':
    app.run()