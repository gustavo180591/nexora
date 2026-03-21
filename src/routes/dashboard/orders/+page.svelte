<script lang="ts">
  export let data;
</script>

<h1 class="text-2xl font-bold mb-6">Orders</h1>

<div class="bg-white p-4 rounded shadow">
  {#each data.orders as order (order.id)}
    <div class="flex justify-between border-b py-2">
      <span>{order.id}</span>
      <span>{order.status}</span>
      <span>${order.totalAmount / 100}</span>
    </div>
  {/each}
</div>
