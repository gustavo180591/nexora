<script lang="ts">
  import { formatMoney } from '$lib/utils/money';

  const { data } = $props();

  let loading = false;
  let syncResult = '';

  async function syncPayouts() {
    loading = true;
    syncResult = '';
    
    try {
      const response = await fetch('/api/payouts/sync', { method: 'POST' });
      const result = await response.json();
      

  function getStatusColor(status: string) {
    switch (status) {
      case 'PAID': return 'bg-emerald-100 text-emerald-700';
      case 'PENDING': return 'bg-amber-100 text-amber-700';
      case 'FAILED': return 'bg-rose-100 text-rose-700';
      case 'PROCESSING': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case 'PAID': return 'Paid';
      case 'PENDING': return 'Pending';
      case 'FAILED': return 'Failed';
      case 'PROCESSING': return 'Processing';
      default: return status;
    }
  }
</script>

<svelte:head>
  <title>Payouts | Nexora</title>
</svelte:head>

<div class="min-h-screen bg-slate-50">
  <!-- Top Navigation -->
  <nav class="bg-white border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-slate-900">Nexora Payouts</h1>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button class="text-slate-500 hover:text-slate-700">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0 3 3 0 0118 0z" />
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
          <a href="/dashboard/admin" class="text-slate-600 hover:text-slate-900 hover:bg-slate-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Admin Dashboard
          </a>
          <a href="/dashboard/payouts" class="bg-indigo-50 text-indigo-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
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
              <h1 class="text-3xl font-bold text-slate-900">Payouts</h1>
              <p class="mt-1 text-slate-500">Manage money flow to sellers and track payment processing</p>
            </div>
            <div class="flex items-center space-x-3">
              <button class="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
              <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sync Payouts
              </button>
            </div>
          </div>
        </div>

        <!-- Payout Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <!-- Total Payouts -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Total Payouts</div>
                <div class="text-2xl font-bold text-slate-900">{formatMoney(summary.totalPayouts)}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-emerald-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4 4-6 6" />
                </svg>
                <span class="text-emerald-600 font-medium">+24.1%</span>
                <span class="text-slate-500 ml-1">vs last month</span>
              </div>
              <div class="text-xs text-slate-400">This month</div>
            </div>
          </div>

          <!-- Pending -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Pending</div>
                <div class="text-2xl font-bold text-slate-900">{formatMoney(summary.pendingAmount)}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <div class="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-slate-600">Awaiting processing</span>
              </div>
              <div class="text-xs text-slate-400">{summary.pendingCount} payouts</div>
            </div>
          </div>

          <!-- Failed -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Failed</div>
                <div class="text-2xl font-bold text-slate-900">{formatMoney(summary.failedAmount)}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <svg class="w-4 h-4 text-rose-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6 6" />
                </svg>
                <span class="text-rose-600 font-medium">Requires attention</span>
              </div>
              <div class="text-xs text-slate-400">{summary.failedCount} payouts</div>
            </div>
          </div>

          <!-- Processing -->
          <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-1.756.426-1.756 2.924 0 3.35a1.724 1.724 0 001.066 2.573c-.94 1.543.826 3.31 2.37 2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="text-right">
                <div class="text-sm text-slate-500 mb-1">Processing</div>
                <div class="text-2xl font-bold text-slate-900">{formatMoney(summary.processingAmount)}</div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-spin"></div>
                <span class="text-slate-600">In transit</span>
              </div>
              <div class="text-xs text-slate-400">{summary.processingCount} payouts</div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-slate-700">Status:</label>
              <select class="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">All Status</option>
                <option value="PAID">Paid</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
                <option value="PROCESSING">Processing</option>
              </select>
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-slate-700">Date Range:</label>
              <input type="date" class="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
              <span class="text-slate-500">to</span>
              <input type="date" class="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-slate-700">Search:</label>
              <div class="relative">
                <input type="text" placeholder="Search seller..." class="pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                <svg class="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-2v10a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3m-6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <button class="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
              Apply Filters
            </button>
            <button class="px-3 py-1.5 text-slate-600 hover:text-slate-900 text-sm font-medium">
              Clear
            </button>
          </div>
        </div>

        <!-- Payouts Table -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div class="p-6 border-b border-slate-200">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Payout History</h3>
                <p class="text-sm text-slate-500 mt-1">Complete payout transactions and status tracking</p>
              </div>
              <div class="flex items-center space-x-2">
                <div class="text-sm text-slate-500">
                  Showing {payouts.length} of {payouts.length} payouts
                </div>
              </div>
            </div>
          </div>
          
          {#if payouts.length === 0}
            <div class="p-12 text-center">
              <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-medium text-slate-900 mb-2">No payouts yet</h3>
              <p class="text-slate-500 mb-4">Payouts will appear here once sellers start earning money.</p>
              <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                Sync Payouts
              </button>
            </div>
          {:else}
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Seller</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Arrival Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Created</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stripe ID</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  {#each payouts as payout (payout.id)}
                    <tr class="hover:bg-slate-50 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center mr-3">
                            <span class="text-white text-xs font-medium">{payout.seller?.email?.charAt(0)?.toUpperCase() || 'S'}</span>
                          </div>
                          <div>
                            <div class="font-medium text-slate-900">{payout.seller?.email?.split('@')[0] || 'Unknown'}</div>
                            <div class="text-xs text-slate-500">{payout.seller?.email?.split('@')[1] || ''}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-slate-900">{formatMoney(payout.amount)}</div>
                        <div class="text-xs text-slate-500">USD</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                          {getStatusText(payout.status)}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-900">
                          {payout.arrivalDate ? new Date(payout.arrivalDate).toLocaleDateString() : 'N/A'}
                        </div>
                        <div class="text-xs text-slate-500">
                          {payout.arrivalDate ? new Date(payout.arrivalDate).toLocaleTimeString() : 'Not set'}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-900">{new Date(payout.createdAt).toLocaleDateString()}</div>
                        <div class="text-xs text-slate-500">{new Date(payout.createdAt).toLocaleTimeString()}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="font-mono text-sm text-slate-600">
                          {payout.stripePayoutId ? `#${payout.stripePayoutId.slice(0, 8)}` : 'N/A'}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right">
                        <div class="flex items-center justify-end space-x-2">
                          {#if payout.status === 'FAILED'}
                            <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                              Retry
                            </button>
                          {/if}
                          <button class="text-slate-600 hover:text-slate-900 text-sm font-medium">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        </div>
      </div>
    </main>
  </div>
</div>
