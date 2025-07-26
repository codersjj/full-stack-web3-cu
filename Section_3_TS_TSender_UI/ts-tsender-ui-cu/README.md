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

### Example 5

Here is a useMemo I'm going to use:

```tsx
const total: number = useMemo(() => caculateTotal(amounts), [amounts]);
```

I want to make a `caculateTotal` function which takes a string in the format:

```
100
200
300
```

or:

```
100,200
300
```

and adds all the numbers up. It can be comma or new line delimited. Can you make such a function in ts?

### Example 6

Great! Here's what I'm going with:

```ts
export function calculateTotal(amounts: string): number {
  // Split by commas or newlines and remove any empty entries
  const amountArr = amounts.split(/[,|\n]+/).filter((amt) => amt.trim() !== "");

  // Convert to numbers and sum
  return amountArr.reduce((sum, str) => {
    const num = parseFloat(str.trim());
    return sum + (isNaN(num) ? 0 : num);
  }, 0);
}
```

Can you write me a test for this now? I'm going to use `Vitest`, and have the test be in the same dir.
