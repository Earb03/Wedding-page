import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const serviceAccountPath = resolve('firebase-service-account.json');
const giftsPath = resolve('app/regalos/gifts-data.json');

if (!existsSync(serviceAccountPath)) {
  console.error(
    'Falta firebase-service-account.json. Descarga la service account de Firebase y ponla en la raiz del proyecto.',
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
const giftCategories = JSON.parse(readFileSync(giftsPath, 'utf8'));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();
const batch = db.batch();
let giftCount = 0;

giftCategories.forEach((category, categoryIndex) => {
  category.gifts.forEach((gift, giftIndex) => {
    const giftRef = db.collection('gifts').doc(gift.id);

    batch.set(
      giftRef,
      {
        ...gift,
        category: category.title,
        categoryOrder: categoryIndex,
        order: giftIndex,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    giftCount += 1;
  });
});

await batch.commit();

console.log(`Listo. ${giftCount} regalos subidos a Firestore.`);
