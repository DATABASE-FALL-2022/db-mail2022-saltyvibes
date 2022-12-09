from flask import jsonify
from dao.email import EmailDAO
from dao.user import UserDAO


class EmailHandler:
    def build_email_dict(self, row):
        result = {}
        print(row)
        if row is None:
            return result
        result['user_id'] = row[0]
        result['email_ID'] = row[1]
        result['date_created'] = row[2]
        result['subject'] = row[3]
        result['body'] = row[4]
        return result

    def build_receives_dict(self, row):
        result = {}
        print(row)
        if row is None:
            return result
        result['user_id'] = row[0]
        result['email_id'] = row[1]
        result['is_viewed'] = row[2]
        result['is_deleted'] = row[3]
        result['category'] = row[4]
        return result

    def build_receives_dict2(self,user_id, email_id,is_viewed,is_deleted,category):
        result = {}
        result['user_id'] = user_id
        result['email_id'] = email_id
        result['is_viewed'] = is_viewed
        result['is_deleted'] = is_deleted
        result['category'] = category
        return result

    def build_inbox_dict(self, row):
        result = {}
        print(row)
        if row is None:
            return result
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
        if isinstance(row[7], int):
            result["is_friend"] = 1
        else:
            result["is_friend"] = 0
        return result

    def build_outbox_dict(self, row):
        result = {}
        print(row)
        if row is None:
            return result
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
        if row is None:
            return result
        result['email_ID'] = row[0]
        result['date_created'] = row[1]
        result['subject'] = row[2]
        result['body'] = row[3]
        return result

    def build_get_email_attributes(self, email_id, row):
        result = {}
        result["email_id"] = email_id
        if row is None:
            return result
        result["date_created"] = row[0]
        result["subject"] = row[1]
        result["body"] = row[2]
        result["user_id"] = row[3]
        result["is_deleted"] = row[4]
        return result

    def build_email_attributes2(self, email_id, date_created, subject, body, user_id, is_deleted):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = date_created
        result["subject"] = subject
        result["body"] = body
        result["user_id"] = user_id
        result["is_deleted"] = is_deleted
        return result

    def build_email_attributes(self, email_id, date_created, subject, body, user_id):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = date_created
        result["subject"] = subject
        result["body"] = body
        result["user_id"] = user_id
        return result

    def build_reply_attributes(self, email_id, date_created, subject, body, user_id, reply_id):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = date_created
        result["subject"] = subject
        result["body"] = body
        result["user_id"] = user_id
        result["reply_id"] = reply_id
        return result

    def build_reply_attributes2(self, email_id, date_created, subject, body, user_id, original_id):
        result = {}
        result["email_id"] = email_id
        result["date_created"] = date_created
        result["subject"] = subject
        result["body"] = body
        result["user_id"] = user_id
        result["original_id"] = original_id
        return result

    def getAllEmails(self):
        dao = EmailDAO()
        user_list = dao.getAllEmails()
        result_list = []
        for row in user_list:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(Email=result_list)

    def updateEmail(self, email_id, form):
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
                if date_created and subject and body and user_id!=None and is_deleted!=None:
                    dao.update(email_id, date_created, subject, body, user_id, is_deleted)
                    result = self.build_email_attributes2(email_id, date_created, subject, body, user_id, is_deleted)
                    return jsonify(Email=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400

    def deleteEmail(self, email_id):
        dao = EmailDAO()
        if not dao.getEmailbyId(email_id):
            return jsonify(Error="Email not found"), 404
        else:
            dao.delete(email_id)
            return jsonify(DeleteStatus="OK"), 200

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

    def updateReply(self,reply_id,form):
        dao = EmailDAO()
        if not dao.getEmailbyId(reply_id):
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
                    dao.updatereply(reply_id, date_created, subject, body, user_id, is_deleted)
                    result = self.build_email_attributes2(reply_id, date_created, subject, body, user_id, is_deleted)
                    return jsonify(Email=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400

    def unsendReply(self,reply_id,original_id):
        dao = EmailDAO()
        if not dao.getreply(reply_id):
            return jsonify(Error="Email not found"), 404
        else:
            result = dao.unsendReply(reply_id,original_id)
            if result==None or len(result)!=2:
                return jsonify(Error="Reply not found"), 404
            else:
                return jsonify(DeleteStatus="OK"), 200

    def CreateReply(self, form):
        print(len(form))
        if len(form) != 5:
            return jsonify(Error="Malformed post request"), 400
        else:
            date_created = form["date_created"]
            subject = form["subject"]
            body = form["body"]
            user_id = form["user_id"]
            original_id = form["original_id"]
            if date_created and subject and body and user_id and original_id:
                dao = EmailDAO()
                email_id = dao.reply(date_created, subject, body, user_id, original_id)
                result = self.build_reply_attributes2(email_id[1], date_created, subject, body, user_id, original_id)
                return jsonify(Reply=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400

    def deleteemailfrominbox(self,user_id,email_id):
        dao = EmailDAO()
        if not dao.getEmailbyId(email_id):
            return jsonify(Error="Email not found"), 404
        else:
            dao.deleteemailfrominbox(user_id,email_id)
            return jsonify(DeleteStatus="OK"), 200
        pass

    def deleteemailfromoutbox(self,user_id,email_id):
        dao = EmailDAO()
        if not dao.getEmailFromUser(email_id,user_id):
            return jsonify(Error="Email not found"), 404
        else:
            dao.deleteemailfromoutbox(user_id, email_id)
            return jsonify(DeleteStatus="OK"), 200

    def getReply(self,reply_id):
        dao = EmailDAO()
        row = dao.getreply(reply_id)
        if not row:
            return jsonify(Error="Email Not Found"), 404
        else:
            email = self.build_get_email_attributes(reply_id, row)
            return jsonify(Email=email)

    def getEmailbyId(self, email_id):
        dao = EmailDAO()
        row = dao.getEmailbyId(email_id)
        if not row:
            return jsonify(Error="Email Not Found"), 404
        else:
            email = self.build_get_email_attributes(email_id, row)
            return jsonify(Email=email)

    def getInbox(self, ID):
        dao = EmailDAO()
        inbox = dao.getInbox(ID)
        result_list = []
        for row in inbox:
            result = self.build_inbox_dict(row)
            result_list.append(result)
        return jsonify(Inbox=result_list)

    def getInboxFilteredByEmail(self, ID,email_address):
        dao = EmailDAO()
        inbox = dao.getInboxFilteredByEmail(ID,email_address)
        result_list = []
        for row in inbox:
            result = self.build_inbox_dict(row)
            result_list.append(result)
        return jsonify(Inbox=result_list)

    def getFilteredInbox(self, ID, category):
        dao = EmailDAO()
        inbox = dao.getFilteredInbox(ID, category)
        result_list = []
        for row in inbox:
            result = self.build_inbox_dict(row)
            result_list.append(result)
        return jsonify(Inbox=result_list)

    def getEmailWithMostRecipientsbyUser(self, user_id):
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

    def getEmailWithMostRepliesbyUser(self, user_id):
        dao = EmailDAO()
        email = dao.getEmailWithMostRepliesbyUser(user_id)
        result_list = []
        for row in email:
            result = self.build_email_dict_nousr(row)
            result_list.append(result)
        if len(result_list) > 1:
            return jsonify(Email_With_Most_Replies_Tied=result_list)
        else:
            return jsonify(Email_With_Most_Replies=result_list)

    def getOutbox(self, ID):
        dao = EmailDAO()
        Outbox = dao.getOutbox(ID)
        result_list = []
        for row in Outbox:
            result = self.build_outbox_dict(row)
            result_list.append(result)
        return jsonify(Outbox=result_list)

    def getOutboxFilteredByEmail(self,user_id,email_address):
        dao = EmailDAO()
        Outbox = dao.getOutboxFilteredByEmail(user_id,email_address)
        result_list = []
        for row in Outbox:
            result = self.build_outbox_dict(row)
            result_list.append(result)
        return jsonify(Outbox=result_list)

    def getEmailFromUser(self, email_id, user_id):
        dao = EmailDAO()
        email_from_user = dao.getEmailFromUser(email_id, user_id)
        result_list = []
        for row in email_from_user:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(EmailFromUser=result_list)

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

    def sendEmail(self, form):
        dao = EmailDAO()
        if len(form) != 2:
            return jsonify(Error="Malformed post request"), 400
        email_id = form["email_id"]
        user_id = form["user_id"]
        if email_id and user_id:
            if dao.getEmailbyId(email_id):
                receive = dao.sendEmail(email_id, user_id)
                result = self.build_email_dict(receive)
                return jsonify(EmailFromUser=result)
            else:
                return jsonify(Error="Email not found or doesn't exist"), 404
        else:
            return jsonify(Error="Unexpected attributes in post request"), 400

    def unsendEmail(self, form):
        dao = EmailDAO()
        if len(form) != 2:
            return jsonify(Error="Malformed post request"), 400
        email_id = form["email_id"]
        user_id = form["user_id"]
        if email_id and user_id:
            if dao.getEmailbyId(email_id):
                receive = dao.unsendEmail(email_id,user_id)
                result = self.build_email_dict(receive)
                return jsonify(EmailFromUser=result)
            else:
                return jsonify(Error="Email not found or doesn't exist"), 404
        else:
            return jsonify(Error="Unexpected attributes in post request"), 400

    def updateReceives(self,form):
        dao = EmailDAO()
        userdao = UserDAO()
        if len(form) != 7:
            return jsonify(Error="Malformed update request"), 400
        user_id = form["user_id"]
        email_id = form["email_id"]
        new_user_id = form["new_user_id"]
        new_email_id = form["new_email_id"]
        is_viewed = form["is_viewed"]
        is_deleted = form["is_deleted"]
        category = form["category"]
        print(form)
        if user_id and email_id and  new_user_id and  new_email_id and is_viewed!=None and is_deleted!=None and category:
                if dao.getEmailbyId(new_email_id) and dao.getEmailbyId(email_id):
                    if userdao.getUserbyId(user_id) and userdao.getUserbyId(new_user_id):
                        receives = dao.updateReceive(user_id, email_id, new_user_id, new_email_id,is_viewed,is_deleted,category)
                        print(receives)
                        if receives==None :
                            return jsonify(Error="update error"), 404
                        else:
                            result = self.build_receives_dict2(new_user_id, new_email_id,is_viewed,is_deleted,category)
                            return jsonify(Receive=result), 200
                    else:
                        return jsonify(Error="user id does not exist"), 404
                else:
                    return jsonify(Error="email id does not exist"), 404

        else:
                return jsonify(Error="Unexpected attributes in update request"),400

    def getReceives(self,form):
        dao = EmailDAO()
        if len(form) != 2:
            return jsonify(Error="Malformed update request"), 400
        user_id = form["user_id"]
        email_id = form["email_id"]
        if user_id and email_id:
            receive = dao.getReceive(user_id, email_id)
            result = self.build_receives_dict(receive)
            return jsonify(EmailFromUser=result)
        else:
            return jsonify(Error="Unexpected attributes in update request"), 400

    def ReadEmailFromUser(self,form):
        dao = EmailDAO()
        if len(form) != 2:
            return jsonify(Error="Malformed update request"), 400
        user_id = form["user_id"]
        email_id = form["email_id"]
        if user_id and email_id:
            receive = dao.ReadEmailFromUser(user_id, email_id)
            result = self.build_email_dict(receive)
            return jsonify(EmailRead=result)
        else:
            return jsonify(Error="Unexpected attributes in request"), 400

    def readEmail(self, email_ID):
        cursor = self.conn.cursor()
        query = "update receives set is_received = %s where email_ID = %s;"
        cursor.execute(query, (email_ID,))
        self.conn.commit()
        return email_ID
