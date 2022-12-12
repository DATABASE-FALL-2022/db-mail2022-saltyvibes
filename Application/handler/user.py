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
        return jsonify(User=result_list)

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

    def build_friend_attributes2(self, owner_id, friend_id):
        result = {}
        result['owner_id'] = owner_id
        result['friend_id'] = friend_id
        return result

    def build_friend_attributes(self, row):
        result = {}
        result['owner_id'] = row[0]
        result['friend_id'] = row[1]
        return result

    def getUserbyId(self,user_id):
        dao = UserDAO()
        row = dao.getUserbyId(user_id)
        if not row:
            print(user_id)
            return jsonify(User="User Not Found"), 404
        else:
            email = self.build_get_userid_attributes(user_id, row)
            return jsonify(User=email)

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
                if name and email_address and password and is_premium!=None and phone and date_of_birth:
                    dao.update(user_id,name,email_address,password,is_premium,phone,date_of_birth)
                    result = self.build_user_attributes(user_id,name,email_address,password,is_premium,phone,date_of_birth)
                    return jsonify(User=result), 200
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
        if len(form) != 6:
            return jsonify(Error="Malformed post request"), 400
        else:
            name = form['name']
            email_address = form['email_address']
            password = form['password']
            is_premium = form['is_premium']
            phone = form['phone']
            date_of_birth = form['date_of_birth']
            if name and email_address and password and is_premium!=None and phone and date_of_birth:
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
        return jsonify(User=result_list)

    def getTop10UsersOutbox(self):
        dao = UserDAO()
        Users = dao.getTop10UsersOutbox()
        result_list = []
        for row in Users:
            result = self.build_user_dict(row)
            result_list.append(result)
        return jsonify(User=result_list)

    def getUserInfoByEmail(self, email_address):
        dao = UserDAO()
        Users = dao.getUserInfoByEmail(email_address)
        if not Users:
            return jsonify(Error = "User Not Found"), 404
        else:
            result = self.build_user_dict(Users)
            return jsonify(User=result)

    def addFriend(self, form):
        if len(form) != 2:
            print(form)
            return jsonify(Error="Malformed post request"), 400
        else:
            owner_id = form['owner_id']
            friend_id = form['friend_id']
            if owner_id and friend_id:
                dao = UserDAO()
                owner_id = dao.addFriend(owner_id, friend_id)
                result = self.build_friend_attributes2(owner_id, friend_id)
                return jsonify(Friend=result), 201
            else:
                print(form)
                return jsonify(Error="Unexpected attributes in post request"), 400

    def updateFriend(self,form):
        dao = UserDAO()
        if len(form) != 4:
            return jsonify(Error="Malformed update request"), 400
        owner_id = form["owner_id"]
        friend_id = form["friend_id"]
        new_owner_id = form["new_owner_id"]
        new_friend_id = form["new_friend_id"]
        if owner_id and friend_id and  new_friend_id and  new_owner_id:

            if dao.getFriend(owner_id,friend_id) :
                if  dao.getUserbyId(new_owner_id) and dao.getUserbyId(new_friend_id):
                    new_Friend = dao.updateFriend(owner_id,friend_id,new_owner_id,new_friend_id)
                    result = self.build_friend_attributes(new_Friend)
                    return jsonify(Friend=result), 200
                else:
                    return jsonify(Error="one of the new users does not exist"), 404
            else:
                return jsonify(Error="Friend not found or does not exist"), 404
        else:
                    return jsonify(Error="Unexpected attributes in update request"),400

    def TopFiveUsersSentEmails(self,user_id):
        dao = UserDAO()
        if not dao.getUserbyId(user_id):
            return jsonify(Error="User not found"),404
        else:
            user_list = dao.TopFiveUserSentEmails(user_id)
            result_list = []
            for row in user_list:
                result = self.build_user_dict(row)
                result_list.append(result)
            return jsonify(User=result_list)

    def TopFiveUsersReceivedEmails(self,user_id):
        dao = UserDAO()
        if not dao.getUserbyId(user_id):
            return jsonify(Error="User not found"),404
        else:
            user_list = dao.TopFiveUsersReceivedEmails(user_id)
            result_list = []
            for row in user_list:
                result = self.build_user_dict(row)
                result_list.append(result)
            return jsonify(User=result_list)

    def getFriend(self, form):
        dao = UserDAO()
        if len(form) != 2:
            return jsonify(Error="Malformed update request"), 400
        else:
            owner_id = form["owner_id"]
            friend_id = form["friend_id"]
            Friends = dao.getFriend(owner_id,friend_id)
        if not Friends:
            return jsonify(Error="Friend Not Found"), 404
        else:
            result_list = []
            print(Friends)
            for row in Friends:
                result = self.build_user_dict(row)
                result_list.append(result)
            return jsonify(Friend=result_list)

    def getAllFriends(self,User_id):
        dao = UserDAO()
        if not dao.getUserbyId(User_id):
            return jsonify(Error="Malformed update request"), 400
        else:
            Friends = dao.getAllFriends(User_id)
        if not Friends:
            return jsonify(Error="Friend Not Found"), 404
        else:
            result_list = []
            print(Friends)
            for row in Friends:
                result = self.build_user_dict(row)
                result_list.append(result)
            return jsonify(Friend=result_list)









    def getSpecificFriend(self, owner_id,friend_id):
            dao = UserDAO()
            if not(owner_id or friend_id):
                return jsonify(Error="Malformed update request"), 400
            else:
                Friends = dao.getFriend(owner_id, friend_id)
            if not Friends:
                return jsonify(Error="Friend Not Found"), 404
            else:
                result_list = []
                print(Friends)
                for row in Friends:
                    result = self.build_user_dict(row)
                    result_list.append(result)
                return jsonify(Friend=result_list)

    def removeFriend(self, owner_id,friend_id):
        dao = UserDAO()
        if owner_id and friend_id:
                if not dao.getFriend(owner_id, friend_id):
                    return jsonify(Error = "Friendship not found."), 404
                else:
                    Friend =dao.removeFriend(owner_id, friend_id)
                    print(Friend)
                    result = self.build_friend_attributes(Friend)
                    return jsonify(Friend=result), 200
        else:
            return jsonify(Error="Unexpected attributes in delete request"),400

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