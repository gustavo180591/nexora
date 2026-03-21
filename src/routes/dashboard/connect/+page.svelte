<script lang="ts">
  let loading = false;
  let error = '';

  async function createAccount() {
    loading = true;
    error = '';
    
    try {
      const res = await fetch('/api/connect/create-account', {
        method: 'POST'
      });

      if (!res.ok) {
        throw new Error('Failed to create account');
      }

      const data = await res.json();

      const linkRes = await fetch('/api/connect/account-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: data.accountId })
      });

      if (!linkRes.ok) {
        throw new Error('Failed to generate onboarding link');
      }

      const link = await linkRes.json();

      // Redirect to Stripe onboarding
      window.location.href = link.url;
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred';
    } finally {
      loading = false;
    }
  }
</script>

<div class="max-w-2xl mx-auto">
  <h1 class="text-2xl font-bold mb-6">Stripe Connect</h1>
  
  <div class="bg-white p-6 rounded shadow">
    <h2 class="text-lg font-semibold mb-4">Become a Seller</h2>
    
    <p class="text-gray-600 mb-6">
      Start selling on Nexora by setting up your Stripe Connect account. 
      You'll be able to receive payments directly to your bank account.
    </p>

    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong>Error:</strong> {error}
      </div>
    {/if}

    <button
      on:click={createAccount}
      disabled={loading}
      class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
    >
      {#if loading}
        <span class="flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Setting up your account...
        </span>
      {:else}
        Become a Seller
      {/if}
    </button>

    <div class="mt-6 text-sm text-gray-500">
      <p class="mb-2">📋 What happens next:</p>
      <ul class="list-disc list-inside space-y-1">
        <li>You'll be redirected to Stripe's secure onboarding</li>
        <li>Complete your business information</li>
        <li>Link your bank account for payouts</li>
        <li>Start receiving payments on Nexora</li>
      </ul>
    </div>
  </div>
</div>
