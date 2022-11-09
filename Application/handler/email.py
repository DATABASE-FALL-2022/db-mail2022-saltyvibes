from flask import jsonify
from dao.email import EmailDAO


class EmailHandler:
    def build_email_dict(self, row):
        result = {}
        result['email_ID'] = row[0]
        result['user_id'] = row[1]
        result['body'] = row[2]
        result['subject'] = row[3]
        result['date_created'] = row[4]
        return result


    def getAllEmails(self):
        dao = EmailDAO()
        email_list = dao.getAllEmails()
        result_list = []
        for row in email_list:
            result = self.build_part_dict(row)
            result_list.append(result)
        return jsonify(Emails=result_list)

    def getInbox(self,ID):
        dao = EmailDAO()
        inbox = dao.getInbox(ID)
        result_list = []
        for row in inbox:
            result = self.build_part_dict(row)
            result_list.append(result)
        return jsonify(Emails=result_list)

    def getOutbox(self,ID):
        dao = EmailDAO()
        Outbox = dao.getOutbox(ID)
        result_list = []
        for row in Outbox:
            result = self.build_email_dict(row)
            result_list.append(result)
        return jsonify(Emails=result_list)



