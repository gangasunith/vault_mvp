async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']);
  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt','decrypt']
  );
}

async function encryptData(key, data) {
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(data);
  const ciphertext = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return { iv: Array.from(iv), data: btoa(String.fromCharCode(...new Uint8Array(ciphertext))) };
}

async function decryptData(key, blob) {
  const iv = new Uint8Array(blob.iv);
  const data = Uint8Array.from(atob(blob.data), c=>c.charCodeAt(0));
  const decrypted = await window.crypto.subtle.decrypt({ name:'AES-GCM',iv}, key, data);
  return new TextDecoder().decode(decrypted);
}
