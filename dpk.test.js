const crypto = require('crypto');
const { deterministicPartitionKey } = require('./dpk');

const createHash = (key) => crypto.createHash('sha3-512').update(key).digest('hex');

describe('deterministicPartitionKey', () => {
	it("Returns the literal '0' when given no input", () => {
		const trivialKey = deterministicPartitionKey();
		expect(trivialKey).toBe('0');
	});

	// partitionKey exists and is a string
	it('Returns event.partitionKey when event contains partitionKey key of type string and length <= 256', () => {
		const partitionKey = 'short string';
		const deterministicKey = deterministicPartitionKey({ partitionKey });
		expect(deterministicKey).toBe(partitionKey);
	});

	it('Returns the hash of event.partitionKey when event contains partitionKey of type string and length > 256', () => {
		const partitionKey = 'A'.repeat(260);
		const deterministicKey = deterministicPartitionKey({ partitionKey });
		const expectedDeterministicKey = createHash(partitionKey);
		expect(deterministicKey).toBe(expectedDeterministicKey);
	});

	// partitionKey exists and is NOT a string
	it('Returns stringified partitionKey when event contains partitionKey key of type != string and length <= 256', () => {
		const partitionKey = { x: 'short string' };
		const deterministicKey = deterministicPartitionKey({ partitionKey });
		expect(deterministicKey).toBe(JSON.stringify(partitionKey));
	});

	it('Returns the hash of event.partitionKey when event contains partitionKey key of type != string and length > 256', () => {
		const partitionKey = { x: 'A'.repeat(260) };
		const deterministicKey = deterministicPartitionKey({ partitionKey });
		const expectedDeterministicKey = createHash(JSON.stringify(partitionKey));
		expect(deterministicKey).toBe(expectedDeterministicKey);
	});

	// partitionKey does NOT exist
	it('Returns the hash of the event parameter when event does not contain partitionKey key', () => {
		const event = { x: 'short string' };
		const deterministicKey = deterministicPartitionKey(event);
		const expectedDeterministicKey = createHash(JSON.stringify(event));
		expect(deterministicKey).toBe(expectedDeterministicKey);
	});
});
