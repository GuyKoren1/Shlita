Fetch feedback from MongoDB by running this Node.js script in the Shlita project root:

```
node -e "
const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://shlita-admin:huQZS3EXByl1WsTC@cluster0.qyf7xqt.mongodb.net/shlita';
(async () => {
  const client = new MongoClient(uri);
  await client.connect();
  const items = await client.db('shlita').collection('feedback').find({}).toArray();
  console.log(JSON.stringify(items));
  await client.close();
})().catch(e => { console.error(e.message); process.exit(1); });
"
```

Display ALL feedback items in a clear Hebrew table format, grouped by type (באגים first, then הצעות).

For each item show:
- # (sequential number)
- Type (באג / הצעה)
- Title
- Description (if exists)
- Page it was reported from
- Who reported (admin/viewer)
- Date & time

If the list is empty, say: **אין משוב במערכת** and stop.

After showing the list, ask the user what they want to do:
- Fix a specific bug (give the item number)
- Delete irrelevant items (give item numbers)
- Skip for now

If the user asks to delete items, run a Node.js script to delete them from MongoDB by their `id` field.
If the user asks to fix a bug, start working on the fix based on the description.
