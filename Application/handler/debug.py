from flask import jsonify
from dao.debug import DebugDAO


class DebugHandler:
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

    def build_user_attributes(self,user_id, name, email_address, password, is_premium,phone,date_of_birth):
        result = {}
        result['user_id'] = user_id
        result['name'] = name
        result['email_address'] = email_address
        result['password'] = password
        result['is_premium'] = is_premium
        result['phone'] = phone
        result['date_of_birth'] = date_of_birth
        return result

    def fill(self):
          dao = DebugDAO()
          array = dao.fill()
          return jsonify(array), 201


