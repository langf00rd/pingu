import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** generate a unique mongodb 12byte ID */
export function generate12ByteID() {
  const timestamp = Math.floor(Date.now() / 1000)
    .toString(16)
    .padStart(8, "0"); // 4 bytes
  const randomValue = generateRandomBytes(5); // 5 bytes
  const incrementingCounter = generateRandomBytes(3); // 3 bytes
  const objectId = timestamp + randomValue + incrementingCounter; // Combine the parts into a 24-character hexadecimal string
  return objectId;
}

function generateRandomBytes(byteCount: number) {
  const bytes = [];
  for (let i = 0; i < byteCount; i++) {
    const randomByte = Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0");
    bytes.push(randomByte);
  }
  return bytes.join("");
}
