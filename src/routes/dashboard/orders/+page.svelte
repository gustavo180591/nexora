<script lang="ts">
  import { formatMoney, getStatusColor, getStatusText } from '$lib/utils/money';

  const { data } = $props();
</script>

<h1 class="text-2xl font-bold mb-6">Orders</h1>

<div class="bg-white rounded shadow">
  {#if data.orders.length === 0}
    <div class="p-8 text-center">
      <div class="text-gray-400 text-4xl mb-4">📦</div>
      <h3 class="text-lg font-semibold text-gray-600 mb-2">No orders yet</h3>
      <p class="text-gray-500">Your orders will appear here once customers start purchasing.</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each data.orders as order (order.id)}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code class="bg-gray-100 px-2 py-1 rounded text-xs">
                  {order.id.slice(0, 8)}...
                </code>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs rounded-full {getStatusColor(order.status)}">
                  {getStatusText(order.status)}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatMoney(order.totalAmount)}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</div>
