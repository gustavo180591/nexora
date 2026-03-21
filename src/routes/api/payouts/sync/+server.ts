import { json } from '@sveltejs/kit';
import { syncPayoutsFromStripe } from '$lib/server/billing/payouts.service';
import { requireRole } from '$lib/server/auth/guards';
import type { RequestParams } from '$lib/server/types';

export async function POST({ request }: RequestParams) {
  try {
    // This should be admin-only in production
    // const user = requireRole(locals, ['ADMIN']);
    
    const result = await syncPayoutsFromStripe();
    
    return json({
      success: true,
      message: `Synced ${result.synced} payouts from Stripe`,
      data: result
    });
  } catch (error) {
    console.error('Payout sync error:', error);
    return json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
