const crypto = require('crypto');

const hash = (data) => crypto.createHash('sha3-512').update(data).digest('hex');

exports.deterministicPartitionKey = (event) => {
	const TRIVIAL_PARTITION_KEY = '0';
	const MAX_PARTITION_KEY_LENGTH = 256;

	if (!event) {
		return TRIVIAL_PARTITION_KEY;
	}

	let { partitionKey } = event;
	if (!partitionKey) {
		return hash(JSON.stringify(event));
	}

	if (typeof partitionKey !== 'string') {
		partitionKey = JSON.stringify(partitionKey);
	}

	if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
		partitionKey = hash(partitionKey);
	}

  return partitionKey;
};