# Code Study Boilerplate

### Scab Shop Components

##### User

[`/store/web3`](https://github.com/nicwands/code-study-boilerplate/blob/scab-shop-frontend/store/web3.js)
Connects user's wallet using WalletConnect and adds their account and signer to the store

##### Admin

[`/components/AddArtist.vue`](https://github.com/nicwands/code-study-boilerplate/blob/scab-shop-frontend/components/AddArtist.vue)
Adds a wallet address to the list of verified artists in the contract

##### Artist

[`/components/MintNft.vue`](https://github.com/nicwands/code-study-boilerplate/blob/scab-shop-frontend/components/MintNft.vue)
Mints the artist's tattoo to the contract

[`/components/StampNft.vue`](https://github.com/nicwands/code-study-boilerplate/blob/scab-shop-frontend/components/StampNft.vue)
Stamps an artist's NFT to indicate it was tattooed on a person

**Local Development**

-   `nvm i 12`
-   `cp .env.example .env`
-   `npm i`
-   `npm run dev`
