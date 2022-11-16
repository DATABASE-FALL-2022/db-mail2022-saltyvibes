import psycopg2 as psycopg2
from flask import Flask, jsonify, request
# Import Cross-Origin Resource Sharing to enable
# services on other ports on this machine or on other
# machines to access this app
from flask_cors import CORS, cross_origin

from handler.email import EmailHandler
from handler.users import UserHandler
from handler.debug import DebugHandler

# Activate
app = Flask(__name__)
# Apply CORS to this app
CORS(app)

@app.route('/')
def greeting():
    return 'Hello, this is the parts DB App!'

@app.route('/EmailService/email')
def getAllEmail():
    return EmailHandler().getAllEmails()

@app.route('/EmailService/User/fillwithdummy')
def FillWithDummyData():
    return DebugHandler().fill()


@app.route('/EmailService/inbox/<int:uid>')
def getInbox(uid):
    return EmailHandler().getInbox(uid)

@app.route('/EmailService/outbox/<int:uid>')
def getOutbox(uid):
    return EmailHandler().getOutbox(uid)

@app.route('/EmailService/users')
def getAllUsers():
    return UserHandler().getAllUsers()



if __name__ == '__main__':
    app.run()