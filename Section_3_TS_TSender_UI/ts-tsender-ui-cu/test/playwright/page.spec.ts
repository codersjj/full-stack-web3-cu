import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../wallet-setup/basic.setup";

// Create a test instance with Synpress and MetaMask fixtures
const test = testWithSynpress(metaMaskFixtures(basicSetup));

// Extract expect function from test
const { expect } = test;

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("TSender");
});

test("should show the airdrop form when connected, otherwise, not", async ({
  page,
  context,
  metamaskPage,
  extensionId,
}) => {
  await page.goto("/");

  // check we see 'Please connect wallet'
  await expect(page.getByText("Please connect")).toBeVisible();

  // Create a new MetaMask
  const metamask = new MetaMask(
    context,
    metamaskPage,
    basicSetup.walletPassword,
    extensionId
  );

  await page.getByTestId("rk-connect-button").click();
  await page.getByTestId("rk-wallet-option-metaMask").waitFor({
    state: "visible",
    timeout: 30000,
  });
  await page.getByTestId("rk-wallet-option-metaMask").click();

  await metamask.connectToDapp();

  const customNetwork = {
    name: "Anvil",
    rpcUrl: "http://127.0.0.1:8545",
    chainId: 31337,
    symbol: "ETH",
  };

  await metamask.addNetwork(customNetwork);

  await expect(page.getByText("token address")).toBeVisible();
});
