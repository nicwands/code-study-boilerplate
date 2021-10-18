import { gql } from 'nuxt-graphql-request'

export const auctionQuery = (id) => {
    return gql`
        {
            reserveAuction(id: ${id}) {
                id
                status
                token
                duration
                firstBidTime
                tokenId
                tokenContract
                auctionCurrency {
                    id
                }
                reservePrice
                currentBid {
                    id
                    amount
                  	createdAtTimestamp
                    bidder {
                        id
                    }
                }
                media {
                    contentURI
                }
                previousBids {
                    id
                    amount
                  	createdAtTimestamp
                  	bidder {
                        id
                    }
                }
                expectedEndTimestamp
            }
        }
    `
}

export const serializeBid = (bid, $store) => {
    const userAddress = _get(bid, 'bidder.id')
    const user = $store.state.addresses[userAddress] || {}
    const clippedAddress = userAddress.substring(0, 12) + '...'

    return {
        profilePicture: user.profileImageURL,
        username: user.zoraUsername ? `@${user.zoraUsername}` : clippedAddress,
        bidder: userAddress,
        ethBidValue: bid.amount,
        time: new Date(parseInt(bid.createdAtTimestamp) * 1000),
        isFWB: user.isFWB || false,
        // isFWB: true,
    }
}
