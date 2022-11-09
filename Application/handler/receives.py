from flask import jsonify
from dao.email import EmailDAO


class ReceiveHandler:
    def build_receive_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['email_ID'] = row[1]
        result['is_viewed'] = row[2]
        result['is_deleted'] = row[3]
        result['category'] = row[4]
        return result


    def getAllEmails(self):
        dao = EmailDAO()
        email_list = dao.getAllEmails()
        result_list = []
        for row in email_list:
            result = self.build_receive_dict(row)
            result_list.append(result)
        return jsonify(Emails=result_list)


