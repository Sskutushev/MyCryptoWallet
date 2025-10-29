import { ethers } from 'ethers'

class ContractService {
  async createContract(address: string, abi: any, signerOrProvider: ethers.Signer | ethers.Provider) {
    return new ethers.Contract(address, abi, signerOrProvider)
  }

  async getContractEvents(contract: ethers.Contract, eventName: string, fromBlock: number = 0) {
    // Получить события контракта
    const filter = contract.filters[eventName]()
    return await contract.queryFilter(filter, fromBlock)
  }

  // Шаблон для DEX контракта
  getDexContractABI() {
    return [
      'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
      'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
      'function addLiquidity(address tokenA, address tokenB, uint amountADesired, uint amountBDesired, uint amountAMin, uint amountBMin, address to, uint deadline) external returns (uint amountA, uint amountB, uint liquidity)'
    ]
  }

  // Шаблон для lending контракта
  getLendingContractABI() {
    return [
      'function deposit(address asset, uint amount, address onBehalfOf, uint16 referralCode) external',
      'function withdraw(address asset, uint amount, address to) external returns (uint)',
      'function borrow(address asset, uint amount, uint16 referralCode, address onBehalfOf) external',
      'function getUserAccountData(address user) external view returns (uint totalCollateralBase, uint totalDebtBase, uint availableBorrowsBase, uint currentLiquidationThreshold, uint ltv, uint healthFactor)'
    ]
  }

  // Шаблон для токена (ERC20)
  getERC20ABI() {
    return [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function decimals() view returns (uint8)',
      'function totalSupply() view returns (uint256)',
      'function balanceOf(address owner) view returns (uint256)',
      'function transfer(address to, uint256 value) returns (bool)',
      'function approve(address spender, uint256 value) returns (bool)',
      'function allowance(address owner, address spender) view returns (uint256)',
      'event Transfer(address indexed from, address indexed to, uint256 value)',
      'event Approval(address indexed owner, address indexed spender, uint256 value)'
    ]
  }
}

export const contractService = new ContractService()