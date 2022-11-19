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
    def build_user_attributes(self,user_id,name,email_address,password,is_premium,phone,date_of_birth):

        result = {}
        result['user_id'] = user_id
        result['name'] = name
        result['email_address'] = email_address
        result['password'] = password
        result['is_premium'] = is_premium
        result['phone'] = phone
        result['date_of_birth'] = date_of_birth
        return result
    def getAllUsers(self):
        dao = UserDAO()
        user_list = dao.getAllUsers()
        result_list = []
        for row in user_list:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(Users=result_list)

    def InsertUser(self,form):
        if len(form) != 4:
            return jsonify(Error="Malformed post request"), 400
        else:
            name = form['name']
            email_address = form['email_address']
            password = form['password']
            is_premium = form['is_premium']
            phone = form['phone']
            date_of_birth = form['date_of_birth']
            if name and email_address and password and is_premium and phone and date_of_birth:
                dao = UserDAO()
                user_id = dao.insert(name,email_address,password,is_premium,phone,date_of_birth)
                result = self.build_user_attributes(user_id,name,email_address,password,is_premium,phone,date_of_birth)
                return jsonify(User= result),201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400
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


