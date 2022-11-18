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

    def getEmailWithMostRecipients(self):
        cursor = self.conn.cursor()
        query = "with most_recipients as (select R.email_id from receives as R group by R.email_id having count(email_id) =(select count(email_id) as count from receives group by email_id order by count desc limit 1 )) select E.email_id,E.date_created,E.subject,E.body from \"Email\" as E,most_recipients as mr where E.email_id = mr.email_id;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getEmailWithMostReplies(self):
        cursor = self.conn.cursor()
        query = "with most_replies as (select R.original_id from reply as R group by R.original_id having count(R.original_id) = (select count(original_id) as count from reply group by original_id order by count desc limit 1)) select E.email_id,E.date_created,E.subject,E.body from \"Email\" as E,most_replies as mr where E.email_id = mr.original_id;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
