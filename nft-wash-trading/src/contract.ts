import { MarketItemCreated as MarketItemCreatedEvent } from "../generated/Contract/Contract"
import { MarketItemCreated } from "../generated/schema"

export function handleMarketItemCreated(event: MarketItemCreatedEvent): void {
  let entity = new MarketItemCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.nftContract = event.params.nftContract
  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.owner = event.params.owner
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
