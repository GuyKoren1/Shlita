Fetch feedback from MongoDB by running this in the Shlita project root:

```
node feedback-tool.js list
```

Display ALL feedback items in a clear Hebrew table format, grouped by type (באגים first, then הצעות).

For each item show:
- # (sequential number)
- Type (באג / הצעה)
- id (the internal id field, for deletion)
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

To delete items, run: `node feedback-tool.js delete <id>` for each item.

IMPORTANT: After fixing a bug from the feedback list, ALWAYS delete it from the database using the delete command above. Do not leave fixed bugs in the feedback list.
