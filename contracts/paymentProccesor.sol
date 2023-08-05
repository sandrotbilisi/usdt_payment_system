pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract paymentProccesor{
  address public contractOwner;
  IERC20 public usdt;

  event PaymentDone(
    address indexed from,
    address indexed to,
    uint payid,
    uint amount,
    uint date
  );

  constructor(address _contractOwner,address _usdt) public {
    contractOwner = _contractOwner;
    usdt = IERC20(_usdt);
  }

  function pay(uint amount, uint payid) external {
    usdt.transferFrom(msg.sender, contractOwner, amount);
    emit PaymentDone(msg.sender, contractOwner, payid, amount, block.timestamp);
  }
}
