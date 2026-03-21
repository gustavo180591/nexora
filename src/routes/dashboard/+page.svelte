<script lang="ts">
  import { formatMoney, calculateMetrics } from '$lib/utils/money';
  import { onMount } from 'svelte';

  const { data } = $props();

  let loading = $state(false);
  const metrics = $derived(calculateMetrics(data.orders));

  onMount(() => {
    loading = true;
    setTimeout(() => (loading = false), 800);
  });

  function getOnboardingStatusText(status: boolean) {
    return status ? 'Connected' : 'Pending Setup';
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'PAID':
        return 'bg-emerald-100 text-emerald-700';
      case 'PENDING':
        return 'bg-amber-100 text-amber-700';
      case 'FAILED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case 'PAID':
        return 'Completed';
      case 'PENDING':
        return 'Processing';
      case 'FAILED':
        return 'Failed';
      default:
        return status;
    }
  }
</script>

<svelte:head>
  <title>Dashboard | Nexora</title>
</svelte:head>

<div class="min-h-screen bg-slate-50">
  <!-- Top Navigation -->
  <nav class="bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-slate-900">Nexora</h1>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-slate-500 hover:text-slate-700">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {data.user?.email?.charAt(0).toUpperCase()}
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
          <a href="/dashboard" class="bg-indigo-50 text-indigo-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </a>
          <a href="/dashboard/orders" class="text-slate-600 hover:text-slate-900 hover:bg-slate-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Orders
          </a>
          <a href="/dashboard/connect" class="text-slate-600 hover:text-slate-900 hover:bg-slate-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
            </svg>
            Stripe Connect
          </a>

          {#if data.user?.role === 'ADMIN'}
            <div class="pt-4 mt-4 border-t border-slate-200">
              <h3 class="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin</h3>
              <div class="mt-2 space-y-1">
                <a href="/dashboard/admin" class="text-slate-600 hover:text-slate-900 hover:bg-slate-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
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
              </div>
            </div>
          {/if}
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
              <h1 class="text-3xl font-bold text-slate-900">Welcome back</h1>
              <p class="mt-1 text-slate-500">Here's what's happening with your store today.</p>
            </div>
            <div class="flex items-center space-x-3">
              <button class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Create Order
              </button>
            </div>
          </div>
        </div>

        {#if loading}
          <!-- Loading Skeleton -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
              <div class="h-4 bg-slate-200 rounded w-24 mb-4"></div>
              <div class="h-8 bg-slate-200 rounded w-32"></div>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
              <div class="h-4 bg-slate-200 rounded w-24 mb-4"></div>
              <div class="h-8 bg-slate-200 rounded w-32"></div>
            </div>
            <div class="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
              <div class="h-4 bg-slate-200 rounded w-24 mb-4"></div>
              <div class="h-8 bg-slate-200 rounded w-32"></div>
            </div>
          </div>
        {:else}
          <!-- KPI Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <!-- Total Revenue -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0 1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="text-right">
                  <div class="text-sm text-slate-500 mb-1">Total Revenue</div>
                  <div class="text-2xl font-bold text-slate-900">{formatMoney(metrics.gross)}</div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm">
                  <svg class="w-4 h-4 text-emerald-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span class="text-emerald-600 font-medium">+12.5%</span>
                  <span class="text-slate-500 ml-1">vs last month</span>
                </div>
                <div class="text-xs text-slate-400">Last 30 days</div>
              </div>
            </div>

            <!-- Platform Fees -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="text-right">
                  <div class="text-sm text-slate-500 mb-1">Platform Fees</div>
                  <div class="text-2xl font-bold text-slate-900">{formatMoney(metrics.fee)}</div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm">
                  <div class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                  <span class="text-slate-600">10% commission</span>
                </div>
                <div class="text-xs text-slate-400">Platform revenue</div>
              </div>
            </div>

            <!-- Net Earnings -->
            <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div class="text-right">
                  <div class="text-sm text-slate-500 mb-1">Net Earnings</div>
                  <div class="text-2xl font-bold text-slate-900">{formatMoney(metrics.net)}</div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center text-sm">
                  <svg class="w-4 h-4 text-blue-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="text-blue-600 font-medium">Available</span>
                </div>
                <div class="text-xs text-slate-400">For payout</div>
              </div>
            </div>
          </div>

          <!-- Status Card -->
          <div class="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl p-6 mb-8 text-white">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold mb-2">Payment Status</h3>
                <div class="flex items-center space-x-4">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 border border-white/30">
                    {getOnboardingStatusText(data.connect.onboardingComplete)}
                  </span>
                  <div class="text-sm opacity-90">
                    {data.connect.onboardingComplete ? 'Ready to receive payments' : 'Complete setup to activate'}
                  </div>
                </div>
              </div>
              <div class="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
            </div>
            
            {#if !data.connect.onboardingComplete}
              <div class="mt-4">
                <a href="/dashboard/connect" class="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Complete Setup
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            {/if}
          </div>

          <!-- Recent Orders -->
          <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div class="p-6 border-b border-slate-200">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">Recent Orders</h3>
                  <p class="text-sm text-slate-500 mt-1">Latest transactions from your store</p>
                </div>
                <div class="flex items-center space-x-2">
                  <button class="px-3 py-1.5 text-sm border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17a1 1 0 01-1 1H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l6.414-6.414A1 1 0 0110.586 4H4z" />
                    </svg>
                    Filter
                  </button>
                  <a href="/dashboard/orders" class="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    View all
                    <svg class="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {#if data.orders.length === 0}
              <div class="p-12 text-center">
                <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
                <p class="text-slate-500 mb-4">Your orders will appear here once customers start purchasing.</p>
                <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                  Create your first order
                </button>
              </div>
            {:else}
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead class="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-200">
                    {#each data.orders.slice(0, 5) as order (order.id)}
                      <tr class="hover:bg-slate-50 transition-colors">
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                              <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </div>
                            <div>
                              <div class="font-mono text-sm font-medium text-slate-900">#{order.id.slice(0, 8)}</div>
                              <div class="text-xs text-slate-500">ID: {order.id.slice(0, 12)}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center mr-2">
                              <span class="text-xs font-medium text-slate-600">{order.user?.email?.charAt(0)?.toUpperCase() || 'U'}</span>
                            </div>
                            <div>
                              <div class="text-sm font-medium text-slate-900">{order.user?.email?.split('@')[0] || 'Unknown'}</div>
                              <div class="text-xs text-slate-500">{order.user?.email?.split('@')[1] || ''}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right">
                          <div class="text-sm font-medium text-slate-900">{formatMoney(order.totalAmount)}</div>
                          <div class="text-xs text-slate-500">{order.currency?.toUpperCase() || 'USD'}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</div>
                          <div class="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString()}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-right">
                          <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </main>
  </div>
</div>
