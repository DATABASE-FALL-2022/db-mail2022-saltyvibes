from config.dbconfig import pg_config
import psycopg2
class ReplyDAO:
    def __init__(self):
        connection_url = "host=%s dbname=%s user=%s password=%s" % (pg_config['host'],pg_config['dbname'],pg_config['user'],pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def getAllReply(self,email_id):

        cursor = self.conn.cursor()
        query = "select reply_id from reply where original_id = %s;"
        cursor.execute(query,(email_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def isReply(self,email_id):
        cursor = self.conn.cursor()
        query = "select count(original_id) from reply where reply_id = %s;"
        cursor.execute(query, (email_id,))
        result = []
        for row in cursor:
            result.append(row)
        if result[0]>1:
            print("it is a reply")
        else:
            print("it is not a reply")
        return result