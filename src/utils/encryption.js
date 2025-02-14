const crypto = require("crypto");

const secretKey = process.env.TOKEN_SHHHH;
const algorithm = "aes-256-cbc";
const ivLength = 16;

const key = crypto.createHash("sha256").update(secretKey).digest();

const encrypt = (text) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
};

const decrypt = (iv, encryptedData) => {
  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
