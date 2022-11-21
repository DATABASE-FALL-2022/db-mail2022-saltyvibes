from config.dbconfig import pg_config
import psycopg2
class UserDAO:
    def __init__(self):
        connection_url = "host=%s dbname=%s user=%s password=%s" % (pg_config['host'],pg_config['dbname'],pg_config['user'],pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def getAllUsers(self):
        cursor = self.conn.cursor()
        query = 'Select * from "User"'
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getTop10UsersInbox(self):
        cursor = self.conn.cursor()
        query = "with Top10Users as ( select user_id, count(user_id) as count from receives group by user_id order by count(user_id) desc limit 10 ) SELECT user_id, name, email_address, password, is_premium, phone, date_of_birth from \"User\" natural inner join Top10Users order by count desc, name desc;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    def TopFiveUserSentEmails(self,user_id):
        cursor = self.conn.cursor()
        query = 'WITH EMAILS AS ( SELECT email_id FROM "Email" where user_id = %s), TOPFIVEUSERS AS ( SELECT r.user_id, COUNT(email_id) as count_email FROM EMAILS e natural inner join receives r WHERE e.email_id = r.email_id group by r.user_id ORDER BY count_email DESC LIMIT 5 ) SELECT * FROM "User" u natural inner join TOPFIVEUSERS TFU WHERE U.user_id = TFU.user_id'
        cursor.execute(query,(user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result
    def TopFiveUsersReceivedEmails(self,user_id):
        cursor = self.conn.cursor()
        query = 'WITH EMAILS AS ( SELECT email_id FROM receives where user_id = 43 ), TOPFIVEUSERS AS ( SELECT em.user_id, COUNT(email_id) as count_email FROM EMAILS e natural inner join "Email" em WHERE e.email_id = em.email_id group by em.user_id ORDER BY count_email DESC LIMIT 5 ) SELECT * FROM "User" u natural inner join TOPFIVEUSERS TFU WHERE U.user_id = TFU.user_id'
        cursor.execute(query, (user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result
    def insert(self,name,email_address,password,is_premium,phone,date_of_birth):
        cursor = self.conn.cursor()
        query = 'insert into "User"("name", email_address, "password", is_premium, phone, date_of_birth) values (%s,%s,%s,%s,%s,%s) returning user_id;'
        cursor.execute(query, (name,email_address,password,is_premium,phone,date_of_birth,))
        user_id = cursor.fetchone()[0]
        self.conn.commit()
        return user_id
    def update(self,user_id,name,email_address,password,is_premium,phone,date_of_birth):
        cursor = self.conn.cursor()
        query = 'UPDATE "User" SET "name" = %s, email_address = %s, "password" = %s, is_premium = %s, phone = %s, date_of_birth = %s WHERE user_id = %s'
        cursor.execute(query,(name,email_address,password,is_premium,phone,date_of_birth,user_id))
        self.conn.commit()
        return user_id
    def delete(self,user_id):
        cursor = self.conn.cursor()
        query = 'DELETE from "User" where user_id = %s'
        cursor.execute(query, (user_id,))
        self.conn.commit()
        return user_id
    def getUserbyId(self,user_id):
        cursor = self.conn.cursor()
        query = 'SELECT "name", email_address, "password", is_premium, phone,date_of_birth FROM "User" where user_id = %s'
        cursor.execute(query,(user_id,))
        result = cursor.fetchone()
        return result

    def getFriend(self,owner_id,friend_id):
        cursor = self.conn.cursor()
        query = 'with arefriends as ( select distinct owner_id, friend_id from "Friends" where owner_id = %s and friend_id = %s ) select user_id, "name", email_address, "password", is_premium, phone, date_of_birth from "User" as U, arefriends as F where u.user_id = F.owner_id or user_id = F.friend_id;'
        cursor.execute(query,(owner_id,friend_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getTop10UsersOutbox(self):
        cursor = self.conn.cursor()
        query = "with Top10Users as ( select user_id, count(user_id) as count from receives group by user_id order by count(user_id) desc limit 10 ) SELECT user_id, name, email_address, password, is_premium, phone, date_of_birth from \"User\" natural inner join Top10Users order by count desc, name desc;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getUserInfoByEmail(self, email_address):
        cursor = self.conn.cursor()
        query = "Select * from User where email_address = %s;"
        cursor.execute(query, (email_address,))
        result = cursor.fetchone()
        return result

    def addFriend(self, owner_id, friend_id):
        cursor = self.conn.cursor()
        query = "insert into \"Friends\"(owner_id, friend_id) values (%s, %s) returning owner_id,friend_id;"
        cursor.execute(query, (owner_id, friend_id,))
        owner_id = cursor.fetchone()[0]
        self.conn.commit()
        return owner_id

    def removeFriend(self, owner_id, friend_id):
        cursor = self.conn.cursor()
        query = 'delete from "Friends" where owner_id = %s and friend_id = %s returning owner_id, friend_id'
        cursor.execute(query, (owner_id, friend_id,))
        self.conn.commit()
        result = cursor.fetchone()
        print(result)
        return result



    def updateFriend(self,owner_id,friend_id,new_owner_id,new_friend_id):
        cursor = self.conn.cursor()
        query = 'UPDATE "Friends" SET "owner_id" = %s, friend_id = %s WHERE owner_id = %s and friend_id = %s re'
        cursor.execute(query,(new_owner_id,new_friend_id,owner_id,friend_id))
        self.conn.commit()

        return new_owner_id,new_friend_id

    def updatePassword(self, user_id, password):
        cursor = self.conn.cursor()
        query = "update User set password = %s where user_id = %s;"
        cursor.execute(query, (user_id, password,))
        result = cursor.fetchone()
        return result

    def updatePremium(self, is_premium, user_id):
        cursor = self.conn.cursor()
        query = "update User set is_premium = 1 where user_id = %s;"
        cursor.execute(query, (is_premium, user_id,))
        result = cursor.fetchone()
        return result
