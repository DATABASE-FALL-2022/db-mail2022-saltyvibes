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




    def getInbox(self,ID):
        dao = EmailDAO()
        inbox = dao.getInbox(ID)
        result_list = []
        for row in inbox:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(Inbox=result_list)

    def getOutbox(self,ID):
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
        if len(result_list)>1:
            return jsonify(Email_With_Most_Replies_Tied=result_list)
        else:
            return jsonify(Email_With_Most_Replies=result_list)




