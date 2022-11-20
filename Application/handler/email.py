from flask import jsonify
from dao.email import EmailDAO


class EmailHandler:
    def build_email_dict(self, row):
        result = {}
        print(row)
        result['user_id'] = row[3]
        result['email_ID'] = row[1]
        result['date_created'] = row[2]
        result['subject'] = row[3]
        result['body'] = row[4]
        return result

    def build_inbox_dict(self, row):
        result = {}
        print(row)
        result['user_id'] = row[0]
        result['email_ID'] = row[1]
        result['date_created'] = row[2]
        result['subject'] = row[3]
        result['body'] = row[4]
        result['category'] = row[5]
        if isinstance(row[6], int):
            result["is_reply"] = 1
        else:
            result["is_reply"] = 0
        return result

    def build_outbox_dict(self, row):
        result = {}
        print(row)
        result['user_id'] = row[0]
        result['email_ID'] = row[1]
        result['date_created'] = row[2]
        result['subject'] = row[3]
        result['body'] = row[4]
        if isinstance(row[5], int):
            result["is_reply"] = 1
        else:
            result["is_reply"] = 0
        return result

    def build_email_dict_nousr(self, row):
        result = {}
        result['email_ID'] = row[0]
        result['date_created'] = row[1]
        result['subject'] = row[2]
        result['body'] = row[3]
        return result

    def build_get_email_attributes(self,email_id,row):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = row[0]
        result["subject"] = row[1]
        result["body"] = row[2]
        result["user_id"] = row[3]
        result["is_deleted"] = row[4]
        return result

    def build_email_attributes(self, email_id, date_created, subject, body, user_id,is_deleted):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = date_created
        result["subject"] = subject
        result["body"] = body
        result["user_id"] = user_id
        result["is_deleted"] = is_deleted
        return result

    def build_reply_attributes(self, email_id, date_created, subject, body, user_id,reply_id):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = date_created
        result["subject"] = subject
        result["body"] = body
        result["user_id"] = user_id
        result["reply_id"] = reply_id
        return result

    def getAllEmails(self):
        dao = EmailDAO()
        user_list = dao.getAllEmails()
        result_list = []
        for row in user_list:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(Email=result_list)


    def updateEmail(self,email_id,form):
        dao = EmailDAO()
        if not dao.getEmailbyId(email_id):
            return jsonify(Error="Email not found"), 404
        else:
            if len(form) != 5:
                return jsonify(Error="Malformed update request"), 400
            else:
                date_created = form["date_created"]
                subject = form["subject"]
                body = form["body"]
                user_id = form["user_id"]
                is_deleted = form["is_deleted"]
                if date_created and subject and body and user_id and is_deleted:
                    dao.update(email_id,date_created,subject,body,user_id,is_deleted)
                    result = self.build_email_attributes(email_id,date_created,subject,body,user_id,is_deleted)
                    return jsonify(Email=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400

    def deleteEmail(self,email_id):
        dao = EmailDAO()
        if not dao.getEmailbyId(email_id):
            return jsonify(Error= "Email not found"), 404
        else:
            dao.delete(email_id)
            return jsonify(DeleteStatus = "OK"), 200

    def InsertEmail(self, form):
        if len(form) != 4:
            return jsonify(Error="Malformed post request"), 400
        else:
            date_created = form["date_created"]
            subject = form["subject"]
            body = form["body"]
            user_id = form["user_id"]
            is_deleted = form["is_deleted"]
            if date_created and subject and body and user_id and is_deleted:
                dao = EmailDAO()
                email_id = dao.insert(date_created, subject, body, user_id)
                result = self.build_email_attributes(email_id, date_created, subject, body, user_id,is_deleted)
                return jsonify(Email=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400

    def CreateReply(self, form):
        print(len(form))
        if len(form) != 5:
            return jsonify(Error="Malformed post request"), 400
        else:
            date_created = form["date_created"]
            subject = form["subject"]
            body = form["body"]
            user_id = form["user_id"]
            reply_id = form["reply_id"]
            if date_created and subject and body and user_id and reply_id:
                dao = EmailDAO()
                email_id = dao.reply(date_created, subject, body, user_id,reply_id)
                result = self.build_reply_attributes(email_id, date_created, subject, body, user_id,reply_id)
                return jsonify(Reply=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400

    def getEmailbyId(self,email_id):
        dao = EmailDAO()
        row = dao.getEmailbyId(email_id)
        if not row:
            return jsonify(Error="Email Not Found"), 404
        else:
            email = self.build_get_email_attributes(email_id,row)
            return jsonify(Email=email)

    def getInbox(self, ID):
        dao = EmailDAO()
        inbox = dao.getInbox(ID)
        result_list = []
        for row in inbox:
            result = self.build_inbox_dict(row)
            result_list.append(result)
        return jsonify(Inbox=result_list)


    def getEmailWithMostRecipientsbyUser(self,user_id):
        dao = EmailDAO()
        email = dao.getEmailWithMostRecipientsbyUser(user_id)
        result_list = []
        for row in email:
            result = self.build_email_dict_nousr(row)
            result_list.append(result)
        if len(result_list) > 1:
            return jsonify(Email_With_Most_Recipients_Tied=result_list)
        else:
            return jsonify(Email_With_Most_Recipients=result_list)

    def getOutbox(self, ID):
        dao = EmailDAO()
        Outbox = dao.getOutbox(ID)
        result_list = []
        for row in Outbox:
            result = self.build_outbox_dict(row)
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
