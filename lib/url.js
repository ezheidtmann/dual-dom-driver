// URL helpers shared by the driver and its tests. Kept dependency-free (no
// puppeteer import) so the pure logic can be unit-tested without launching a
// browser.

// Strip hotness params from a URL so the app's build pin (?hot=...) never
// crosses from one pane to the other when we mirror navigation. The rwgps app
// reads ?hot into sessionStorage and strips it from the URL itself, so the live
// URL is normally clean; we defensively drop it here too so each window keeps
// its own build instead of inheriting the other pane's hotness.
export function stripHot(urlStr) {
  try {
    const url = new URL(urlStr);
    url.searchParams.delete('hot');
    return url.toString();
  } catch {
    return urlStr;
  }
}
