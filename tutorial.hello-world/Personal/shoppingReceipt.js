/* This piece of code calculates how much money it's owed after buying groceries. */

// Let `giftCard` be the available credit from at least one Woolworths gift card.
/* REPLACE */ const giftCard = 24.50;

// Let `total` be the cost of his and my items after `discount` is applied.
/* REPLACE */ const total = 0;

// Let `discount` be a discount expressed as a percentage.
/* REPLACE */ const discount = 0.10;

// Let `myShare` be the cost of the items I've purchased before `discount` is applied..
/* REPLACE */ const myShare = 0 * (1 - discount);




// Let `giftCardDiscount` be the amount of dollars deducted from the cost of `giftCard`. 
const giftCardDiscount = giftCard * 0.04;
// Let `outOfPocket` be an additional amount of money to reach `total` that `giftCard` can't cover.
const outOfPocket = Math.max(total - giftCard, 0);
// Let `hisShare` be the cost of the items he's purchased.
const hisShare = total - myShare;
// Let `iPay` be an amount of money I owe to him, if any.
let iPay;
// Let `hePays` be an amount of money he owes to me, if any.
let hePays;
// Let `usedGiftCardCredit` be the amount of credit used from `gifCard` today.
const usedGiftCardCredit = Math.min(total, giftCard);
// Let `discountFromGiftCard` be the deduction that should be applied to `total`. This amount is based on what we've saved when getting `giftCardCredit`.
const discountFromGiftCard = (giftCardDiscount / giftCard) * usedGiftCardCredit;

if (giftCard > myShare) {
    iPay = 0;
    hePays = hisShare - outOfPocket - (discountFromGiftCard / 2);
}
else {
    iPay = myShare - giftCard - (discountFromGiftCard / 2);
    hePays = 0;
}

console.log(`His share: ${hisShare}`);
console.log(`I pay: ${iPay}`);
console.log(`He pays: ${hePays}`);

