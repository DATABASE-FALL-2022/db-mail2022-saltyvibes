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

    def insert(self,date_created,subject,body,user_id, is_deleted):
        cursor = self.conn.cursor()
        query = 'INSERT INTO "Email"(DATE_CREATED, SUBJECT, BODY, USER_ID, IS_DELETED) VALUES (%s, %s,%s,%s,%s) returning email_id;'
        cursor.execute(query, (date_created, subject, body, user_id, is_deleted,))
        email_id = cursor.fetchone()[0]
        self.conn.commit()
        return email_id

    def update(self, email_id, date_created, subject, body, user_id, is_deleted):
        cursor = self.conn.cursor()
        query = 'UPDATE "Email" SET date_created = %s, subject = %s, body = %s, is_deleted = %s, user_id = %s WHERE email_id = %s'
        cursor.execute(query, (date_created, subject, body, is_deleted, user_id, email_id,))
        self.conn.commit()
        return email_id
    def updatereply(self,reply_id,date_created, subject, body, user_id, is_deleted):
        cursor = self.conn.cursor()
        query = 'UPDATE "Email" SET date_created = %s, subject = %s, body = %s, is_deleted = %s, user_id = %s WHERE email_id = %s'
        cursor.execute(query, (date_created, subject, body, is_deleted, user_id, reply_id,))
        self.conn.commit()
        return reply_id
    def getreply(self,reply_id):
        cursor = self.conn.cursor()
        query = 'SELECT date_created, subject, body, user_id, is_deleted FROM "Email" WHERE email_id = %s'
        cursor.execute(query, (reply_id,))
        result = cursor.fetchone()
        return result
    def deleteemailfrominbox(self,user_id,email_id):
        cursor = self.conn.cursor()
        query = 'UPDATE receives SET is_deleted = 1 where is_deleted != 1 and user_id = %s and email_id = %s'
        cursor.execute(query,(user_id,email_id,))
        self.conn.commit()
        return (user_id,email_id)
    def deleteemailfromoutbox(self,user_id,email_id):
        cursor = self.conn.cursor()
        query = 'UPDATE "Email" SET is_deleted = 1 where is_deleted != 1 and user_id = %s and email_id = %s'
        cursor.execute(query, (user_id, email_id,))
        self.conn.commit()
        return (user_id, email_id)
    def unsendReply(self,reply_id,original_id):
        cursor = self.conn.cursor()
        query = 'DELETE FROM reply where original_id = %s and reply_id = %s'
        cursor.execute(query, (original_id,reply_id,))
        self.conn.commit()
        return reply_id
    def delete(self, email_id):
        cursor = self.conn.cursor()
        query = 'DELETE from "Email" where email_id = %s'
        cursor.execute(query, (email_id,))
        self.conn.commit()
        return email_id
    def reply(self, date_created, subject, body, user_id, reply_id):
        cursor = self.conn.cursor()
        query = 'with email as ( INSERT INTO "Email"(DATE_CREATED, SUBJECT, BODY, USER_ID) VALUES (%s, %s, %s, %s) returning "Email".email_id, %s as rid ), rep as ( INSERT INTO reply (original_id, reply_id) Select email_id, rid from email ) Select email_id from email;'
        cursor.execute(query, (date_created, subject, body, user_id,reply_id,))
        result =[]
        for row in cursor:
            result.append(row)
        if len(result)!=1:
            raise Exception("Couldn't execute Query")
        print(result)
        self.conn.commit()
        email_id = result[0]
        return result

    def getInbox(self,ID):
        cursor = self.conn.cursor()
        query = 'with inbox as ( select E.user_id, E.email_id, E.date_created, E.subject, E.body, R.category from ( receives as R join "Email" as E on E.email_id = R.email_id ) where R.user_id = 4 and R.is_deleted != 1 ), replyIDs as ( select distinct reply_id from reply ), x as ( select user_id, email_id, date_created, subject, body, category, Rep.reply_id from inbox as I left outer join replyIDs as Rep on email_id = Rep.reply_id order by date_created desc ) select user_id, email_id, date_created, subject, body, category, reply_id,friend_id from x left outer join "Friends" as F on x.user_id = F.friend_id;'
        cursor.execute(query,(ID,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getFilteredInbox(self,ID,category):
        cursor = self.conn.cursor()
        query = 'with inbox as ( select E.user_id, E.email_id, E.date_created, E.subject, E.body, R.category from ( receives as R join "Email" as E on E.email_id = R.email_id ) where R.user_id = %s and R.is_deleted != 1 ), replyIDs as ( select distinct reply_id from reply ) select user_id, email_id, date_created, subject, body, category, Rep.reply_id from inbox as I left outer join replyIDs as Rep on email_id = Rep.reply_id where category = %s order by date_created desc;'
        cursor.execute(query,(ID,category,))
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
        query = 'with outbox as ( select user_id, email_id, date_created, subject, body from "Email" where user_id = %s and is_deleted != 1 ), replyIDs as ( select distinct reply_id from reply ) select user_id, email_id, date_created, subject, body, Rep.reply_id from Outbox as O left outer join replyIDs as Rep on email_id = Rep.reply_id order by date_created desc;'
        cursor.execute(query,(ID,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getEmailFromUser(self, email_id,user_id):
        cursor = self.conn.cursor()
        query = "select user_id,email_id,date_created,subject,body from \"Email\" where email_id = %s and user_id = %s and is_deleted != 1;"
        cursor.execute(query,(email_id,user_id,))
        result = []
        for row in cursor:
            result.append(row)
        return result

    def ReadEmailFromUser(self, user_id,email_id):
        cursor = self.conn.cursor()
        query = 'with viewed as ( update receives set is_viewed = 1 where user_id = %s and email_id = %s and is_deleted != 1 and is_viewed != 1 returning email_id ), support as ( insert into receives(user_id, email_id) select user_id, 0 from "Email" as E, viewed as V where E.email_id = V.email_id and V.email_id is not null returning user_id ) select E.user_id, E.email_id, date_created, subject, body, V.email_id from "Email" as E, support as S, viewed as V where E.email_id = V.email_id'
        cursor.execute(query,(user_id,email_id,))
        result = cursor.fetchone()
        self.conn.commit()
        return result




    def getEmailbyId(self, email_id):
        cursor = self.conn.cursor()
        query = 'SELECT date_created, subject, body, user_id, is_deleted FROM "Email" WHERE email_id = %s'
        cursor.execute(query,(email_id,))
        result = cursor.fetchone()
        return result

    def getEmailWithMostRecipients(self):
        cursor = self.conn.cursor()
        query = "with most_recipients as (select R.email_id from receives as R group by R.email_id having count(email_id) =(select count(email_id) as count from receives group by email_id order by count desc limit 1 )) select E.email_id,E.date_created,E.subject,E.body from \"Email\" as E,most_recipients as mr where E.email_id = mr.email_id;"
        cursor.execute(query)
        result = []
        for row in cursor:
            result.append(row)
        return result
    def getEmailWithMostRepliesbyUser(self,user_id):
        cursor = self.conn.cursor()
        query = 'WITH EMAILS AS ( SELECT email_id FROM "Email" where user_id = 2 ), Recipients_Count AS ( SELECT e.email_id FROM EMAILS e inner join reply r on e.email_id = r.original_id group by e.email_id having count(e.email_id) =( SELECT count(e.email_id) as count FROM EMAILS e inner join reply r on e.email_id = r.original_id group by e.email_id order by count desc limit 1 ) ) SELECT * FROM "Email" e natural inner join Recipients_Count rc WHERE e.email_id = rc.email_id'
        cursor.execute(query, (user_id,))
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
    def sendEmail(self, email_id, user_id):
        cursor = self.conn.cursor()
        query = 'with entry as ( insert into receives( is_viewed, is_deleted, category, user_id, email_id ) values (0, 0, \'No Category\', %s, %s) returning email_id ) select user_id, Em.email_id, date_created, subject, body from "Email" as Em, entry as En where Em.email_id = En.email_id;'
        cursor.execute(query, (user_id, email_id,))
        email = cursor.fetchone()
        self.conn.commit()
        return email

    def unsendEmail(self, email_id, user_id):
        cursor = self.conn.cursor()
        query = 'with entry as ( delete from receives where user_id = %s and email_id = %s returning user_id, email_id ) select Em.user_id, Em.email_id, date_created, subject, body, Em.is_deleted from "Email" as Em, entry as En where Em.email_id = En.email_id'
        cursor.execute(query, (user_id, email_id,))
        email = cursor.fetchone()
        self.conn.commit()
        return email

    def updateReceive(self, user_id, email_id, new_user_id, new_email_id,is_viewed,is_deleted,category):
        cursor = self.conn.cursor()
        query = 'UPDATE receives SET user_id = %s, email_id = %s, is_viewed = %s, is_deleted = %s, category = %s WHERE user_id = %s and email_id = %s'
        cursor.execute(query, (new_user_id, new_email_id,is_viewed,is_deleted,category, user_id, email_id))
        self.conn.commit()
        return new_user_id, new_email_id,is_viewed,is_deleted,category

    def getReceive(self, user_id,email_id):
        cursor = self.conn.cursor()
        query = 'SELECT user_id, email_id, is_viewed, is_deleted,category FROM receives WHERE user_id=%s and email_id = %s'
        cursor.execute(query,(user_id,email_id,))
        result = cursor.fetchone()
        return result

    def readEmail(self, email_ID):
        cursor = self.conn.cursor()
        query = "update receives set is_viewed = 1 where email_ID = %s returning email_ID;"
        cursor.execute(query, (email_ID,))
        self.conn.commit()
        return email_ID