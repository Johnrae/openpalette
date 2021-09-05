export const contractAddress = "0x568323B2339A9F1BaE40bc29874B76D8Bd0ca43D";

export const abi = [
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "function approve(address to, uint256 tokenId)",
  "function balanceOf(address owner) view returns (uint256)",
  "function claim()",
  "function generateSVG(uint256 color1, uint256 color2, uint256 color3, uint256 color4, uint256 color5) pure returns (string)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function getColor1(uint256 tokenId) pure returns (uint256)",
  "function getColor2(uint256 tokenId) pure returns (uint256)",
  "function getColor3(uint256 tokenId) pure returns (uint256)",
  "function getColor4(uint256 tokenId) pure returns (uint256)",
  "function getColor5(uint256 tokenId) pure returns (uint256)",
  "function getColors(uint256 tokenId) pure returns (string)",
  "function getContrastingColor(uint256 color) pure returns (string)",
  "function getGammaExpandedComponent(uint16 component) pure returns (uint256)",
  "function getIsDark(uint16 r, uint16 g, uint16 b) pure returns (bool)",
  "function getLuminance(uint16 r, uint16 g, uint16 b) pure returns (uint256)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function name() view returns (string)",
  "function owner() view returns (address)",
  "function ownerClaim(uint256 tokenId)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function renounceOwnership()",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)",
  "function setApprovalForAll(address operator, bool approved)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  "function symbol() view returns (string)",
  "function tokenByIndex(uint256 index) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) pure returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function transferOwnership(address newOwner)",
];
