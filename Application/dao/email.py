from config.dbconfig import pg_config
import psycopg2
class EmailDAO:
    def __init__(self):
        connection_url = "host=%s dbname=%s user=%s password=%s" % (pg_config['host'],pg_config['dbname'],pg_config['user'],pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)



    def getInbox(self,ID):
        cursor = self.conn.cursor()
        query =  "select E.user_id,E.email_id,E.date_created,E.subject,E.body from receives as R,\"Email\" as E where E.email_id = R.email_id and R.user_id = %s;"
        cursor.execute(query,(ID,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getOutbox(self,ID):
        cursor = self.conn.cursor()
        query = "select user_id,email_id,date_created,subject,body from \"Email\" where user_id = %s;"
        cursor.execute(query,(ID,))
        result = []
        for row in cursor:
            result.append(row)
        return result

