const bcrypt = require('bcryptjs');

async function test() {
  const senha = 'admin123';
  const hash = '$2b$10$LkFgmLceZEODS2hNVnPV4.S3fZ6BnRYG6ZrsrSMURo/46PNsvH7tK';

  const igual = await bcrypt.compare(senha, hash);
  console.log('Senha bate?', igual);
}

test();