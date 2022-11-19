from flask import jsonify
from dao.email import EmailDAO


class EmailHandler:
    def build_email_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['email_ID'] = row[1]
        result['date_created'] = row[2]
        result['subject'] = row[3]
        result['body'] = row[4]
        return result

    def build_email_dict_nousr(self, row):
        result = {}
        result['email_ID'] = row[0]
        result['date_created'] = row[1]
        result['subject'] = row[2]
        result['body'] = row[3]
        return result

    def build_email_attributes(self, email_id, date_created, subject, body, user_id):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = date_created
        result["subject"] = subject
        result["body"] = body
        result["user_id"] = user_id
        return result

    def getAllEmails(self):
        dao = EmailDAO()
        user_list = dao.getAllEmails()
        result_list = []
        for row in user_list:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(Email=result_list)

    def InsertEmail(self, form):
        if len(form) != 4:
            return jsonify(Error="Malformed post request"), 400
        else:
            date_created = form["date_created"]
            subject = form["subject"]
            body = form["body"]
            user_id = form["user_id"]
            if date_created and subject and body and user_id:
                dao = EmailDAO()
                email_id = dao.insert(date_created, subject, body, user_id)
                result = self.build_email_attributes(email_id, date_created, subject, body, user_id)
                return jsonify(Email=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400
    def getEmailbyId(self,email_id):
        dao = EmailDAO()
        row = dao.getEmailbyId(email_id)
        if not row:
            return jsonify(Error="Email Not Found"), 404
        else:
            email = self.build_email_dict(row)
            return jsonify(Email=email)

    def getInbox(self, ID):
        dao = EmailDAO()
        inbox = dao.getInbox(ID)
        result_list = []
        for row in inbox:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(Inbox=result_list)

    def getOutbox(self, ID):
        dao = EmailDAO()
        Outbox = dao.getOutbox(ID)
        result_list = []
        for row in Outbox:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(Outbox=result_list)

    def getEmailWithMostRecipients(self):
        dao = EmailDAO()
        email = dao.getEmailWithMostRecipients()
        result_list = []
        for row in email:
            result = self.build_email_dict_nousr(row)
            result_list.append(result)
        if len(result_list) > 1:
            return jsonify(Email_With_Most_Recipients_Tied=result_list)
        else:
            return jsonify(Email_With_Most_Recipients=result_list)

    def getEmailWithMostReplies(self):
        dao = EmailDAO()
        email = dao.getEmailWithMostReplies()
        result_list = []
        for row in email:
            result = self.build_email_dict_nousr(row)
            result_list.append(result)
        if len(result_list) > 1:
            return jsonify(Email_With_Most_Replies_Tied=result_list)
        else:
            return jsonify(Email_With_Most_Replies=result_list)
