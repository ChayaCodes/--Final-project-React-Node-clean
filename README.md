# התקנה
### דרישות מוקדמות: 
* node.js
* mongoDB compass
* mongoDB srver
  ##
  צריך ליצור אצלך במחשב מסד נתונים mongoo בשם  policmanDB
ואז לייבא אליו את חמשת הטבלאות שנמצאות בתיקייה בתוך תיקיית הפרוייקט.
צריך לשים לב שהם מתעדכנות מידי פעם ואז צריך לעדכן אותם גם אצלך.
## הפעלה
#### צד שרת:
```bash
cd server
npm i 
npm run dev
```
#### צד לקוח
```bash
cd client
npm i 
npm start
```


צריך ליצור בתיקייה server קובץ בשם .env ולהוסיף אליו את השורה הבאה:
ולהוסיף אליו את הנתונים הנדרשים.
דוגמא לקובץ .env תקין:
```bash
PORT=7001
MONGO_URI = 'mongodb://localhost:27017/policmanDB'
ACCESS_TOKEN_SECRET = 'fnt5673jcty573980wmdwz6ndhfvw946t554gbvhew4932840xg9'
REFRESH_TOKEN_SECRET = 'ftyur67oki9480s2ur3iwtgjtleigiy589348095mxgh3zfur3wkf4u3'
```
