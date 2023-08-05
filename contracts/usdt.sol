pragma solidity 0.8.4;
import "@openzeppelin/contracts/token/erc20/erc20.sol";

contract usdt is ERC20{
  constructor() ERC20('tether stablecoin', 'USDT') public {}

  function faucet(address to,uint amount) external {
      _mint(to, amount);
  }
}
