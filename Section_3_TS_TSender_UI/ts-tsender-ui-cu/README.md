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

### Example 2

I'm looking to make an input field react component with tsx. It should take the following props:

- a label
- placeholder
- value
- type
- large (whether or not the textarea is large)
- onChange (the function to call when the area changes)

I'm using tailwind for styling.

### Example 3

```
...
```

Here is what my instructor gave me, what's the difference?

### Example 4

Here is my button:

```tsx
<button onClick={handleSubmit}>Set Tokens</button>
```

Using tailwind, can you make it look a little nicer?
