from config.dbconfig import pg_config
import psycopg2
class EmailDAO:
    def __init__(self):
        connection_url = "host=%s dbname=%s user=%s password=%s" % (pg_config['host'],pg_config['dbname'],pg_config['user'],pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def getAllEmails(self):
        cursor = self.conn.cursor()
        query = "select * from email;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getInbox(self,ID):
        cursor = self.conn.cursor()
        query = "select * from receives where uid = %s;"
        cursor.execute(query,(ID,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getOutbox(self,ID):
        cursor = self.conn.cursor()
        query = "select * from email where uid = %s;"
        cursor.execute(query,(ID,))
        result = []
        for row in cursor:
            result.append(row)
        return result

