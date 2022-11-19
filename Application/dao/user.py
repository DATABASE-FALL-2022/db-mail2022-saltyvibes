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
        query = "with Top10Users as (select user_id,count(email_id) as count from receives group by user_id order by count(email_id) desc limit 10) SELECT user_id,name,email_address,password,is_premium,phone,date_of_birth from \"User\" natural inner join Top10Users order by count desc,name desc;"
        cursor.execute(query)
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
    def getUserbyId(self,user_id):
        cursor = self.conn.cursor()
        query = 'SELECT "name", email_address, "password", is_premium, phone,date_of_birth FROM "User" where user_id = %s'
        cursor.execute(query,(user_id,))
        result = cursor.fetchone()
        return result

    def getTop10UsersOutbox(self):
        cursor = self.conn.cursor()
        query = "with Top10Users as (select user_id,count(email_id) as count from \"Email\" group by user_id order by count(email_id) desc limit 10) SELECT user_id,name,email_address,password,is_premium,phone,date_of_birth,count from \"User\" natural inner join Top10Users order by count desc,name;"
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
        query = "insert into Friends(owner_id, friend_id) values (%s, %s) returning owner_id and friend_id;"
        cursor.execute(query, (owner_id, friend_id,))
        owner_id = cursor.fetchone()[0]
        self.conn.commit()
        return owner_id

    def removeFriend(self, owner_id, friend_id):
        cursor = self.conn.cursor()
        query = "delete from Friends where owner_id = %s and friend_id = %s " \
                                    "or friend_id = %s and owner_id = %s " \
                                    "returning owner_id;"
        cursor.execute(query, (owner_id, friend_id,))
        self.conn.commit()
        return owner_id