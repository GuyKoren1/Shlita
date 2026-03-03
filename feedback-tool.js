#!/usr/bin/env node
// Feedback tool — query and manage feedback from MongoDB
// Usage:
//   node feedback-tool.js list          — list all feedback as JSON
//   node feedback-tool.js delete <id>   — delete feedback item by id

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
if (!uri) {
    console.error('Error: MONGODB_URI environment variable not set');
    process.exit(1);
}

async function main() {
    const cmd = process.argv[2];
    const client = new MongoClient(uri);
    await client.connect();
    const col = client.db('shlita').collection('feedback');

    if (cmd === 'list') {
        const items = await col.find({}).toArray();
        console.log(JSON.stringify(items));
    } else if (cmd === 'delete') {
        const id = process.argv[3];
        if (!id) { console.error('Usage: node feedback-tool.js delete <id>'); process.exit(1); }
        const result = await col.deleteOne({ id });
        console.log(result.deletedCount ? `Deleted ${id}` : `Not found: ${id}`);
    } else {
        console.error('Usage: node feedback-tool.js <list|delete> [id]');
        process.exit(1);
    }

    await client.close();
}

main().catch(e => { console.error(e.message); process.exit(1); });
