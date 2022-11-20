from config.dbconfig import pg_config
import psycopg2
class EmailDAO:
    def __init__(self):
        connection_url = "host=%s dbname=%s user=%s password=%s" % (pg_config['host'],pg_config['dbname'],pg_config['user'],pg_config['passwd'])
        self.conn = psycopg2._connect(connection_url)

    def getAllEmails(self):
        cursor = self.conn.cursor()
        query = 'Select * from "Email"'
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getEmailbyId(self,email_id):
        cursor = self.conn.cursor()
        query = 'SELECT date_created, subject, body, user_id, is_deleted FROM "Email" WHERE email_id = %s'
        cursor.execute(query,(email_id,))
        result = cursor.fetchone()
        return result

    def update(self,email_id,date_created,subject,body,user_id,is_deleted):
        cursor = self.conn.cursor()
        query = 'UPDATE "Email" SET date_created = %s, subject = %s, body = %s, is_deleted = %s, user_id = %s WHERE email_id = %s'
        cursor.execute(query,(date_created,subject,body,is_deleted,user_id,email_id,))
        self.conn.commit()
        return email_id

    def delete(self,email_id):
        cursor = self.conn.cursor()
        query = 'DELETE from "Email" where email_id = %s'
        cursor.execute(query,(email_id,))
        self.conn.commit()
        return email_id

    def insert(self,date_created,subject,body,user_id,is_deleted):
        cursor = self.conn.cursor()
        query = 'INSERT INTO "Email"(DATE_CREATED, SUBJECT, BODY, USER_ID) VALUES (%s,%s,%s,%s,%s) returning email_id;'
        cursor.execute(query, (date_created, subject, body, user_id,is_deleted,))
        email_id = cursor.fetchone()[0]
        self.conn.commit()
        return email_id

    def getInbox(self,ID):
        cursor = self.conn.cursor()
        query =  'with inbox as ( select E.user_id, E.email_id, E.date_created, E.subject, E.body, R.category from ( receives as R join "Email" as E on E.email_id = R.email_id ) where R.user_id = %s and R.is_deleted != 1 ), replyIDs as ( select distinct reply_id from reply ) select user_id, email_id, date_created, subject, body, category, Rep.reply_id from inbox as I left outer join replyIDs as Rep on email_id = Rep.reply_id;'
        cursor.execute(query,(ID,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getEmailWithMostRecipientsbyUser(self,user_id):
        cursor = self.conn.cursor()
        query = 'WITH EMAILS AS ( SELECT email_id FROM "Email" where user_id = %s ), Recipients_Count AS ( SELECT email_id FROM EMAILS e natural inner join receives r WHERE e.email_id = r.email_id group by email_id having count(email_id) =( SELECT count(email_id) as count FROM EMAILS e natural inner join receives r WHERE e.email_id = r.email_id group by email_id order by count desc limit 1 ) ) SELECT * FROM "Email" e natural inner join Recipients_Count rc WHERE e.email_id = rc.email_id'
        cursor.execute(query,(user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getOutbox(self,ID):
        cursor = self.conn.cursor()
        query = 'with outbox as ( select user_id, email_id, date_created, subject, body from "Email" where user_id = %s and is_deleted != 1 ), replyIDs as ( select distinct reply_id from reply ) select user_id, email_id, date_created, subject, body, Rep.reply_id from Outbox as O left outer join replyIDs as Rep on email_id = Rep.reply_id;'
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

    def sendEmail(self, category, user_id, email_ID):
        cursor = self.conn.cursor()
        query = "insert into receives(is_viewed, is_deleted, category, user_id, email_ID) values (0, 0, %s, %s, %s) returning email_ID;"
        cursor.execute(query, (category, user_id, email_ID,))
        email_ID = cursor.fetchone()[0]
        self.conn.commit()
        return email_ID

    def readEmail(self, is_viewed, email_ID):
        cursor = self.conn.cursor()
        query = "update receives set is_viewed = 1 where email_ID = %s returning email_ID;"
        cursor.execute(query, (is_viewed, email_ID,))
        self.conn.commit()
        return email_ID