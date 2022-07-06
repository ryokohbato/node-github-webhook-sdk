import crypto from "crypto";

const verify = (secret: string, bodyString: string, signature: string): boolean => {
  return signature === crypto.createHmac("sha256", secret).update(bodyString).digest("hex");
};

export default verify;
