// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import PocketBase from 'pocketbase';
import User from '$lib/types/user';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb: PocketBase;
      user: User | undefined;
    }
    // interface PageData {}
    // interface Platform {}
  }
}
