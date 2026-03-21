<script lang="ts">
  async function createAccount() {
    const res = await fetch('/api/connect/create-account', {
      method: 'POST'
    });

    const data = await res.json();

    const linkRes = await fetch('/api/connect/account-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId: data.accountId })
    });

    const link = await linkRes.json();

    window.location.href = link.url;
  }
</script>

<h1 class="text-2xl font-bold mb-6">Stripe Connect</h1>

<button
  on:click={createAccount}
  class="bg-blue-600 text-white px-4 py-2 rounded"
>
  Become a Seller
</button>
