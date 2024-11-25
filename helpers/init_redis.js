const redis = require('redis');

const client = redis.createClient({
    port: 6379,
    host: '127.0.0.1',
});

(async () => {
    try {
        await client.connect();
        console.log('redis connected');
    } catch (err) {
        console.log('Failed to connect to redis', err.message);

    }
})()

client.on('ready', () => {
    console.log('redis ready');
})

client.on('error', (err) => {
    console.error('redis error:', err.message)
})
client.on('end', () => {
    console.log('redis disconnected');
})

process.on('SIGINT', async () => {
    if (client.isOpen) {
        await client.quit();
    }
    console.log('Redis client closed due to app termination')
    process.exit(0);
})
module.exports = client