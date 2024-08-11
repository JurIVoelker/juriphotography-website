require("dotenv").config(); // Load environment variables from .env

const { exec } = require("child_process");

const href = process.env.TRANSFER_HREF;
const token = process.env.TRANSFER_TOKEN;

if (!href || !token) {
  console.error(
    "Environment variables TRANSFER_HREF or TRANSFER_TOKEN_SALT are not set."
  );
  process.exit(1);
}

const cmd = `strapi transfer --force --from ${href} --from-token ${token}`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error.message || error}`);
    process.exit(1);
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(`Transfer completed successfully`);
  console.log(`stdout: ${stdout}`);
  process.exit(0);
});
