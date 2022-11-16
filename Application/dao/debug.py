from config.dbconfig import pg_config
import psycopg2
import random
class DebugDAO:
    def __init__(self):
        connection_url = "host=%s dbname=%s user=%s password=%s" % (pg_config['host'],pg_config['dbname'],pg_config['user'],pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)
    def dob_random(self):
        month = random.randint(1,13)
        day = random.randint(1,32)
        year = random.randint(0,99)
        if month < 10:
            month = '0' + str(month)
        if day < 10:
            day = '0' + str(day)
        if year < 10:
            year = '0' + str(year)
        return str(month) + str(day) + str(year)
    def fill(self):
        cursor = self.conn.cursor()
        names= ['Fred','Jon','Tir','Lon','Ron']
        dummy = []
        for i in names:
            # query = 'INSERT INTO "User"("name", email_address, "password", is_premium,phone,date_of_birth) VALUES(%s,%s,%s,%s,%s);'
            # print(query)
            name = i
            email_address = i+"@email.com"
            password = i+str(random.randint(1,400))
            is_premium = random.choice(['0','1'])
            phone = str(random.randint(7000000000,9000000000))
            date_of_birth = self.dob_random()
            user_id = self.insert(name,email_address,password,is_premium,phone,date_of_birth)
            print(user_id)
            # temp = i,i+"@email.com",i+"1234",random.choice(['0','1']),'0000000000',self.dob_random()
            # cursor.execute(query,temp)
            # self.conn.commit()
            dummy.append(self.build_user_attributes(user_id, name, email_address, password, is_premium,phone,date_of_birth))
        return dummy
            # cursor.execute(query)
            # curso

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

    def insert(self, name, email_address, password, is_premium,phone,date_of_birth):
        cursor = self.conn.cursor()
        query = "insert into \"User\"(\"name\", email_address, \"password\", is_premium,phone,date_of_birth) values (%s, %s, %s, %s,%s,%s) returning user_id;"
        cursor.execute(query, [name, email_address, password, is_premium,phone,date_of_birth])
        pid = cursor.fetchone()[0]
        self.conn.commit()
        return pid


