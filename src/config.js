export const nftContract = "0x12e63C2BE15DC5945A22d96BfB7Cd4fC9b1F91Fa";
export const marketContract = "0x14DC8a26a64c6CC7a205FC2B4bB258C7367d3829";

export const shortAddress = (addr) =>
  addr.length > 10 && addr.startsWith("0x")
    ? `${addr.substring(0, 10)}...${addr.substring(addr.length - 10)}`
    : addr;
