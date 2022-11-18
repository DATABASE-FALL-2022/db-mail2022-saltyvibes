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


@app.route('/EmailService/inbox/<int:user_id>')
def getInbox(user_id):
    return EmailHandler().getInbox(user_id)

@app.route('/EmailService/outbox/<int:user_id>')
def getOutbox(user_id):
    return EmailHandler().getOutbox(user_id)

@app.route('/EmailService/users')
def getAllUsers():
    return UserHandler().getAllUsers()



if __name__ == '__main__':
    app.run()