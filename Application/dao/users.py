from config.dbconfig import pg_config
import psycopg2
class UsersDAO:
    def __init__(self):
        connection_url = "host=%s dbname=%s user=%s password=%s" % (pg_config['host'],pg_config['dbname'],pg_config['user'],pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def getAllUsers(self):
        cursor = self.conn.cursor()
        query = "Select * from users;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

