1. Create a basic react/nextjs application✅
   1. Static!
2. Connect our wallet, with a nicer connect application✅
3. Implememt this function:

```Solidity
function airdropERC20(
  address tokenAddress, // ERC20 token
  address[] calldata recipients,
  uint256[] calldata amounts,
  uint256 totalAmout
)
```

[address(a), address(b), address(c)]
[100, 200, 300]

4. Deploy to fleek

## Examples of working with AI

### Example 1

Here is my connect button for connecting my web3 app to the blockchain:

```tsx
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div>
      <ConnectButton />
      Hi
    </div>
  );
}
```

Can you turn this into a reusable header component with:

- a github link/button
- a title called `tsender`
- this connect button on the right side

Can you only use the following imports:

```
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'
```
