import psycopg2 as psycopg2
from flask import Flask, jsonify, request
# Import Cross-Origin Resource Sharing to enable
# services on other ports on this machine or on other
# machines to access this app
from flask_cors import CORS, cross_origin

from handler.email import EmailHandler
from handler.user import UserHandler
from handler.debug import DebugHandler

# Activate
app = Flask(__name__)
# Apply CORS to this app
CORS(app)

@app.route('/')
def greeting():
    return 'Hello, this is the parts DB App!'

@app.route('/EmailService/email', methods = ['POST',"GET"])
def getAllEmail():
    if request.method == 'POST':
        return EmailHandler().InsertEmail(request.json)
    else:
        return EmailHandler().getAllEmails()

@app.route('/EmailService/email/<int:email_id>', methods=['GET', 'PUT', 'DELETE'])
def getEmailbyId(email_id):
    if request.method == "GET":
        return EmailHandler().getEmailbyId(email_id)
    elif request.method == "PUT":
        return EmailHandler().updateEmail(email_id,request.json)
    elif request.method == "DELETE":
        return EmailHandler().deleteEmail(email_id)
    else:
        return jsonify(Error = "Method not allowed"), 405


@app.route('/EmailService/User/fillwithdummy')
def FillWithDummyData():
    return DebugHandler().fill()


@app.route('/EmailService/inbox/<int:user_id>')
def getInbox(user_id):
    return EmailHandler().getInbox(user_id)

@app.route('/EmailService/outbox/<int:user_id>')
def getOutbox(user_id):
    return EmailHandler().getOutbox(user_id)

@app.route('/EmailService/EmailWithMostRecipients')
def getEmailWithMostRecipients():
    return EmailHandler().getEmailWithMostRecipients()

@app.route('/EmailService/EmailWithMostReplies')
def getEmailWithMostReplies():
    return EmailHandler().getEmailWithMostReplies()

@app.route('/EmailService/Top10UsersWithMoreEmailsInInbox')
def getTop10UsersInbox():
    return UserHandler().getTop10UsersInbox()

@app.route('/EmailService/Top10UsersWithMoreEmailsInOutbox')
def getTop10UsersOutbox():
    return UserHandler().getTop10UsersOutbox()



@app.route('/EmailService/users', methods=['GET','POST'])
def getAllUsers():
    if request.method == 'POST':
        return UserHandler().InsertUser(request.json)
    else:
        return UserHandler().getAllUsers()



if __name__ == '__main__':
    app.run()