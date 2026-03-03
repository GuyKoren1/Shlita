Read the file `feedback.json` in the Shlita project root directory. Display ALL feedback items in a clear Hebrew table format, grouped by type (bugs first, then suggestions).

For each item show:
- Type (באג / הצעה)
- Title
- Description (if exists)
- Page it was reported from
- Who reported (admin/viewer)
- Date & time

After showing the list, ask the user what they want to do:
- Fix a specific bug (give the item number)
- Delete irrelevant items (give item numbers)
- Skip for now

If the user asks to delete items, remove them from `feedback.json` directly.
If the user asks to fix a bug, start working on the fix based on the description.
