<script lang="ts">
  const { data, children } = $props();
</script>

<div class="min-h-screen flex">
  <aside class="w-64 bg-gray-900 text-white p-4">
    <h2 class="text-xl font-bold mb-6">Nexora</h2>

    <nav class="space-y-2">
      <a href="/dashboard" class="block hover:bg-gray-700 p-2 rounded">
        Dashboard
      </a>
      <a href="/dashboard/orders" class="block hover:bg-gray-700 p-2 rounded">
        Orders
      </a>
      <a href="/dashboard/connect" class="block hover:bg-gray-700 p-2 rounded">
        Stripe Connect
      </a>

      {#if data.user?.role === 'ADMIN'}
        <a href="/dashboard/admin" class="block hover:bg-gray-700 p-2 rounded">
          Admin
        </a>
        <a href="/dashboard/payouts" class="block hover:bg-gray-700 p-2 rounded">
          Payouts
        </a>
      {/if}
    </nav>
  </aside>

  <main class="flex-1 p-6 bg-gray-100">
    {@render children()}
  </main>
</div>
