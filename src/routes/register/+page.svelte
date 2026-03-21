<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';

  let loading = $state(false);
  let error = $state('');

  async function handleSubmit({ formData, cancel }) {
    loading = true;
    error = '';
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
          role: formData.get('role') || 'BUYER'
        })
      });

      const result = await response.json();

      if (result.success) {
        await goto('/login');
      } else {
        error = result.error || 'Registration failed';
      }
    } catch (e) {
      error = 'Network error. Please try again.';
    } finally {
      loading = false;
    }

    cancel();
  }
</script>

<svelte:head>
  <title>Register | Nexora</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <!-- Background Pattern -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-full opacity-30 blur-3xl"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-30 blur-3xl"></div>
  </div>

  <div class="relative max-w-md w-full">
    <!-- Logo Section -->
    <div class="text-center mb-8">
      <div class="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold text-slate-900 mb-2">Join Nexora</h2>
      <p class="text-slate-600">Create your account to start selling or buying</p>
    </div>

    <!-- Registration Card -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
      <form class="space-y-6" method="POST" use:enhance={handleSubmit}>
        {#if error}
          <div class="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-rose-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div class="text-sm text-rose-800">{error}</div>
            </div>
          </div>
        {/if}
        
        <div class="space-y-5">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">Email address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                placeholder="Create a strong password"
              />
            </div>
          </div>

          <!-- Account Type -->
          <div>
            <label for="role" class="block text-sm font-medium text-slate-700 mb-2">Account Type</label>
            <div class="space-y-3">
              <label class="relative flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="role"
                  value="BUYER"
                  checked
                  class="sr-only peer"
                />
                <div class="flex items-center">
                  <div class="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex items-center justify-center transition-colors">
                    <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <div class="ml-3">
                    <div class="font-medium text-slate-900">Buyer</div>
                    <div class="text-sm text-slate-500">I want to purchase products</div>
                  </div>
                </div>
              </label>
              
              <label class="relative flex items-center p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <input
                  type="radio"
                  name="role"
                  value="SELLER"
                  class="sr-only peer"
                />
                <div class="flex items-center">
                  <div class="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex items-center justify-center transition-colors">
                    <div class="w-2 h-2 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <div class="ml-3">
                    <div class="font-medium text-slate-900">Seller</div>
                    <div class="text-sm text-slate-500">I want to sell products</div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Terms -->
        <div class="flex items-start">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            required
            class="mt-0.5 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
          />
          <label for="agree-terms" class="ml-3 text-sm text-slate-600">
            I agree to the{' '}
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
            {' '}and{' '}
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
          </label>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            disabled={loading}
            class="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {#if loading}
              <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            {:else}
              Create your Nexora account
            {/if}
          </button>
        </div>

        <!-- Sign In Link -->
        <div class="text-center">
          <span class="text-sm text-slate-600">
            Already have an account?{' '}
            <a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in here
            </a>
          </span>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <div class="text-center mt-8">
      <p class="text-xs text-slate-500">
        © 2024 Nexora. All rights reserved.
      </p>
    </div>
  </div>
</div>
