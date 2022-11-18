from flask import jsonify
from dao.email import EmailDAO
from dao.users import UsersDAO


class UserHandler:
    def build_user_dict(self, row):
        result = {}
        result['uid'] = row[0]
        result['fullname'] = row[1]
        result['email_address'] = row[2]
        result['passwrd'] = row[3]
        result['is_premium'] = row[4]
        result['phone'] = row[5]
        result['date'] = row[6]
        return result

    def getAllUsers(self):
        dao = UsersDAO()
        user_list = dao.getAllUsers()
        result_list = []
        for row in user_list:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(Users=result_list)




