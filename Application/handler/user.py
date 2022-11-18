from flask import jsonify
from dao.user import UserDAO


class UserHandler:
    def build_user_dict(self, row):
        result = {}
        result['user_id'] = row[0]
        result['name'] = row[1]
        result['email_address'] = row[2]
        result['password'] = row[3]
        result['is_premium'] = row[4]
        result['phone'] = row[5]
        result['date_of_birth'] = row[6]
        return result

    def getAllUsers(self):
        dao = UserDAO()
        user_list = dao.getAllUsers()
        result_list = []
        for row in user_list:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(Users=result_list)


    def getTop10UsersInbox(self):
        dao = UserDAO()
        Users = dao.getTop10UsersInbox()
        result_list = []
        for row in Users:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(Top_10_Users_With_More_Emails_In_Inbox=result_list)

    def getTop10UsersOutbox(self):
        dao = UserDAO()
        Users = dao.getTop10UsersOutbox()
        result_list = []
        for row in Users:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(Top_10_Users_With_More_Emails_In_Outbox=result_list)


