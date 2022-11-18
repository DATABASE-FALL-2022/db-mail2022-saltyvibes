from flask import jsonify
from dao.reply import ReplyDAO
from handler.email import EmailHandler


class ReplyHandler:
    def build_reply_dict(self, row):
        result = {}
        result['original_id'] = row[0]
        result['reply_id'] = row[1]
        return result

    def getAllReply(self,email_id):
        dao = ReplyDAO()
        reply_list = dao.getAllReply(email_id)
        result_list = []
        for row in reply_list:
            email = EmailHandler.getEmail()
            result_list.append(email)
         result = []
        for i in reply_list:


        # for row in reply_list:
        #     result = self.build_user_dict(row)
        #     result_list.append(result)
        return jsonify(Users=result_list)

    def isReply(self,email_id):

