<script lang="ts">
  import { formatMoney } from '$lib/utils/money';

  const { data } = $props();

  const { summary, metricsByStatus, recentOrders, recentWebhooks } = data;

  function getStatusColor(status: string) {
    switch (status) {
      case 'PAID': return 'bg-emerald-100 text-emerald-700';
      case 'PENDING': return 'bg-amber-100 text-amber-700';
      case 'FAILED': return 'bg-rose-100 text-rose-700';
      case 'CANCELED': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  }

  function getWebhookColor(processed: boolean) {
    return processed 
      ? 'bg-emerald-100 text-emerald-700' 
      : 'bg-amber-100 text-amber-700';
  }
</script>

<svelte:head>
  <title>Admin Dashboard | Nexora</title>
</svelte:head>

<div class="min-h-screen bg-slate-50">
  <!-- Top Navigation -->
  <nav class="bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-slate-900">Nexora Admin</h1>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-slate-500 hover:text-slate-700">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-slate-200 min-h-screen">
      <div class="p-6">
        <nav class="space-y-1">
          <a href="/dashboard" class="text-slate-600 hover:text-slate-900 hover:bg-slate-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Seller Dashboard
          </a>
          <a href="/dashboard/admin" class="bg-indigo-50 text-indigo-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Admin Dashboard
          </a>
          <a href="/dashboard/payouts" class="text-slate-600 hover:text-slate-900 hover:bg-slate-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Payouts
          </a>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
              <p class="mt-1 text-slate-500">Platform overview and business metrics</p>
            </div>
            <div class="flex items-center space-x-3">
              <button class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export Report
              </button>
              <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                System Health
              </button>
            </div>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <!-- Total Volume -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0 1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Total Volume</div>
                <div class="text-2xl font-bold text-slate-900">{formatMoney(summary.totalVolume)}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-emerald-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4 4-6 6" />
                </svg>
                <span class="text-emerald-600 font-medium">+18.2%</span>
                <span class="text-slate-500 ml-1">vs last month</span>
              </div>
              <div class="text-xs text-slate-400">All time</div>
            </div>
          </div>

          <!-- Platform Revenue -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Platform Revenue</div>
                <div class="text-2xl font-bold text-slate-900">{formatMoney(summary.platformRevenue)}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <div class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                <span class="text-slate-600">10% commission</span>
              </div>
              <div class="text-xs text-slate-400">This month</div>
            </div>
          </div>

          <!-- Total Sellers -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Total Sellers</div>
                <div class="text-2xl font-bold text-slate-900">{summary.totalSellers}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-emerald-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4 4-6 6" />
                </svg>
                <span class="text-emerald-600 font-medium">+12</span>
                <span class="text-slate-500 ml-1">new this week</span>
              </div>
              <div class="text-xs text-slate-400">Active</div>
            </div>
          </div>

          <!-- Total Orders -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Total Orders</div>
                <div class="text-2xl font-bold text-slate-900">{summary.totalOrders}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-amber-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                <span class="text-amber-600 font-medium">+8.3%</span>
                <span class="text-slate-500 ml-1">vs last week</span>
              </div>
              <div class="text-xs text-slate-400">All time</div>
            </div>
          </div>
        </div>

        <!-- Order Status Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-2xl font-bold text-slate-900">{metricsByStatus.PAID || 0}</span>
            </div>
            <div class="text-sm font-medium text-slate-900">Completed</div>
            <div class="text-xs text-slate-500">Successfully processed</div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-2xl font-bold text-slate-900">{metricsByStatus.PENDING || 0}</span>
            </div>
            <div class="text-sm font-medium text-slate-900">Processing</div>
            <div class="text-xs text-slate-500">Awaiting completion</div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="text-2xl font-bold text-slate-900">{metricsByStatus.FAILED || 0}</span>
            </div>
            <div class="text-sm font-medium text-slate-900">Failed</div>
            <div class="text-xs text-slate-500">Payment issues</div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span class="text-2xl font-bold text-slate-900">{metricsByStatus.CANCELED || 0}</span>
            </div>
            <div class="text-sm font-medium text-slate-900">Canceled</div>
            <div class="text-xs text-slate-500">User initiated</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Recent Webhooks -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div class="p-6 border-b border-slate-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">Recent Webhooks</h3>
                  <p class="text-sm text-slate-500 mt-1">Real-time event processing</p>
                </div>
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span class="text-sm text-slate-600">Live</span>
                </div>
              </div>
            </div>
            
            {#if recentWebhooks.length === 0}
              <div class="p-12 text-center">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-slate-900 mb-2">No webhook events yet</h3>
                <p class="text-slate-500">Webhook events will appear here as they're processed.</p>
              </div>
            {:else}
              <div class="space-y-3 p-6">
                {#each recentWebhooks as webhook (webhook.id)}
                  <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <div class="font-medium text-slate-900 text-sm">{webhook.type}</div>
                        <div class="text-xs text-slate-500">{new Date(webhook.createdAt).toLocaleString()}</div>
                      </div>
                    </div>
                    <span class={`px-2 py-1 text-xs font-medium rounded-full ${getWebhookColor(webhook.processed)}`}>
                      {webhook.processed ? 'Processed' : 'Pending'}
                    </span>
                  </div>
                {/each}
              </div>
            {/if}
          </div>

          <!-- Recent Transactions -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div class="p-6 border-b border-slate-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">Recent Transactions</h3>
                  <p class="text-sm text-slate-500 mt-1">Latest platform activity</p>
                </div>
                <a href="/dashboard/payouts" class="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View all
                  <svg class="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  {#each recentOrders as order (order.id)}
                    <tr class="hover:bg-slate-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="font-mono text-sm text-slate-900">{order.id.slice(0, 10)}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-900">{order.user?.email ?? 'N/A'}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right">
                        <div class="text-sm font-medium text-slate-900">
                          {formatMoney(order.totalAmount, order.currency?.toUpperCase?.() ?? 'USD')}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
