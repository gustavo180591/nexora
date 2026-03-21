<script lang="ts">
  export let data;
</script>

<h1 class="text-2xl font-bold mb-6">Dashboard</h1>

<div class="grid grid-cols-3 gap-4 mb-6">
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-gray-500">Total Revenue</h2>
    <p class="text-2xl font-bold">${data.totalRevenue / 100}</p>
  </div>

  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-gray-500">Orders</h2>
    <p class="text-2xl font-bold">{data.orders.length}</p>
  </div>
</div>

<div class="bg-white p-4 rounded shadow">
  <h2 class="text-lg font-semibold mb-4">Recent Orders</h2>

  {#each data.orders as order}
    <div class="flex justify-between border-b py-2">
      <span>{order.id}</span>
      <span>{order.status}</span>
      <span>${order.totalAmount / 100}</span>
    </div>
  {/each}
</div>
