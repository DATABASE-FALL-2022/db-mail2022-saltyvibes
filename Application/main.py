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
    return 'Hello, this is the Email Service!'

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

@app.route('/EmailService/inbox/<int:user_id>/email_address/<string:email_address>')
def getInboxFilteredByEmail(user_id,email_address):
    return EmailHandler().getInboxFilteredByEmail(user_id,email_address)

@app.route('/EmailService/inbox/<int:user_id>/deleteemail/<int:email_id>')
def getInboxdeleteemail(user_id,email_id):
    return EmailHandler().deleteemailfrominbox(user_id,email_id)

@app.route('/EmailService/inbox/<int:user_id>/filter/<string:category>')
def getFilteredInbox(user_id,category):
    return EmailHandler().getFilteredInbox(user_id,category)

@app.route('/EmailService/outbox/<int:user_id>')
def getOutbox(user_id):
    return EmailHandler().getOutbox(user_id)

@app.route('/EmailService/outbox/<int:user_id>/email_address/<string:email_address>')
def getOutboxFilteredByEmail(user_id,email_address):
    return EmailHandler().getOutboxFilteredByEmail(user_id,email_address)

@app.route('/EmailService/outbox/<int:user_id>/deleteemail/<int:email_id>')
def deleteemailfromoutbox(user_id,email_id):
    return EmailHandler().deleteemailfromoutbox(user_id,email_id)

@app.route('/EmailService/email_from_user/<int:email_id>/<int:user_id>')
def getEmailFromUser(email_id,user_id):
    return EmailHandler().getEmailFromUser(email_id,user_id)

@app.route('/EmailService/EmailWithMostRecipients')
def getEmailWithMostRecipients():
    return EmailHandler().getEmailWithMostRecipients()

@app.route('/EmailService/ReadEmailFromUser')
def ReadEmailFromUser():
    return EmailHandler().ReadEmailFromUser(request.json)

@app.route('/EmailService/EmailWithMostReplies')
def getEmailWithMostReplies():
    return EmailHandler().getEmailWithMostReplies()

@app.route('/EmailService/Top10UsersWithMoreEmailsInInbox')
def getTop10UsersInbox():
    return UserHandler().getTop10UsersInbox()

@app.route('/EmailService/Top10UsersWithMoreEmailsInOutbox')
def getTop10UsersOutbox():
    return UserHandler().getTop10UsersOutbox()

@app.route('/EmailService/EmailWithMostRecipientsbyUser/<int:user_id>')
def getEmailWithMostRecipientsbyUser(user_id):
    return EmailHandler().getEmailWithMostRecipientsbyUser(user_id)

@app.route('/EmailService/EmailWithMostRepliesbyUser/<int:user_id>')
def getEmailWithMostRepliesbyUser(user_id):
    return EmailHandler().getEmailWithMostRepliesbyUser(user_id)

@app.route('/EmailService/TopFiveUsersSentEmails/<int:user_id>')
def getTopFiveUsersSentEmails(user_id):
    return UserHandler().TopFiveUsersSentEmails(user_id)

@app.route('/EmailService/TopFiveUsersReceivedEmails/<int:user_id>')
def getTopFiveUsersReceivedEmails(user_id):
    return UserHandler().TopFiveUsersReceivedEmails(user_id)

@app.route('/EmailService/users', methods=['GET','POST'])
def getAllUsers():
    if request.method == 'POST':
        return UserHandler().InsertUser(request.json)
    else:
        return UserHandler().getAllUsers()
@app.route('/EmailService/users/<int:user_id>', methods=['GET','PUT',"DELETE"])
def getUserByID(user_id):

    if request.method == "GET":
        print(user_id)
        return UserHandler().getUserbyId(user_id)
    elif request.method == "PUT":
        return UserHandler().updateUser(user_id,request.json)
    elif request.method == "DELETE":
        return UserHandler().deleteUser(user_id)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/EmailService/reply', methods=['POST'])
def createReply():
    if request.method == 'POST':
        return EmailHandler().CreateReply(request.json)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/EmailService/reply/<int:reply_id>/', methods=['GET','PUT'])
def getReplybyId(reply_id):
    if request.method == "GET":
        return EmailHandler().getReply(reply_id)
    elif request.method == "PUT":
        return EmailHandler().updateReply(reply_id,request.json)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/EmailService/reply/<int:reply_id>/<int:original_id>', methods=['DELETE'])
def deleteReplyByID(reply_id,original_id):
    if request.method == "DELETE":
        return EmailHandler().unsendReply(reply_id,original_id)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/EmailService/receive', methods=['POST','GET','PUT',"DELETE"])
def createReceive():
    if request.method == 'POST':
        return EmailHandler().sendEmail(request.json)
    elif request.method == "GET":
        return EmailHandler().getReceives(request.json)
    elif request.method == "PUT":
        return EmailHandler().updateReceives(request.json)
    elif request.method == "DELETE":
        return EmailHandler().unsendEmail(request.json)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/EmailService/GetUserInformationUsingEmailAddress/<string:email_address>')
def getUserInfoByEmail(email_address):
    return UserHandler().getUserInfoByEmail(email_address)

@app.route('/EmailService/Friend',methods=['POST','GET','PUT',"DELETE"])
def Friend():
    if request.method == 'POST':
        return UserHandler().addFriend(request.json)
    elif request.method == "GET":
        return UserHandler().getFriend(request.json)
    elif request.method == "PUT":
        return UserHandler().updateFriend(request.json)
    elif request.method == "DELETE":
        return UserHandler().removeFriend(request.json)
    else:
        return jsonify(Error = "Method not allowed"), 405

@app.route('/EmailService/Friend/<int:owner_id>/<int:friend_id>')
def getSpecificFriend(owner_id,friend_id):
        return UserHandler().getSpecificFriend(owner_id,friend_id)



if __name__ == '__main__':
    app.run()