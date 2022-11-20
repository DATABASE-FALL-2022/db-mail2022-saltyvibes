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
    def build_get_userid_attributes(self,user_id,row):
        result = {}
        result['user_id'] = user_id
        result['name'] = row[0]
        result['email_address'] = row[1]
        result['password'] = row[2]
        result['is_premium'] = row[3]
        result['phone'] = row[4]
        result['date_of_birth'] = row[5]
        return result

    def build_user_password_attributes(self, user_id, password):
        result = {}
        result['user_id'] = user_id
        result['password'] = password
        return result

    def build_user_premium_attributes(self, user_id, is_premium):
        result = {}
        result['user_id'] = user_id
        result['is_premium'] = is_premium
        return result

    def build_friend_attributes(self, owner_id, friend_id):
        result = {}
        result['owner_id'] = owner_id
        result['friend_id'] = friend_id
        return result

    def getUserbyId(self,user_id):
        dao = UserDAO()
        row = dao.getUserbyId(user_id)
        if not row:
            return jsonify(Error="Email Not Found"), 404
        else:
            email = self.build_get_userid_attributes(user_id, row)
            return jsonify(Email=email)

    def updateUser(self,user_id,form):
        dao = UserDAO()
        if not dao.getUserbyId(user_id):
            return jsonify(Error = "User not found"), 404
        else:
            if len(form) != 6:
                return jsonify(Error = "Malformed update request"),400
            else:
                name = form["name"]
                email_address = form["email_address"]
                password = form["password"]
                is_premium = form["is_premium"]
                phone = form["phone"]
                date_of_birth = form["date_of_birth"]
                if name and email_address and password and is_premium and phone and date_of_birth:
                    dao.update(user_id,name,email_address,password,is_premium,phone,date_of_birth)
                    result = self.build_user_attributes(user_id,name,email_address,password,is_premium,phone,date_of_birth)
                    return jsonify(Email=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"),400

    def deleteUser(self,user_id):
        dao = UserDAO()
        if not dao.getUserbyId(user_id):
            return jsonify(Error="User not found")
        else:
            dao.delete(user_id)
            return jsonify(DeleteStatus="OK"),200
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

    def getUserInfoByEmail(self, email_address):
        dao = UserDAO()
        Users = dao.getUserInfoByEmail()
        if not Users:
            return jsonify(Error = "User Not Found"), 404
        else:
            result = self.build_user_dict(Users)
            return jsonify(Get_User_Information_Using_Email_Address=result)

    def addFriend(self, form):
        if len(form) != 4:
            return jsonify(Error="Malformed post request"), 400
        else:
            owner_id = form['owner_id']
            friend_id = form['friend_id']
            if owner_id and friend_id:
                dao = UserDAO()
                owner_id = dao.insert(owner_id, friend_id)
                result = self.build_friend_attributes(owner_id, friend_id)
                return jsonify(User=result), 201
            else:
                return jsonify(Error="Unexpected attributes in post request"), 400

    def removeFriend(self, owner_id, friend_id):
        dao = UserDAO()
        if not dao.getUserByID(owner_id) and dao.getUserByID(friend_id):
            return jsonify(Error = "Friendship not found."), 404
        else:
            dao.delete(friend_id)
            dao.delete(owner_id)
            return jsonify(DeleteStatus = "Deleted Friendship"), 200

    def updatePassword(self, user_id, form):
        dao = UserDAO()
        if not dao.getPartById(user_id):
            return jsonify(Error = "User not found."), 404
        else:
            if len(form) != 4:
                return jsonify(Error="Malformed update request"), 400
            else:
                password = form['password']
                if password:
                    dao.update(user_id, password)
                    result = self.build_user_password_attributes(user_id, password)
                    return jsonify(Email=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400

    def updatePremium(self, user_id, form):
        dao = UserDAO()
        if not dao.getPartById(user_id):
            return jsonify(Error = "User not found."), 404
        else:
            if len(form) != 4:
                return jsonify(Error="Malformed update request"), 400
            else:
                is_premium = form['is_premium']
                if is_premium:
                    dao.update(user_id, is_premium)
                    result = self.build_user_premium_attributes(user_id, is_premium)
                    return jsonify(Email=result), 200
                else:
                    return jsonify(Error="Unexpected attributes in update request"), 400